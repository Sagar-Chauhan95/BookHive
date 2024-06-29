import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useRef, useState } from "react";
import GlobalContext from "../context/globalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import IAuthor from "../../types/author";
import serviceApis from "../../Apis/serviceApis";
import IBook from "../../types/book";


function AuthorPicker({ route, navigation }: any) {

    const { authors, books, dispatch } = useContext(GlobalContext);
    const [ selectedAuthor, setSelectedAuthor ] = useState<string>();
    const data = route.params;

    const onAdd = async () => {
        try {
            if (!selectedAuthor) {
                return Alert.alert("Please Scroll to pick author");
            }
            const authorExist = data.authorIDs.find((id: string) => id === selectedAuthor);
            if (authorExist) {
                return Alert.alert("Authors already on the list");
            } else {
                const newBook = { ...data };
                newBook.authorIDs.push(selectedAuthor);
                const response = await serviceApis.editBookById(data._id, newBook);
                if (response.status === 200) {
                    const updatedBookResponse = await serviceApis.getBookById(data._id);
                    const index = books.findIndex((i: IBook) => i._id === data._id);
                    if (index === -1) {
                        throw new Error("Book doesn't exist");
                    } else {
                        const newBookArray = [ ...books ];
                        newBookArray[ index ] = updatedBookResponse.data[ 0 ];

                        dispatch({ type: 'books', payload: newBookArray });
                        Alert.alert("Author successfully added to book");
                        navigation.navigate('books');

                    }

                };

            }


        } catch (error) {
            console.log("Server Error", error);
        }

    };

    const onRemove = async () => {
        try {
            if (!selectedAuthor) {
                return Alert.alert("Please Scroll to pick author");
            }

            const authorExist = data.authorIDs.find((id: string) => id === selectedAuthor);
            if (!authorExist) {
                return Alert.alert("Author doesn't exist ");
            } else {
                const book1 = { ...data };
                const newAuthorsId = book1.authorIDs.filter((id: string) => id !== selectedAuthor);
                const newBook = { ...book1, authorIDs: newAuthorsId };
                console.log(newBook);
                const response = await serviceApis.editBookById(data.id, newBook);
                if (response.status === 200) {
                    const index = books.findIndex((i: IBook) => i.id === response.data.id);
                    if (index === -1) {
                        throw new Error("Book doesn't exist");
                    } else {
                        const newBookArray = [ ...books ];
                        newBookArray[ index ] = response.data;

                        dispatch({ type: 'books', payload: newBookArray });
                        Alert.alert("Author successfully deleted from book");
                        navigation.navigate('books');

                    }

                };

            }


        } catch (error) {
            console.log("Server Error", error);
        }
    };

    return (
        <SafeAreaView  >
            <Picker

                selectedValue={ selectedAuthor }
                onValueChange={ (itemValue) => { setSelectedAuthor(itemValue); }
                }>
                { authors.map((author: IAuthor, index: number) => (
                    <Picker.Item key={ index } label={ author.name } value={ author._id } />
                )) }
            </Picker>

            <View style={ { flexDirection: "row", justifyContent: "center", gap: 20 } }>
                <Pressable style={ styles.button }
                    onPress={ onAdd }
                >
                    <Text style={ styles.buttonText }>Add</Text>
                </Pressable>
                <Pressable style={ styles.button }
                    onPress={ onRemove }
                >
                    <Text style={ styles.buttonText }>Remove</Text>
                </Pressable>
            </View>

        </SafeAreaView >
    );
};

export default AuthorPicker;


const styles = StyleSheet.create({

    button: {
        width: 85,
        height: 30,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'brown',
        marginBottom: 8,
        alignItems: "center",
        marginTop: 60
    },

    buttonText: {
        color: 'white',
        fontSize: 16
    }
});