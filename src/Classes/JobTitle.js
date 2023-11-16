class JobTitle {
    id
    name
    team
    created_at

    constructor(id, name, team) {
        this.id = id
        this.name = name
        this.team = team
        this.created_at = new Date()
    }
}