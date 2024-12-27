/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$isHeadingNode} from '@lexical/rich-text';
import {
  $getRoot,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  createCommand,
} from 'lexical';
import {useEffect} from 'react';

export const SHOW_PLACEHOLDER = createCommand<boolean>('SHOW_PLACEHOLDER');

export function EmptyLinePlaceholderPlugin({
  placeholder,
}: {
  placeholder: string;
}): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerUpdateListener(({editorState}) => {
      editorState.read(() => {
        const root = $getRoot();
        const children = root.getChildren();
        const selection = $getSelection();

        // Get the currently selected node key if there's a valid range selection
        const selectedNodeKey = $isRangeSelection(selection)
          ? selection.anchor.key
          : null;

        children.forEach((child) => {
          const element = editor.getElementByKey(child.getKey());
          if (element) {
            if (
              ($isParagraphNode(child) || $isHeadingNode(child)) &&
              child.getTextContent().trim() === '' &&
              child.getKey() === selectedNodeKey && // Only show placeholder if cursor is in this node
              child.getChildren().length === 0 // Only show placeholder if there are no child nodes
            ) {
              element.setAttribute('data-placeholder', placeholder);
            } else {
              element.removeAttribute('data-placeholder');
            }
          }
        });
      });
    });
  }, [editor, placeholder]);

  return null;
}
