/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import './index.css';
import { Dispatch } from 'react';
export default function FloatingLinkEditorPlugin({ anchorElem, isLinkEditMode, setIsLinkEditMode, }: {
    anchorElem?: HTMLElement;
    isLinkEditMode: boolean;
    setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element | null;
