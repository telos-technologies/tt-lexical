/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import { MenuOption } from '@lexical/react/LexicalTypeaheadMenuPlugin';
import { LexicalEditor } from 'lexical';
import useModal from '../../hooks/useModal';
export declare class ComponentPickerOption extends MenuOption {
    title: string;
    icon?: JSX.Element;
    keywords: Array<string>;
    keyboardShortcut?: string;
    onSelect: (queryString: string) => void;
    constructor(title: string, options: {
        icon?: JSX.Element;
        keywords?: Array<string>;
        keyboardShortcut?: string;
        onSelect: (queryString: string) => void;
    });
}
export type ShowModal = ReturnType<typeof useModal>[1];
export declare function getBaseOptions(editor: LexicalEditor, showModal: ShowModal): ComponentPickerOption[];
export type GetCustomBaseOptions = typeof getBaseOptions;
export default function ComponentPickerMenuPlugin({ getCustomBaseOptions, }: {
    getCustomBaseOptions?: GetCustomBaseOptions;
}): JSX.Element;
