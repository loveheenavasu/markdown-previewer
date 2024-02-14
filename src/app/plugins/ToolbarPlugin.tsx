import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  blockTypeToBlockName,
  LowPriority,
  supportedBlockTypes,
} from "../utils/const";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $getSelection,
  $isRangeSelection,
  $getNodeByKey,
} from "lexical";
import {Icon,Box} from '@chakra-ui/react';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { $isListNode, ListNode } from "@lexical/list";
import { createPortal } from "react-dom";
import { $isHeadingNode } from "@lexical/rich-text";
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";
import {
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from "@lexical/code";
// import { RangeSelection } from "lexical";
import { FloatingLinkEditor } from "../components/FloatingLinkEditor";
import { SelectionType, SelectProps } from "../utils/types";
import { BlockOptionsDropdownList } from "../components/BlockOptionsDropdownList";
import { getSelectedNode } from "../utils/lexicalHelper";
import { FaSun } from "react-icons/fa";

function Divider() {
  return <div className="divider" />;
}

function Select({ onChange, className, options, value }: SelectProps) {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState(false);
  const [isLink, setIsLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [state, setState] = useState({
    isUndo: false,
    isRedo: false,
  });
  const [tooltbar, setToolbar] = useState({
    blockType: "paragraph",
    selectedElementKey: null,
    codeLanguage: "",
  });

  const [styles, setStyles] = useState({
    isBold: false,
    isItalic: false,
    isStrikethrough: false,
    isCode: false,
    isRedo:false,
    isUndo:false,
  });

  const { isBold, isItalic, isStrikethrough, isCode ,isUndo,isRedo} = styles;

  const { blockType, selectedElementKey, codeLanguage } = tooltbar;
const undoHanlder=(key:string,value:boolean)=>{
  editor.dispatchCommand(UNDO_COMMAND,null||undefined);
  setState(prevState => ({
    ...prevState,
    [key]: value,
  }));
};
const redoHandler=(key:string,value:boolean)=>{
  editor.dispatchCommand(REDO_COMMAND,null||undefined);
  setState(prevState => ({
    ...prevState,
    [key]: value,
  }));
}
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        setToolbar((prevToolbar: any) => ({
          ...prevToolbar,
          selectedElementKey: elementKey,
        }));
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setToolbar((prevToolbar) => ({ ...prevToolbar, blockType: type }));
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setToolbar((prevToolbar) => ({ ...prevToolbar, blockType: type }));
          if ($isCodeNode(element)) {
            const language = element.getLanguage() || getDefaultCodeLanguage();
            setToolbar((prevToolbar) => ({
              ...prevToolbar,
              codeLanguage: language,
            }));
          }
        }
      }

      setStyles({
        ...styles,
        isBold: selection.hasFormat("bold"),
        isItalic: selection.hasFormat("italic"),
        isStrikethrough: selection.hasFormat("strikethrough"),
        isCode: selection.hasFormat("code"),
      });

      const node = getSelectedNode(selection);
      const parent = node?.getParent?.();

      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (e: { target: { value: string } }) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(() => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, !isLink ? "https://" : null);
  }, [editor, isLink]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className="toolbar-item block-controls"
            onClick={() =>
              setShowBlockOptionsDropDown(!showBlockOptionsDropDown)
            }
            aria-label="Formatting Options"
          >
            <span className={"icon block-type " + blockType} />
            <span className="text">
              {
                blockTypeToBlockName[
                  blockType as keyof typeof blockTypeToBlockName
                ]
              }
            </span>
            <i className="chevron-down" />
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body
            )}
          <Divider />
        </>
      )}
      {blockType === "code" ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguges}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }}
            className={"toolbar-item spaced " + (isBold ? "active" : "")}
            aria-label="Format Bold"
          >
            <i className="format bold" />
          </button>
          <button aria-label="Format undo"
          onClick={()=>{undoHanlder('isUndo',!state.isUndo);
          }}
          className={"toolbar-item spaced " + (state.isUndo? "active" : "")}
          style={{alignItems:'center'}}
          >
            <Icon as={LuUndo} color={state.isUndo?'black':'#666666'}/>
          </button>
          <button aria-label="Format Redo"
          onClick={()=>{
            redoHandler('isRedo',!state.isRedo)
          }}
          className={"toolbar-item spaced " + (state.isRedo? "active" : "")}
          style={{alignItems:'center'}}
          >
            <Icon as={LuRedo} color={state.isRedo?'black':'#666666'}/>
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }}
            className={"toolbar-item spaced " + (isItalic ? "active" : "")}
            aria-label="Format Italics"
          >
            <i className="format italic" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            }}
            className={
              "toolbar-item spaced " + (isStrikethrough ? "active" : "")
            }
            aria-label="Format Strikethrough"
          >
            <i className="format strikethrough" />
          </button>
          <button
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
            }}
            className={"toolbar-item spaced " + (isCode ? "active" : "")}
            aria-label="Insert Code"
          >
            <i className="format code" />
          </button>
          <button
            onClick={insertLink}
            className={"toolbar-item spaced " + (isLink ? "active" : "")}
            aria-label="Insert Link"
          >
            <i className="format link" />
          </button>
          {isLink &&
            createPortal(
              <FloatingLinkEditor
                linkUrl={linkUrl}
                setLinkUrl={setLinkUrl}
                editor={editor}
                updateLinkUrl={undefined}
              />,
              document.body
            )}
        </>
      )}
    </div>
  );
}
