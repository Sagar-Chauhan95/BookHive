import { IContext } from "./globalContext";

interface IAction {
    type: string,
    payload: any;
}

function reducer(state: IContext, action: IAction) {
    const { type, payload } = action;
    const { authors, publishers, members, books,
        catalogs, transactions, isLoading, token } = state;
    switch (type) {
        case 'authors':
            return { ...state, authors: payload };

        case 'add-author':
            return { ...state, authors: [ ...authors, payload ] };

        case 'publishers':
            return { ...state, publishers: payload };

        case 'add-publisher':
            return { ...state, publishers: [ ...publishers, payload ] };
        case 'members':
            return { ...state, members: payload };

        case 'add-member':
            return { ...state, members: [ ...members, payload ] };

        case 'books':
            return { ...state, books: payload };

        case 'add-book':
            return { ...state, books: [ ...books, payload ] };

        case 'catalogs':
            return { ...state, catalogs: payload };

        case 'add-catalog':
            return { ...state, catalogs: [ ...catalogs, payload ] };

        case 'transactions':
            return { ...state, transactions: payload };

        case 'add-transaction':
            return { ...state, transactions: [ ...transactions, payload ] };

        case 'loading':
            return { ...state, isLoading: payload };

        case 'token':
            return { ...state, token: payload };

        default:
            return { state };

    }
}

export default reducer;