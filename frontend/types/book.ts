export default interface IBook {
    _id?: string,
    title?: string,
    genre?: string,
    category?: string,
    authorIDs?: string[],
    publisherId?: string;
}