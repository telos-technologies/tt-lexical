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
var LexicalHistoryPlugin = require('@lexical/react/LexicalHistoryPlugin');
var LexicalNestedComposer = require('@lexical/react/LexicalNestedComposer');
var LexicalRichTextPlugin = require('@lexical/react/LexicalRichTextPlugin');
var useLexicalNodeSelection = require('@lexical/react/useLexicalNodeSelection');
var utils = require('@lexical/utils');
var lexical = require('lexical');
var React$1 = require('react');
var Editor = require('./Editor-42b38529.js');
require('@lexical/react/LexicalCharacterLimitPlugin');
require('@lexical/react/LexicalCheckListPlugin');
require('@lexical/react/LexicalClearEditorPlugin');
require('@lexical/react/LexicalClickableLinkPlugin');
require('@lexical/react/LexicalComposer');
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

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2
};
function ImageResizer({
  onResizeStart,
  onResizeEnd,
  buttonRef,
  imageRef,
  maxWidth,
  editor,
  showCaption,
  setShowCaption,
  captionsEnabled
}) {
  const controlWrapperRef = React$1.useRef(null);
  const userSelect = React$1.useRef({
    priority: '',
    value: 'default'
  });
  const positioningRef = React$1.useRef({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0
  });
  const editorRootElement = editor.getRootElement();
  // Find max width, accounting for editor padding.
  const maxWidthContainer = maxWidth ? maxWidth : editorRootElement !== null ? editorRootElement.getBoundingClientRect().width - 20 : 100;
  const maxHeightContainer = editorRootElement !== null ? editorRootElement.getBoundingClientRect().height - 20 : 100;
  const minWidth = 100;
  const minHeight = 100;
  const setStartCursor = direction => {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;
    const nwse = direction & Direction.north && direction & Direction.west || direction & Direction.south && direction & Direction.east;
    const cursorDir = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw';
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
      userSelect.current.value = document.body.style.getPropertyValue('-webkit-user-select');
      userSelect.current.priority = document.body.style.getPropertyPriority('-webkit-user-select');
      document.body.style.setProperty('-webkit-user-select', `none`, 'important');
    }
  };
  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', 'text');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', 'default');
      document.body.style.setProperty('-webkit-user-select', userSelect.current.value, userSelect.current.priority);
    }
  };
  const handlePointerDown = (event, direction) => {
    if (!editor.isEditable()) {
      return;
    }
    const image = imageRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null) {
      event.preventDefault();
      const {
        width,
        height
      } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;
      setStartCursor(direction);
      onResizeStart();
      controlWrapper.classList.add('image-control-wrapper--resizing');
      image.style.height = `${height}px`;
      image.style.width = `${width}px`;
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  };
  const handlePointerMove = event => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const isHorizontal = positioning.direction & (Direction.east | Direction.west);
    const isVertical = positioning.direction & (Direction.south | Direction.north);
    if (image !== null && positioning.isResizing) {
      // Corner cursor
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;
        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);
        const height = width / positioning.ratio;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
        positioning.currentWidth = width;
      } else if (isVertical) {
        let diff = Math.floor(positioning.startY - event.clientY);
        diff = positioning.direction & Direction.south ? -diff : diff;
        const height = clamp(positioning.startHeight + diff, minHeight, maxHeightContainer);
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
      } else {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;
        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);
        image.style.width = `${width}px`;
        positioning.currentWidth = width;
      }
    }
  };
  const handlePointerUp = () => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null && positioning.isResizing) {
      const width = positioning.currentWidth;
      const height = positioning.currentHeight;
      positioning.startWidth = 0;
      positioning.startHeight = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.currentHeight = 0;
      positioning.isResizing = false;
      controlWrapper.classList.remove('image-control-wrapper--resizing');
      setEndCursor();
      onResizeEnd(width, height);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
  };
  return /*#__PURE__*/React$1.createElement("div", {
    ref: controlWrapperRef
  }, !showCaption && captionsEnabled && /*#__PURE__*/React$1.createElement("button", {
    className: "image-caption-button",
    ref: buttonRef,
    onClick: () => {
      setShowCaption(!showCaption);
    }
  }, "Add Caption"), /*#__PURE__*/React$1.createElement("div", {
    className: "image-resizer image-resizer-n",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north);
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: "image-resizer image-resizer-ne",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north | Direction.east);
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: "image-resizer image-resizer-e",
    onPointerDown: event => {
      handlePointerDown(event, Direction.east);
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: "image-resizer image-resizer-se",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south | Direction.east);
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: "image-resizer image-resizer-s",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south);
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: "image-resizer image-resizer-sw",
    onPointerDown: event => {
      handlePointerDown(event, Direction.south | Direction.west);
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: "image-resizer image-resizer-w",
    onPointerDown: event => {
      handlePointerDown(event, Direction.west);
    }
  }), /*#__PURE__*/React$1.createElement("div", {
    className: "image-resizer image-resizer-nw",
    onPointerDown: event => {
      handlePointerDown(event, Direction.north | Direction.west);
    }
  }));
}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const imageCache = new Set();
const RIGHT_CLICK_IMAGE_COMMAND = lexical.createCommand('RIGHT_CLICK_IMAGE_COMMAND');
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
  srcSet,
  sizes,
  width,
  height,
  maxWidth
}) {
  useSuspenseImage(src);
  return /*#__PURE__*/React.createElement("img", {
    className: className || undefined,
    src: src,
    srcSet: srcSet,
    sizes: sizes,
    alt: altText,
    ref: imageRef,
    style: {
      height,
      maxWidth,
      width
    },
    loading: "lazy",
    decoding: "async",
    draggable: "false"
  });
}
function ImageComponent({
  src,
  srcSet,
  sizes,
  altText,
  nodeKey,
  width,
  height,
  maxWidth,
  resizable,
  showCaption,
  caption,
  captionsEnabled
}) {
  const imageRef = React$1.useRef(null);
  const buttonRef = React$1.useRef(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection.useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = React$1.useState(false);
  const [editor] = LexicalComposerContext.useLexicalComposerContext();
  const [selection, setSelection] = React$1.useState(null);
  const activeEditorRef = React$1.useRef(null);
  const onDelete = React$1.useCallback(payload => {
    if (isSelected && lexical.$isNodeSelection(lexical.$getSelection())) {
      const event = payload;
      event.preventDefault();
      const node = lexical.$getNodeByKey(nodeKey);
      node.remove();
      return true;
    }
    return false;
  }, [isSelected, nodeKey]);
  const onEnter = React$1.useCallback(event => {
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
  const onEscape = React$1.useCallback(event => {
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
  const onClick = React$1.useCallback(payload => {
    const event = payload;
    if (isResizing) {
      return true;
    }
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
  }, [isResizing, isSelected, setSelected, clearSelection]);
  const onRightClick = React$1.useCallback(event => {
    editor.getEditorState().read(() => {
      const latestSelection = lexical.$getSelection();
      const domElement = event.target;
      if (domElement.tagName === 'IMG' && lexical.$isRangeSelection(latestSelection) && latestSelection.getNodes().length === 1) {
        editor.dispatchCommand(RIGHT_CLICK_IMAGE_COMMAND, event);
      }
    });
  }, [editor]);
  React$1.useEffect(() => {
    let isMounted = true;
    const rootElement = editor.getRootElement();
    const unregister = utils.mergeRegister(editor.registerUpdateListener(({
      editorState
    }) => {
      if (isMounted) {
        setSelection(editorState.read(() => lexical.$getSelection()));
      }
    }), editor.registerCommand(lexical.SELECTION_CHANGE_COMMAND, (_, activeEditor) => {
      activeEditorRef.current = activeEditor;
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.CLICK_COMMAND, onClick, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(RIGHT_CLICK_IMAGE_COMMAND, onClick, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.DRAGSTART_COMMAND, event => {
      if (event.target === imageRef.current) {
        // TODO This is just a temporary workaround for FF to behave like other browsers.
        // Ideally, this handles drag & drop too (and all browsers).
        event.preventDefault();
        return true;
      }
      return false;
    }, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_DELETE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_BACKSPACE_COMMAND, onDelete, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ENTER_COMMAND, onEnter, lexical.COMMAND_PRIORITY_LOW), editor.registerCommand(lexical.KEY_ESCAPE_COMMAND, onEscape, lexical.COMMAND_PRIORITY_LOW));
    rootElement?.addEventListener('contextmenu', onRightClick);
    return () => {
      isMounted = false;
      unregister();
      rootElement?.removeEventListener('contextmenu', onRightClick);
    };
  }, [clearSelection, editor, isResizing, isSelected, nodeKey, onDelete, onEnter, onEscape, onClick, onRightClick, setSelected]);
  const setShowCaption = () => {
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      node.setShowCaption(true);
    });
  };
  const onResizeEnd = (nextWidth, nextHeight) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
    editor.update(() => {
      const node = lexical.$getNodeByKey(nodeKey);
      node.setWidthAndHeight(nextWidth, nextHeight);
    });
  };
  const onResizeStart = () => {
    setIsResizing(true);
  };
  const {
    historyState
  } = Editor.useSharedHistoryContext();
  const draggable = isSelected && lexical.$isNodeSelection(selection) && !isResizing;
  const isFocused = isSelected || isResizing;
  return /*#__PURE__*/React.createElement(React$1.Suspense, {
    fallback: null
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    draggable: draggable
  }, /*#__PURE__*/React.createElement(LazyImage, {
    className: isFocused ? `focused ${lexical.$isNodeSelection(selection) ? 'draggable' : ''}` : null,
    src: src,
    srcSet: srcSet,
    sizes: sizes,
    altText: altText,
    imageRef: imageRef,
    width: width,
    height: height,
    maxWidth: maxWidth
  })), showCaption && /*#__PURE__*/React.createElement("div", {
    className: "image-caption-container"
  }, /*#__PURE__*/React.createElement(LexicalNestedComposer.LexicalNestedComposer, {
    initialEditor: caption
  }, /*#__PURE__*/React.createElement(LexicalAutoFocusPlugin.AutoFocusPlugin, null), /*#__PURE__*/React.createElement(Editor.LinkPlugin, null), /*#__PURE__*/React.createElement(Editor.EmojisPlugin, null), /*#__PURE__*/React.createElement(LexicalHistoryPlugin.HistoryPlugin, {
    externalHistoryState: historyState
  }), /*#__PURE__*/React.createElement(LexicalRichTextPlugin.RichTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(Editor.LexicalContentEditable, {
      className: "ImageNode__contentEditable"
    }),
    placeholder: /*#__PURE__*/React.createElement(Editor.Placeholder, {
      className: "ImageNode__placeholder"
    }, "Enter a caption..."),
    ErrorBoundary: LexicalErrorBoundary
  }))), resizable && lexical.$isNodeSelection(selection) && isFocused && /*#__PURE__*/React.createElement(ImageResizer, {
    showCaption: showCaption,
    setShowCaption: setShowCaption,
    editor: editor,
    buttonRef: buttonRef,
    imageRef: imageRef,
    maxWidth: maxWidth,
    onResizeStart: onResizeStart,
    onResizeEnd: onResizeEnd,
    captionsEnabled: captionsEnabled
  })));
}

exports.RIGHT_CLICK_IMAGE_COMMAND = RIGHT_CLICK_IMAGE_COMMAND;
exports["default"] = ImageComponent;
