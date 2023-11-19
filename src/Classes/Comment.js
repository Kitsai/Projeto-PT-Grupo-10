class Comment {
    id
    post_id
    user_id
    content

    constructor(id, post_id, user_id, content) {
        this.id = id
        this.post_id = post_id
        this.user_id = user_id
        this.content = content
    }
}

export default Comment;