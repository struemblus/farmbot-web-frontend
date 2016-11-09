/** JSON form that gets POSTed to the API when user updates their info. */
export interface UserAccountUpdate {
    name?: string;
    email?: string;
    /** The user's *current* password. */
    password?: string;
    new_password?: string;
    /** Confirm that new password is correct. */
    new_password_confirmation?: string;
}
