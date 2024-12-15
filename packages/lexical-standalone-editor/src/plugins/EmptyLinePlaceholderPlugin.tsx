/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$getRoot, $isParagraphNode, createCommand} from 'lexical';
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

        children.forEach((child) => {
          const element = editor.getElementByKey(child.getKey());
          if (element) {
            if (
              $isParagraphNode(child) &&
              child.getTextContent().trim() === ''
            ) {
              if (element) {
                element.setAttribute('data-placeholder', placeholder);
              }
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
