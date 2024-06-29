import IAuthor from '../types/author';
import IBook from '../types/book';
import ICatalog from '../types/catalog';
import IMember from '../types/member';
import IPublisher from '../types/publisher';
import ITransaction from '../types/transaction';
import IUser from '../types/user';
import http from './axios';

function getAuthors() {
    return http.get('/authors');
}

function getAuthorById(authorId: string) {
    return http.get(`/authors/${authorId}`);
}

function editAuthorById(id: string, author: IAuthor) {
    return http.put(`/authors/${id}`, author);
}

function deleteAuthorById(id: string) {
    return http.delete(`/authors/${id}`);
}

function getAuthorByEmail(email: string) {
    return http.get(`/authors?email=${email}`);
}

function addAuthor(author: IAuthor) {
    return http.post('/authors', author);
}

function getPublishers() {
    return http.get('/publishers');
}

function getPublisherById(publisherId: string) {
    return http.get(`/publishers/${publisherId}`);
}

function addPublisher(publisher: IPublisher) {
    return http.post('/publishers', publisher);

}

function getPublisherByEmail(email: string) {
    return http.get(`/publishers?email=${email}`);
}

function deletePublisherById(id: string) {
    return http.delete(`/publishers/${id}`);
}

function editPublisherByid(id: string, publisher: IPublisher) {
    return http.put(`/publishers/${id}`, publisher);

}

function getMembers() {
    return http.get('/members');
}
function getMemberById(memberId: string) {
    return http.get(`/members/${memberId}`);
}

function getMemberByResidentId(residentId: string) {
    return http.get(`/members?residentID=${residentId}`);
}

function deleteMemberById(id: string) {
    return http.delete(`/members/${id}`);
}

function addMember(member: IMember) {
    return http.post('/members', member);
}

function editMemberById(id: string, member: IMember) {
    return http.put(`/members/${id}`, member);

}

function getBooks() {
    return http.get("/books");
}

function getBookById(bookId: string) {
    return http.get(`/books/${bookId}`);
}
function deleteBookById(bookId: string) {
    return http.delete(`/books/${bookId}`);
}

function getBookByTitle(title: string) {
    return http.get(`/books?title=${title}`);
}

function addBook(book: IBook) {
    return http.post('/books', book);
}

function editBookById(id: string, book: IBook) {
    return http.put(`/books/${id}`, book);
}

function getCatalogs() {
    return http.get('/catalogs');
}

function editCatalogById(catalogId: string, catalog: ICatalog) {
    return http.put(`/catalogs/${catalogId}`, catalog);

}


function getTransactions() {
    return http.get('/transactions');
}

function addTransaction(newTransaction: ITransaction) {
    return http.post('/transactions', newTransaction);

}

function deleteTransaction(transactionId: string) {
    return http.delete(`/transactions/${transactionId}`);
}


function signUp(user: IUser) {
    return http.post(`/users/signup`, user);
}

function singIn(user: IUser) {
    return http.post(`/users/signin`, user);
}

function addBookToCatalog(catalog: ICatalog) {
    return http.post('/catalogs', catalog);
}

function deleteBookFromCatalog(id: string) {
    return http.delete(`/catalogs/${id}`);

}

function getCatalogByBookId(bookId: string) {
    return http.get(`/catalogs?bookId=${bookId}`);
}
export default {
    getAuthors,
    getAuthorById,
    editAuthorById,
    deleteAuthorById,
    getAuthorByEmail,
    addAuthor,
    getPublishers,
    getPublisherById,
    addPublisher,
    getPublisherByEmail,
    deletePublisherById,
    editPublisherByid,
    getMembers,
    getMemberById,
    deleteMemberById,
    getMemberByResidentId,
    addMember,
    editMemberById,
    getBooks,
    getBookById,
    deleteBookById,
    getBookByTitle,
    addBook,
    editBookById,
    getCatalogs,
    editCatalogById,
    getTransactions,
    addTransaction,
    deleteTransaction,
    signUp,
    singIn,
    addBookToCatalog,
    deleteBookFromCatalog,
    getCatalogByBookId

};
