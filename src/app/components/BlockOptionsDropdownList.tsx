import { $wrapNodes } from "@lexical/selection";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  LexicalCommand,
} from "lexical";
import { useEffect, useRef } from "react";
import { BlockOptionsDropdownListProps } from "../utils/types";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createCodeNode } from "@lexical/code";

export function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}: BlockOptionsDropdownListProps) {
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: { target: any }) => {
        const target = event.target;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener("click", handle);

      return () => {
        document.removeEventListener("click", handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatBlock = (type: string, createNode?: Function, command?: LexicalCommand<any>) => {
    if (blockType !== type) {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          if (createNode) {
            $wrapNodes(selection, () => createNode(type));
          } else if (command) {
            editor.dispatchCommand(command, undefined);
          }
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  return (
    <div className="dropdown" ref={dropDownRef}>
      <button className="item" onClick={() => formatBlock("paragraph", $createParagraphNode)}>
        <span className="icon paragraph" />
        <span className="text">Normal</span>
        {blockType === "paragraph" && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatBlock("h1", $createHeadingNode)}>
        <span className="icon large-heading" />
        <span className="text">Large Heading</span>
        {blockType === "h1" && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatBlock("h2", $createHeadingNode)}>
        <span className="icon small-heading" />
        <span className="text">Small Heading</span>
        {blockType === "h2" && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatBlock("ul", undefined, INSERT_UNORDERED_LIST_COMMAND)}>
        <span className="icon bullet-list" />
        <span className="text">Bullet List</span>
        {blockType === "ul" && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatBlock("ol", undefined, INSERT_ORDERED_LIST_COMMAND)}>
        <span className="icon numbered-list" />
        <span className="text">Numbered List</span>
        {blockType === "ol" && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatBlock("quote", $createQuoteNode)}>
        <span className="icon quote" />
        <span className="text">Quote</span>
        {blockType === "quote" && <span className="active" />}
      </button>
      <button className="item" onClick={() => formatBlock("code", $createCodeNode)}>
        <span className="icon code" />
        <span className="text">Code Block</span>
        {blockType === "code" && <span className="active" />}
      </button>
    </div>
  );
}