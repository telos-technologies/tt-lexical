/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { LexicalEditor } from 'lexical';
import { Provider } from '@lexical/yjs';
import { Array as YArray, Map as YMap } from 'yjs';
export type Comment = {
    author: string;
    content: string;
    deleted: boolean;
    id: string;
    timeStamp: number;
    type: 'comment';
};
export type Thread = {
    comments: Array<Comment>;
    id: string;
    quote: string;
    type: 'thread';
};
export type Comments = Array<Thread | Comment>;
export declare function createComment(content: string, author: string, id?: string, timeStamp?: number, deleted?: boolean): Comment;
export declare function createThread(quote: string, comments: Array<Comment>, id?: string): Thread;
export declare class CommentStore {
    _editor: LexicalEditor;
    _comments: Comments;
    _changeListeners: Set<() => void>;
    _collabProvider: null | Provider;
    constructor(editor: LexicalEditor);
    isCollaborative(): boolean;
    getComments(): Comments;
    addComment(commentOrThread: Comment | Thread, thread?: Thread, offset?: number): void;
    deleteCommentOrThread(commentOrThread: Comment | Thread, thread?: Thread): {
        markedComment: Comment;
        index: number;
    } | null;
    registerOnChange(onChange: () => void): () => void;
    _withRemoteTransaction(fn: () => void): void;
    _withLocalTransaction(fn: () => void): void;
    _getCollabComments(): null | YArray<any>;
    _createCollabSharedMap(commentOrThread: Comment | Thread): YMap<any>;
    registerCollaboration(provider: Provider): () => void;
}
export declare function useCommentStore(commentStore: CommentStore): Comments;
