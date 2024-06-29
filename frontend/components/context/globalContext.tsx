import React, { createContext } from "react";
import IAuthor from "../../types/author";
import IBook from "../../types/book";
import ICatalog from "../../types/catalog";
import IMember from "../../types/member";
import IPublisher from "../../types/publisher";
import ITransaction from "../../types/transaction";
import IUser from "../../types/user";

interface IAction {
    type: string,
    payload: any;
}

export interface IContext {
    books: IBook[],
    authors: IAuthor[],
    publishers: IPublisher[],
    catalogs: ICatalog[],
    members: IMember[],
    transactions: ITransaction[],
    users: IUser[];
    token: string;
    isLoading: boolean,
    // dispatch?: React.Dispatch<any>;
    dispatch: (action: IAction) => void;
}

const defaultDispatch: (action: IAction) => void = () => { };

const GlobalContext = createContext<IContext>(
    {
        books: [],
        authors: [],
        publishers: [],
        catalogs: [],
        members: [],
        transactions: [],
        users: [],
        token: "",
        isLoading: false,
        dispatch: defaultDispatch
    }
);

export default GlobalContext;