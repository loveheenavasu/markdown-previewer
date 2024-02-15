import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";
import React from "react";
type formatTextProps = {
  editor: LexicalEditor;
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
};
type commandFormat =
  | "bold"
  | "underline"
  | "strikethrough"
  | "italic"
  | "highlight"
  | "code"
  | "subscript"
  | "superscript";
export default function FormatTextButtons({
  editor,
  isBold,
  isCode,
  isItalic,
  isStrikethrough,
}: formatTextProps) {
  const formatHandler = (commandFormatType: commandFormat) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, commandFormatType);
  };
  return (
    <>
      <button
        onClick={() => formatHandler("bold")}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <i className="format bold" />
      </button>
      <button
        onClick={() => formatHandler("italic")}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <i className="format italic" />
      </button>
      <button
        onClick={() => formatHandler("strikethrough")}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <i className="format strikethrough" />
      </button>
      <button
        onClick={() => formatHandler("code")}
        className={"toolbar-item spaced " + (isCode ? "active" : "")}
        aria-label="Insert Code"
      >
        <i className="format code" />
      </button>
    </>
  );
}
