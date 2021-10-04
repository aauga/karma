export type LoginModel = {
    email:string;
    password: string
}
// čia extendinu LoginModelį, bet galima ir naują kurt
export type RegisterModel = LoginModel & {
    firstname:string;
    lastname:string;
}
