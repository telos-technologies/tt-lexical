/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var LexicalAutoFocusPlugin = require('@lexical/react/LexicalAutoFocusPlugin');
var LexicalComposerContext = require('@lexical/react/LexicalComposerContext');
var LexicalErrorBoundary = require('@lexical/react/LexicalErrorBoundary');
var LexicalNestedComposer = require('@lexical/react/LexicalNestedComposer');
var LexicalRichTextPlugin = require('@lexical/react/LexicalRichTextPlugin');
var useLexicalNodeSelection = require('@lexical/react/useLexicalNodeSelection');
var utils = require('@lexical/utils');
var lexical = require('lexical');
var React = require('react');
<<<<<<< HEAD:packages/lexical-standalone-editor/dist/InlineImageComponent-7777593a.js
var Editor = require('./Editor-af8406d8.js');
=======
<<<<<<<< HEAD:packages/lexical-standalone-editor/dist/InlineImageComponent-5d8ad0ac.js
var Editor = require('./Editor-da3606cc.js');
========
var Editor = require('./Editor-f030cb98.js');
>>>>>>>> 5c7dfb55 (added back default image nodes):packages/lexical-standalone-editor/dist/InlineImageComponent-1d9886bc.js
>>>>>>> c7feb79d (added back default image nodes):packages/lexical-standalone-editor/dist/InlineImageComponent-5d8ad0ac.js
require('@lexical/react/LexicalCharacterLimitPlugin');
require('@lexical/react/LexicalCheckListPlugin');
require('@lexical/react/LexicalClearEditorPlugin');
require('@lexical/react/LexicalClickableLinkPlugin');
require('@lexical/react/LexicalComposer');
require('@lexical/react/LexicalHistoryPlugin');
require('@lexical/react/LexicalHorizontalRulePlugin');
require('@lexical/react/LexicalListPlugin');
require('@lexical/react/LexicalPlainTextPlugin');
require('@lexical/react/LexicalTabIndentationPlugin');
require('@lexical/react/LexicalTablePlugin');
require('@lexical/react/useLexicalEditable');
require('@lexical/rich-text');
require('@lexical/code');
require('@lexical/link');
require('@lexical/list');
require('@lexical/mark');
require('@lexical/overflow');
require('@lexical/react/LexicalHorizontalRuleNode');
require('@lexical/table');
require('@lexical/selection');
require('react-dom');
require('@lexical/react/LexicalBlockWithAlignableContents');
require('@lexical/react/LexicalDecoratorBlockNode');
require('@lexical/file');
require('@lexical/markdown');
require('@lexical/react/LexicalCollaborationContext');
require('@lexical/yjs');
require('@lexical/react/LexicalAutoEmbedPlugin');
require('@lexical/react/LexicalAutoLinkPlugin');
require('@lexical/react/LexicalTypeaheadMenuPlugin');
require('@lexical/react/LexicalContextMenuPlugin');
require('@lexical/react/LexicalLinkPlugin');
require('@lexical/react/LexicalMarkdownShortcutPlugin');
require('@lexical/react/LexicalTreeView');
require('@lexical/react/LexicalContentEditable');

function Select({
  children,
  label,
  className,
  ...other
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "Input__wrapper"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      marginTop: '-1em'
    },
    className: "Input__label"
  }, label), /*#__PURE__*/React.createElement("select", Editor._extends({}, other, {
    className: className || 'select'
  }), children));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const imageCache = new Set();
