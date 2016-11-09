/** JSON form that gets POSTed to the API when user updates their info. */
export interface UserAccountUpdate {
    name?: string;
    email?: string;
    /** The user's *current* password. */
    old_password?: string;
    /** The user's *next* password. */
    password?: string;
    /** Confirm that new password is correct. */
    password_confirmation?: string;
}
