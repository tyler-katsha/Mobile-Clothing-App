import {Dispatch, SetStateAction} from "react";

export interface UserProps{

}
export interface PartialUserProps{

}

export interface UserContextType{
    user: null | UserProps;
    logout: () => void;
    fetchUser: () => Promise<void>;
    setUser: Dispatch<SetStateAction<UserProps | null>>
    updateUser: (newData: UserProps) => UserProps;
    updatePartialUser: (partUser: PartialUserProps) => void;
}