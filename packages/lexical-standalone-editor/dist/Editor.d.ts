/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import 'lexical-playground/src/index.css';
import { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import { KlassConstructor, LexicalNode } from 'lexical/src';
import { Settings } from 'lexical-playground/src/appSettings';
import { ComponentPickerOption, getBaseOptions, GetCustomBaseOptions } from 'lexical-playground/src/plugins/ComponentPickerPlugin';
export declare class CustomComponentPickerOption extends ComponentPickerOption {
}
export type GetBaseOptions = typeof getBaseOptions;
type NormalizedEditorProps = Omit<Settings, 'measureTypingPerf'>;
type EditorProps = NormalizedEditorProps & {
    showActions?: boolean;
    showToolbar?: boolean;
    articleCssClass?: string;
    getCustomBaseOptions?: GetCustomBaseOptions;
};
type LexicalEditorProps = EditorProps & {
    isDevPlayground?: boolean;
    measureTypingPerf?: boolean;
    editorState?: InitialEditorStateType;
    namespace?: string;
    customNodes?: KlassConstructor<typeof LexicalNode>[];
    customPlugins?: JSX.Element[];
};
export declare const LexicalEditor: ({ isDevPlayground, measureTypingPerf, editorState, namespace, customNodes, customPlugins, ...restProps }: LexicalEditorProps) => JSX.Element;
export {};
