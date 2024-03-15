/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import './fontSize.css';
import { LexicalEditor } from 'lexical';
export default function FontSize({ selectionFontSize, disabled, editor, }: {
    selectionFontSize: string;
    disabled: boolean;
    editor: LexicalEditor;
}): JSX.Element;
