import { $isAtNodeEnd } from '@lexical/selection';
import { ElementNode, GridSelection, LineBreakNode, RangeSelection, TextNode } from 'lexical';


export function getSelectedNode(
  selection: RangeSelection | GridSelection | null,
 
) {
  if (!selection) {
    return null;
  }
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = anchor?.getNode?.();
  const focusNode = focus?.getNode?.();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection?.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}