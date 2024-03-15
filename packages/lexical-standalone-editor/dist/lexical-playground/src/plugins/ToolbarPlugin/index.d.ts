/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { LexicalEditor } from 'lexical';
import { Dispatch } from 'react';
import { ShowModal } from '../ComponentPickerPlugin';
export type GetCustomInsertOptions = (editor: LexicalEditor, showModal: ShowModal) => JSX.Element[];
export default function ToolbarPlugin({ setIsLinkEditMode, getCustomInsertOptions, }: {
    setIsLinkEditMode: Dispatch<boolean>;
    getCustomInsertOptions?: GetCustomInsertOptions;
}): JSX.Element;
