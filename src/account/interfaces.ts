/** JSON form that gets POSTed to the API when user updates their info. */
export interface UserAccountUpdate {
    name?: string;
    email?: string;
    oldPwd?: string;
    newPwd?: string;
    /** Confirm that new password is correct. */
    checkNewPwd?: string;
}
