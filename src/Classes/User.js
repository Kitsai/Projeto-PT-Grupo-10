class User {
    id
    username
    password
    profile_picture
    gender
    email
    job_title
    admin
    created_at
    updated_at
    
    constructor(id, username,password,profile_picture,gender,email,job_title,admin) {
        this.id = id
        this.username = username
        this.password = password
        this.profile_picture = profile_picture
        this.gender = gender
        this.email = email
        this.job_title = job_title
        this.admin = admin
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default User