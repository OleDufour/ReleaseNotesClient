import { observable, computed, action } from "mobx";


class CommentStore {
    @observable commentData;
    @computed get comments() { return this.commentData; }
    
    constructor(commentData = []) {
        this.commentData = commentData;
    }
}


const commentStore = new CommentStore();
export default commentStore;