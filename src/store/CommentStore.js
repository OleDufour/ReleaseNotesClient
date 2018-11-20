import { observable, computed, action } from "mobx";


class CommentStore {
    @observable commentData = [];

    @action.bound
    updateComment(id, name) {     
        this.commentData.map(p => p.id === id ? p.name = name : p.name = p.name);      
    }


    @computed get allComments() { return this.commentData }



    
    @computed get comments() {
        var defaultValue = { id: 0, name: '' };
        // = unshift, yet immutable: 
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