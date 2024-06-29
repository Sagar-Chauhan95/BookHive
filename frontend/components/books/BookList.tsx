import { useContext, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import Book from './Book';
import IBook from '../../types/book';
import GlobalContext from '../context/globalContext';
import Header from '../Header.ios';
import serviceApis from '../../Apis/serviceApis';

function BookList({ navigation }: any) {
    const { books, dispatch } = useContext(GlobalContext);
    const [ searchTitle, setSearchTitle ] = useState<string>();
    const [ filteredBooks, setFilteredBooks ] = useState<IBook[]>(books);

    const searchBook = (text: string) => {
        setSearchTitle(text);
        if (text.trim() === '') {
            setFilteredBooks(books);

        } else {
            const newBookArray = [ ...books ].filter((book: IBook) => {
                if (book.title) {
                    return book.title.toLowerCase().includes(text.trim().toLowerCase());
                }
            }
            );
            setFilteredBooks(newBookArray);

        }

    };

    const addBook = () => {
        navigation.navigate("add-book");

    };

    const onAction = () => {
        navigation.navigate("burrow-book");

    };

    useEffect(() => {
        setFilteredBooks(books);
    }, [ books, dispatch ]);



    return (
        <SafeAreaView>
            <Header />
            <View style={ styles.searchBar }>

                <TextInput
                    style={ styles.input }
                    placeholder='Search Book by Title'
                    value={ searchTitle }
                    placeholderTextColor={ 'red' }
                    textAlign='left'
                    onChangeText={ searchBook }

                />
                <Pressable style={ styles.filterButton }
                    onPress={ onAction }
                >
                    <Text style={ styles.filterButtonText }> Action</Text>
                </Pressable>
            </View>
            <Pressable style={ [ styles.button, { width: 150, marginTop: -10, marginLeft: 130 } ] }
                onPress={ addBook }
            >
                <Text style={ [ styles.buttonText, { fontSize: 18 } ] }> Add New Book</Text>
            </Pressable>

            <FlatList
                data={ filteredBooks }
                renderItem={ ({ item, index }) => <Book data={ item } index={ index } /> }
                keyExtractor={ (item, index) => item._id ? item._id.toString() : index.toString() }
            />

        </SafeAreaView >
    );
};

export default BookList;

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'brown',
        alignContent: "center"

    },
    headerText: {
        color: 'white',
        fontSize: 20,
        padding: 10,

    },
    input: {
        width: 300,
        height: 25,
        borderWidth: 1,
        borderRadius: 7,
        padding: 3,
        backgroundColor: 'white',
        marginBottom: 0,
        alignItems: 'center',

    },

    searchBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        borderBottomColor: 'black',
        borderWidth: 1,
        alignContent: "center",
        alignItems: 'center',
        marginBottom: 20,
        gap: 8

    }
    ,
    filterButton: {
        width: 80,
        height: 30,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'brown',
        marginTop: 10,
        // marginLeft: 100,
        marginBottom: 8,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        // marginRight: 40
    },

    filterButtonText: {
        color: 'white',
        fontSize: 16
    }
    ,
    button: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'brown',
        marginTop: 20,
        marginLeft: 100,
        marginBottom: 8,
        alignItems: "center",
        alignContent: "flex-end",
        justifyContent: "flex-end"
    },
    buttonText: {
        color: 'white',
        fontSize: 22
    }
});
