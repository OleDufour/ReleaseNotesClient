import { observable, computed, action } from "mobx";


class CommentStore {
    @observable commentData = [];

    @action.bound
    updateComment(id, name) {
        this.commentData.map(p => p.id === id ? p.name = name : p.name = p.name);
    }

    @action
    updateCommentSelected(id) {

        alert(id)
        if (id == null)
            this.commentData.map(p => p.selected = false);
        else
            this.commentData.map(p => p.id == id ? p.selected = true : p.selected = p.selected);
    }


    @computed get allComments() { return this.commentData }


    @observable selectedCommentId = null;
    @action
    updateSelectedCommentId(commentId) {
        this.selectedCommentId = commentId;
    }



    @computed get comments() {
        var defaultValue = { id: 0, name: '' };
        // = unshift, yet immutable: 
        console.log('comments:', this.commentData);
        var commentsWithDefault = [defaultValue, ... this.commentData];
        return commentsWithDefault;
    }

    @computed get commentsCount() {

        return this.commentData.length;
    }

    @computed get getCommentData() {
        return this.commentData;
    }

    constructor(commentData = []) {
        this.commentData = commentData;
    }
}


const commentStore = new CommentStore();
export default commentStore;