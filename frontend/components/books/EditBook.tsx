import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';

import serviceApis from '../../Apis/serviceApis';
import GlobalContext from '../context/globalContext';
import IBook from '../../types/book';

function EditBook({ route }: any) {
    const { books, dispatch } = useContext(GlobalContext);
    const navigation = useNavigation();
    const data = route.params as IBook;
    const [ book, setBook ] = useState<IBook>(data);

    const onSubmit = async () => {
        try {

            const response = await serviceApis.editBookById(data._id!, book);

            if (response.status === 200) {
                const updatedBookResponse = await serviceApis.getBookById(data._id!);
                const index = books.findIndex((i: IBook) => i._id === book._id);
                if (index === -1) {
                    throw new Error("Book doesn't exist");
                } else {
                    const newBooksArray = [ ...books ];
                    newBooksArray[ index ] = updatedBookResponse.data;
                    dispatch({ type: 'books', payload: newBooksArray });
                    navigation.navigate('books');
                }
            };

        } catch (error) {
            console.log("Unable to Edit member", error);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.header }> Edit Book</Text>
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

export default EditBook;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginTop: -110

    },
    header: {
        fontSize: 30,
        color: 'brown',
        fontWeight: "bold",
        marginBottom: 50
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