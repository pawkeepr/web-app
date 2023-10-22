import { IAddress } from "./address";

export type ITutor = {
    id?: string;
    name?: string;
    email?: string;
    document: string;
    created_at?: string;
    updated_at?: string;
    avatar?: string;
    phone?: string;
    address?: IAddress
}