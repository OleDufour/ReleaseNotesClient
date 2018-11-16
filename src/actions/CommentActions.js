import commentStore from '../store/CommentStore';
import { action } from 'mobx';

// export const commentActions = {

//     updateComment
// }


class CommentActions {

    @action
    updateComment(id, name) {
        commentStore.commentData.map(p => p.id === id ? p.name = name : p.name = p.name);


    }


}

const commentActions = new CommentActions();
export default commentActions;