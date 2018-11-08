import { observable, computed } from "mobx";


class CommentStore {
    @observable commentData;
    @computed get comments() {
        var defaultValue = { id: 0, name: '' };
        var commentsWithDefault = this.commentData;
        commentsWithDefault.unshift(defaultValue)
        return commentsWithDefault;
    }

    constructor(commentData = []) {
        this.commentData = commentData;
    }
}


const commentStore = new CommentStore();
export default commentStore;