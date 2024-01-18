import { $convertToMarkdownString } from "@lexical/markdown";
import React, { useState } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { PLAYGROUND_TRANSFORMERS } from "./MarkdownTransformers";

export default function Transformaer(): JSX.Element {
  const [markdownText, setMarkdownText] = useState("");

  return (
    <>
      <OnChangePlugin
        onChange={(editorState, editor, tags) => {
          editor.update(() => {
            const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
            setMarkdownText(markdown);
          });
        }}
      />
      <div className="editor-preview">{markdownText}</div>
    </>
  );
}
