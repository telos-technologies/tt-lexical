/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare const isDevPlayground: boolean;
export declare const DEFAULT_SETTINGS: {
    disableBeforeInput: boolean;
    emptyEditor: boolean;
    isAutocomplete: boolean;
    isCharLimit: boolean;
    isCharLimitUtf8: boolean;
    isCollab: boolean;
    isMaxLength: boolean;
    isRichText: boolean;
    measureTypingPerf: boolean;
    shouldUseLexicalContextMenu: boolean;
    showNestedEditorTreeView: boolean;
    showTableOfContents: boolean;
    showTreeView: boolean;
    tableCellBackgroundColor: boolean;
    tableCellMerge: boolean;
};
export type SettingName = keyof typeof DEFAULT_SETTINGS;
export type Settings = typeof DEFAULT_SETTINGS;
