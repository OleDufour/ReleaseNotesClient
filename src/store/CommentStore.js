import { observable, computed } from "mobx";


class CommentStore {
    @observable commentData;
    @computed get comments() {
        var defaultValue = { id: 0, name: '' };
        // a deep copy, else error : Computed values are not allowed to cause side effects by changing observables that are already being observed.
        var commentsWithDefault = JSON.parse(JSON.stringify(this.commentData)); 
        commentsWithDefault.unshift(defaultValue)
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