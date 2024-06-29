import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import GlobalContext from '../context/globalContext';
import IBook from '../../types/book';
import IPublisher from '../../types/publisher';
import serviceApis from '../../Apis/serviceApis';
import IAuthor from '../../types/author';
import ICatalog from '../../types/catalog';

interface BookProps {
    data: IBook;
    index: number;
}

function Book({ data, index }: BookProps) {

    const navigation = useNavigation();
    const { books, authors, publishers, catalogs, dispatch } = useContext(GlobalContext);
    const [ authorNames, setAuthorNames ] = useState<string[]>([]);
    const [ publisherName, setPublisherName ] = useState<string>();

    const navigateToEditMember = () => {
        navigation.navigate('edit-book', data);
    };

    const deleteBook = async () => {
        try {
            console.log("Delete", data);
            const response = await serviceApis.deleteBookById(data._id!);
            console.log("response ", response.data);
            if (response.status === 200) {
                const updatedBooks = books.filter((i: IBook) => i._id !== data._id);
                dispatch({ type: "books", payload: updatedBooks });

                // const response1 = await serviceApis.getCatalogs();
                // // const response1 = await serviceApis.getCatalogByBookId(response.data.id);
                // // console.log("Response1", response1.data);
                // if (response1.status === 200) {
                //     const deletedBookCatalog = response1.data.find((catalog: ICatalog) => catalog.bookId === response.data.id);
                //     // console.log(deletedBookCatalog);
                //     if (deletedBookCatalog) {
                //         const response2 = await serviceApis.deleteBookFromCatalog(deletedBookCatalog.data.id);
                //         if (response2.status === 200) {
                //             const updatedCatalogs = catalogs.filter((catalog: ICatalog) => catalog.id !== response2.data.id);
                //             dispatch({ type: "catalogs", payload: updatedCatalogs });

                //         } else {
                //             console.log("Unable to delete from catalog");
                //         }
                //     } else {
                //         console.log("Catalog doesn' exist");
                //     }
                // }

            }
        } catch (error) {
            console.log("Unable to delete book", error);
        }
    };

    const onDelete = () => {
        Alert.alert("Alert Title", "Sure wanna delete", [
            {
                text: "Cancel",
                onPress: () => Alert.alert("Book not deleted")
            },
            {
                text: 'Ok',
                onPress: deleteBook
            }
        ]);
    };

    const onAddAuthor = () => {
        navigation.navigate('author-picker', data);
    };

    const onAddPublisher = () => {
        navigation.navigate('publisher-picker', data);
    };

    const getAuthorsName = () => {
        const authorsIds = data.authorIDs;
        if (!authorsIds) {
            console.log("This book does not have any author");
            return [];
        } else {
            const matchedAuthorsName = authorsIds.map((authorId: string) => {
                const matchAuthor = authors.find((i: IAuthor) => i._id === authorId);
                return matchAuthor ? matchAuthor.name : null;
            }).filter(Boolean);
            return matchedAuthorsName as string[];
        }
    };

    const getPublisherName = () => {
        const publisherId = data.publisherId;
        if (!publisherId) {
            console.log('No any publisher');
            return null;
        } else {
            const matchedPublisher = publishers.find((publisher: IPublisher) => publisher._id === publisherId);
            return matchedPublisher ? matchedPublisher.name : null;
        }
    };

    useEffect(() => {
        setAuthorNames(getAuthorsName());
        setPublisherName(getPublisherName() as string | undefined);
    }, [ authors, books, publishers, data ]);

    return (
        <SafeAreaView style={ { backgroundColor: index % 2 === 0 ? '#F3F3F7' : 'white' } }>
            <View style={ styles.container }>
                <View>
                    <Text style={ styles.title }> Title:  <Text style={ styles.text }>{ data.title }</Text>  </Text>
                    <Text style={ styles.title }> Genre: <Text style={ styles.text }>{ data.genre }</Text> </Text>
                    <Text style={ styles.title }> Category: <Text style={ styles.text }>{ data.category }</Text> </Text>
                </View>
                <View>
                    <Pressable style={ { marginBottom: 10 } } onPress={ navigateToEditMember }>
                        <Feather name="edit" size={ 24 } color="green" />
                    </Pressable>
                    <Pressable onPress={ onDelete }>
                        <AntDesign name="delete" size={ 24 } color="red" />
                    </Pressable>
                </View>
            </View>

            <View style={ [ styles.container, { marginBottom: -30, marginTop: -20 } ] }>
                <Text style={ styles.title }> Authors:  <Text >
                    { authorNames?.map((authorName: string, index: number) => (
                        <Text key={ index } style={ [ styles.text, { marginRight: 5 } ] }>{ authorName }</Text>
                    )) }
                </Text></Text>
            </View>

            <View style={ styles.container }>
                <Text style={ styles.title }> Publishers:  <Text style={ styles.text }>{ publisherName }</Text> </Text>
            </View>
            <View style={ [ styles.container, { marginTop: -10, justifyContent: "center", gap: 100 } ] }>
                <Pressable style={ [ styles.button, { width: 100 } ] } onPress={ onAddAuthor }>
                    <Text style={ [ styles.buttonText, { fontSize: 12 } ] }>Update Author</Text>
                </Pressable>
                <Pressable style={ [ styles.button, { width: 90 } ] } onPress={ onAddPublisher }>
                    <Text style={ [ styles.buttonText, { fontSize: 12 } ] }>Add Publisher</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

export default Book;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    title: {
        color: "red",
        fontSize: 14
    },
    text: {
        fontSize: 14,
        color: "brown",

    },
    button: {
        width: 60,
        height: 30,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'brown',
        marginBottom: 8,
        alignItems: "center"
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
});