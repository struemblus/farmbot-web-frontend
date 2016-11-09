/** JSON form that gets POSTed to the API when user updates their info. */
export interface UserAccountUpdate {
    name?: string;
    email?: string;
    password?: string;
    new_password?: string;
    new_password_confirmation?: string;
}
