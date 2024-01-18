import {
  $getSelection,
  $isLineBreakNode,
  $isRangeSelection,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { LowPriority } from "../utils/const";
import { getSelectedNode } from "../utils/lexicalHelper";

import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { FloatingLinkEditorProps } from "../utils/types";
import { PositionEditorElement } from "./PositionEditorElement";

export function FloatingLinkEditor({
  editor,
  linkUrl,
  setLinkUrl,
}: FloatingLinkEditorProps) {
  const editorRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<RangeSelection | null>(
    null
  );

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node: any = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection!.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection!.anchorNode)
    ) {
      const domRange = nativeSelection!.getRangeAt(0);
      let rect;
      if (nativeSelection!.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild as HTMLElement;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        PositionEditorElement(editorElem, rect);
      }
      setLastSelection(selection as RangeSelection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      PositionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode ? (
        <input
          ref={inputRef}
          className="link-input"
          value={linkUrl}
          onChange={(event) => {
            setLinkUrl(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (lastSelection !== null) {
                if (linkUrl !== "") {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
                }
                setEditMode(false);
              }
            } else if (event.key === "Escape") {
              event.preventDefault();
              setEditMode(false);
            }
          }}
        />
      ) : (
        <>
          <div className="link-input">
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkUrl}
            </a>
            <div
              className="link-edit"
              role="button"
              tabIndex={0}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setEditMode(true);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
