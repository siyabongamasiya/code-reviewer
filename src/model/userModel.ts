export interface User{
    id:number,
    name:string,
    email:string,
    password:string,
    profile_picture:string
}

export interface Memberuser{
    user_id:number,
    role_in_project:string
}

// User
// id (PK)
// name
// email
// password_hash
// role (submitter/reviewer)
// profile_picture
// created_at