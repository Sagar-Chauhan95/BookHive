import { useContext, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import serviceApis from '../../Apis/serviceApis';
import GlobalContext from '../context/globalContext';
import IPublisher from '../../types/publisher';
import IMember from '../../types/member';
import IBook from '../../types/book';

function AddBook({ navigation }: any) {
    const { dispatch } = useContext(GlobalContext);
    const [ book, setBook ] = useState<IBook>({ title: "", genre: "", category: "", authorIDs: [], publisherId: "" });

    const onSubmit = async () => {
        if (!book.title || !book.genre || !book.category) {
            return Alert.alert("Fields should not be empty");
        }

        try {
            const response = await serviceApis.getBookByTitle(book.title);

            if (response.status === 200 && response.data.length > 0) {
                Alert.alert("Book Already exist, add new book");
                setBook({ title: "", genre: "", category: "" });
            } else {
                const response = await serviceApis.addBook(book);


                if (response.status === 200) {
                    const newCatalog = {
                        bookId: response.data._id,
                        numberOfCopies: 10,
                        availableCopies: 7
                    };

                    await serviceApis.addBookToCatalog(newCatalog);

                    dispatch({ type: 'add-book', payload: response.data });
                    navigation.navigate('books');

                }


                // if (response.status === 200) {
                //     const newCatalog = {
                //         bookId: response.data.id,
                //         numberOfCopies: 10,
                //         availableCopies: 7
                //     };

                //     const response1 = await serviceApis.addBookToCatalog(newCatalog);
                //     console.log("Hello", response1.data);

                //     if (response1.status === 200) {
                //         dispatch({ type: 'add-book', payload: response.data });
                //         dispatch({ type: "catalogs", payload: response1.data });

                //         Alert.alert("Successfully Added");
                //         setBook({ title: "", genre: "", category: "" });
                //         navigation.navigate('books');

                //     } else {
                //         Alert.alert("Unsuccessfull to add to catalog");

                //     }

                else {
                    Alert.alert("Unsuccessfull to add book, try again");
                    setBook({ title: "", genre: "", category: "" });
                }

            }

        } catch (error) {
            console.log('Unable to add book', error);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.header }> Add Book</Text>
            <TextInput
                value={ book.title }
                placeholder='Enter title'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setBook({ ...book, title: text }) }

            />
            <TextInput
                value={ book.genre }
                placeholder='Enter genre'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setBook({ ...book, genre: text }) }

            />
            <TextInput
                value={ book.category }
                placeholder='Enter category'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setBook({ ...book, category: text }) }
            />

            <Pressable
                style={ styles.button }
                onPress={ onSubmit }
            >
                <Text style={ styles.buttonText }>Submit</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export default AddBook;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: -200

    },
    header: {
        fontSize: 30,
        color: 'brown',
        fontWeight: "bold",
        marginBottom: 50,
        marginTop: 60
    },
    input: {
        width: "70%",
        height: 50,
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 20,
        backgroundColor: "white",
        color: "red"
    },
    button: {
        width: 110,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'brown',
        marginBottom: 8,
        alignItems: "center"
    },
    buttonText: {
        color: 'white',
        fontSize: 22
    }
});
