import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { GridSelection, LexicalEditor, RangeSelection } from "lexical";
import { RefObject } from "react";

export type LexicalParameters = Parameters<typeof LexicalComposer>;

export type EditorConfig = LexicalParameters["0"]["initialConfig"];
export type EditorParameters = Parameters<
  typeof OnChangePlugin
>["0"]["onChange"];
export type All = Parameters<EditorParameters>;

export interface FloatingLinkEditorProps {
  setToolbar?: React.Dispatch<
    React.SetStateAction<{
      isBold: boolean;
      isItalic: boolean;
      isStrikethrough: boolean;
      isCode: boolean;
      linkUrl: string;
    }>
  >;
  visible?: boolean;
  editor: LexicalEditor;
  linkUrl: string;
  updateLinkUrl: any;
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>;
}

export interface SelectProps {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  className: string;
  options: string[];
  value: string;
}

export interface BlockOptionsDropdownListProps {
  editor: LexicalEditor;
  blockType: string;
  toolbarRef: React.RefObject<HTMLDivElement>;
  setShowBlockOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SelectionType = RangeSelection | GridSelection;
