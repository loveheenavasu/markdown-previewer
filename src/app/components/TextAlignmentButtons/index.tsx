import { FORMAT_ELEMENT_COMMAND, LexicalEditor } from 'lexical';
import React from 'react'
type alignmentType =
  | "left"
  | "start"
  | "center"
  | "right"
  | "end"
  | "justify"
  | "";
export const AlignMenuButtons = ({editor}:any) => {
  const alignment = (alignment: alignmentType) => {
    if (alignment) {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
    }
  };
  return (
    <>
    <button
            onClick={() => alignment("left")}
            className="toolbar-item spaced"
            aria-label="Left Align"
          >
            <i className="format left-align" />
          </button>
          <button
            onClick={() => alignment("center")}
            className="toolbar-item spaced"
            aria-label="Center Align"
          >
            <i className="format center-align" />
          </button>
          <button
            onClick={() => alignment("right")}
            className="toolbar-item spaced"
            aria-label="Right Align"
          >
            <i className="format right-align" />
          </button>
          <button
            onClick={() => alignment("justify")}
            className="toolbar-item"
            aria-label="Justify Align"
          >
            <i className="format justify-align" />
          </button>{" "}
    </>
  )
}
