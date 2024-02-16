import LexicalTheme from "../../theme/LexicalTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "../../plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { CodeHighlightPlugin } from "../../plugins/CodeHighlightPlugin";
import prepopulatedText from "../../utils/SampleText";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Transformaer from "../../utils/Transformer";
import { Box } from "@chakra-ui/react";

function Placeholder() {
  return (
    <div className="editor-placeholder">
      Play around with the Markdown plugin...
    </div>
  );
}

const editorConfig = {
  editorState: prepopulatedText,
  namespace: "editor",
  theme: LexicalTheme,
  onError(error: Error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default function Editor() {
  const containerStyles = {
    display: "flex",
    gap: "48px",
    padding: "48px",
    justifyContent: "center",
    minHeight: "calc(100vh - 92px)",
    fontFamily: " ubuntu, monospace",
  };
  return (
    <>
      <LexicalComposer initialConfig={editorConfig}>
        <div style={containerStyles}>
          <div className="editor-container" style={{ flex: 1 }}>
            <ToolbarPlugin />

            <div className="editor-inner">
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <ListPlugin />
              <LinkPlugin />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
              <CodeHighlightPlugin />
            </div>
          </div>
          <Box>
            <Transformaer />
          </Box>
        </div>
      </LexicalComposer>
    </>
  );
}
