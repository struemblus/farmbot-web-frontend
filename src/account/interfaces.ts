// export interface UpdateEmailPayl {
//     index: number;
//     comment: string;
// }

// export interface User {
//     name: string;
//     email: string;
// };

export interface User {
    id?: number;
    device_id?: number;
    name?: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
};

export interface UpdateUserSuccess {
    type: "UPDATE_USER_SUCCESS";
    payload: string;
};

export interface UpdateUserErr {
    type: "UPDATE_USER_ERROR";
    payload: string;
};

export interface UpdateUserPayl {
    type: string;
    payload: string;
};
