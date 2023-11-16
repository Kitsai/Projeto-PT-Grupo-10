class Post {
    id
    user_id
    content
    updated_at
    created_at

    constructor(id, user_id, content) {
        this.id = id
        this.user_id = user_id
        this.content = content
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default Post