function useSuspenseImage(src) {
  if (!imageCache.has(src)) {
    throw new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}
function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  position
}) {
  useSuspenseImage(src);
  return /*#__PURE__*/React.createElement("img", {
    className: className || undefined,
    src: src,
    alt: altText,
    ref: imageRef,
    "data-position": position,
    style: {
      display: 'block',
      height,
      width
    },
    draggable: "false"
  });
}
function UpdateInlineImageDialog({
  activeEditor,
  nodeKey,
  onClose
}) {
  const editorState = activeEditor.getEditorState();
  const node = editorState.read(() => lexical.$getNodeByKey(nodeKey));
  const [altText, setAltText] = React.useState(node.getAltText());
  const [showCaption, setShowCaption] = React.useState(node.getShowCaption());
  const [position, setPosition] = React.useState(node.getPosition());
  const handleShowCaptionChange = e => {
    setShowCaption(e.target.checked);
  };
  const handlePositionChange = e => {
    setPosition(e.target.value);
  };
  const handleOnConfirm = () => {
    const payload = {
      altText,
      position,
      showCaption
    };
    if (node) {
      activeEditor.update(() => {
        node.update(payload);
      });
    }
    onClose();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '1em'
    }
  }, /*#__PURE__*/React.createElement(Editor.TextInput, {
    label: "Alt Text",
    placeholder: "Descriptive alternative text",
    onChange: setAltText,
    value: altText,
    "data-test-id": "image-modal-alt-text-input"
  })), /*#__PURE__*/React.createElement(Select, {
    style: {
      marginBottom: '1em',
      width: '208px'
    },
    value: position,
    label: "Position",
    name: "position",
    id: "position-select",
    onChange: handlePositionChange
  }, /*#__PURE__*/React.createElement("option", {
    value: "left"
  }, "Left"), /*#__PURE__*/React.createElement("option", {
    value: "right"
  }, "Right"), /*#__PURE__*/React.createElement("option", {
    value: "full"
  }, "Full Width")), /*#__PURE__*/React.createElement("div", {
    className: "Input__wrapper"
  }, /*#__PURE__*/React.createElement("input", {
    id: "caption",
    type: "checkbox",
    checked: showCaption,
    onChange: handleShowCaptionChange
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "caption"
  }, "Show Caption")), /*#__PURE__*/React.createElement(Editor.DialogActions, null, /*#__PURE__*/React.createElement(Editor.Button, {
    "data-test-id": "image-modal-file-upload-btn",
    onClick: () => handleOnConfirm()
  }, "Confirm")));
}
function InlineImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
  showCaption,
  caption,
  position
}) {
  const [modal, showModal] = Editor.useModal();
  const imageRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection.useLexicalNodeSelection(nodeKey);
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [selection, setSelection] = React.useState(null);
  const activeEditorRef = React.useRef(null);
  const onDelete = React.useCallback(payload => {
    if (isSelected && lexical.$isNodeSelection(lexical.$getSelection())) {
      const event = payload;
      event.preventDefault();
      const node = lexical.$getNodeByKey(nodeKey);
      // if ($isInlineImageNode(node)) {
      node.remove();
      return true;
      // }
    }

    return false;
  }, [isSelected, nodeKey]);
  const onEnter = React.useCallback(event => {
    const latestSelection = lexical.$getSelection();
    const buttonElem = buttonRef.current;
    if (isSelected && lexical.$isNodeSelection(latestSelection) && latestSelection.getNodes().length === 1) {
      if (showCaption) {
        // Move focus into nested editor
        lexical.$setSelection(null);
        event.preventDefault();
        caption.focus();
        return true;
      } else if (buttonElem !== null && buttonElem !== document.activeElement) {
        event.preventDefault();
        buttonElem.focus();
        return true;
      }
    }
    return false;
  }, [caption, isSelected, showCaption]);
  const onEscape = React.useCallback(event => {
    if (activeEditorRef.current === caption || buttonRef.current === event.target) {
      lexical.$setSelection(null);
      editor.update(() => {
        setSelected(true);
        const parentRootElement = editor.getRootElement();
        if (parentRootElement !== null) {
          parentRootElement.focus();
        }
      });
      return true;
    }
    return false;
  }, [caption, editor, setSelected]);
  React.useEffect(() => {
    let isMounted = true;
    const unregister = utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      if (isMounted) {
        setSelection(editorState.read(() => lexical.$getSelection()));
      }
    }), editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, (_, activeEditor) => {
      activeEditorRef.current = activeEditor;
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.CLICK_COMMAND, payload => {
      const event = payload;
      if (event.target === imageRef.current) {
        if (event.shiftKey) {
          setSelected(!isSelected);
        } else {
          clearSelection();
          setSelected(true);
        }
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.DRAGSTART_COMMAND, event => {
      if (event.target === imageRef.current) {
        // TODO This is just a temporary workaround for FF to behave like other browsers.
        // Ideally, this handles drag & drop too (and all browsers).
        event.preventDefault();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_DELETE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ENTER_COMMAND, onEnter, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, onEscape, lexical.COMMAND_PRIORITY_LOW));
    return () => {
      isMounted = false;
      unregister();
    };
  }, [clearSelection, editor, isSelected, nodeKey, onDelete, onEnter, onEscape, setSelected]);
  const draggable = isSelected && lexical.$isNodeSelection(selection);
  const isFocused = isSelected;
  return /*#__PURE__*/React.createElement(React.Suspense, {
    fallback: null
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    draggable: draggable
  }, editor.isEditable() && /*#__PURE__*/React.createElement("button", {
    className: "image-edit-button",
    ref: buttonRef,
    onClick: () => {
      showModal('Update Inline Image', onClose => /*#__PURE__*/React.createElement(UpdateInlineImageDialog, {
        activeEditor: editor,
        nodeKey: nodeKey,
        onClose: onClose
      }));
    }
  }, "Edit"), /*#__PURE__*/React.createElement(LazyImage, {
    className: isFocused ? `focused ${lexical.$isNodeSelection(selection) ? 'draggable' : ''}` : null,
    src: src,
    altText: altText,
    imageRef: imageRef,
    width: width,
    height: height,
    position: position
  })), showCaption && /*#__PURE__*/React.createElement("div", {
    className: "image-caption-container"
  }, /*#__PURE__*/React.createElement(LexicalNestedComposer.LexicalNestedComposer, {
    initialEditor: caption
  }, /*#__PURE__*/React.createElement(LexicalAutoFocusPlugin.AutoFocusPlugin, null), /*#__PURE__*/React.createElement(Editor.LinkPlugin, null), /*#__PURE__*/React.createElement(Editor.FloatingTextFormatToolbarPlugin, null), /*#__PURE__*/React.createElement(LexicalRichTextPlugin.RichTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(Editor.LexicalContentEditable, {
      className: "InlineImageNode__contentEditable"
    }),
    placeholder: /*#__PURE__*/React.createElement(Editor.Placeholder, {
      className: "InlineImageNode__placeholder"
    }, "Enter a caption..."),
    ErrorBoundary: LexicalErrorBoundary
  })))), modal);
}

exports.UpdateInlineImageDialog = UpdateInlineImageDialog;
exports["default"] = InlineImageComponent;
