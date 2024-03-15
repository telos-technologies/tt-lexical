/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import type { DOMConversionMap, DOMExportOutput, EditorConfig, LexicalEditor, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
export type SerializedExcalidrawNode = Spread<{
    data: string;
    width: number | 'inherit';
    height: number | 'inherit';
}, SerializedLexicalNode>;
export declare class ExcalidrawNode extends DecoratorNode<JSX.Element> {
    __data: string;
    __width: number | 'inherit';
    __height: number | 'inherit';
    static getType(): string;
    static clone(node: ExcalidrawNode): ExcalidrawNode;
    static importJSON(serializedNode: SerializedExcalidrawNode): ExcalidrawNode;
    exportJSON(): SerializedExcalidrawNode;
    constructor(data?: string, key?: NodeKey);
    createDOM(config: EditorConfig): HTMLElement;
    updateDOM(): false;
    static importDOM(): DOMConversionMap<HTMLSpanElement> | null;
    exportDOM(editor: LexicalEditor): DOMExportOutput;
    setData(data: string): void;
    setWidth(width: number | 'inherit'): void;
    setHeight(height: number | 'inherit'): void;
    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element;
}
export declare function $createExcalidrawNode(): ExcalidrawNode;
export declare function $isExcalidrawNode(node: LexicalNode | null): node is ExcalidrawNode;
