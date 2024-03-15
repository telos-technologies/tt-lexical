/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import './EquationEditor.css';
import * as React from 'react';
type BaseEquationEditorProps = {
    equation: string;
    inline: boolean;
    setEquation: (equation: string) => void;
};
declare const _default: React.ForwardRefExoticComponent<BaseEquationEditorProps & React.RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;
export default _default;
