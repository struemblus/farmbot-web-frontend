// TODO: Remove this interface when TS adds subset types - RC
export interface User {
    id?: number;
    device_id?: number;
    name?: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
};

export interface UpdateUserPayl {
    type: string;
    payload: User;
};
