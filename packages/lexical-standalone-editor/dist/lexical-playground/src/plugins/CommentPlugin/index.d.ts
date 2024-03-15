/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { Provider } from '@lexical/yjs';
import type { LexicalCommand } from 'lexical';
import type { Doc } from 'yjs';
import './index.css';
export declare const INSERT_INLINE_COMMAND: LexicalCommand<void>;
export default function CommentPlugin({ providerFactory, }: {
    providerFactory?: (id: string, yjsDocMap: Map<string, Doc>) => Provider;
}): JSX.Element;
