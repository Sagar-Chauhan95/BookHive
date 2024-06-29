import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Pressable, RefreshControlBase, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import IAuthor from '../../types/author';
import serviceApis from '../../Apis/serviceApis';
import GlobalContext from '../context/globalContext';

function EditAuthor() {
    const { authors, dispatch } = useContext(GlobalContext);
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params as IAuthor;
    const [ author, setAuthor ] = useState<IAuthor>(data);

    const onSubmit = async () => {
        try {
            const response = await serviceApis.editAuthorById(data._id!, author);
            if (response.status === 200) {

                const updatedAuthorResponse = await serviceApis.getAuthorById(data._id!);

                const index = authors.findIndex((i: IAuthor) => i._id === data._id);
                if (index === -1) {
                    throw new Error("Author doesn't exist");
                } else {
                    const newAuthorsArray = [ ...authors ];
                    newAuthorsArray[ index ] = updatedAuthorResponse.data[ 0 ];
                    dispatch({ type: 'authors', payload: newAuthorsArray });
                    navigation.navigate('authors');

                }

            };

        } catch (error) {
            console.log("Unable to Edit author", error);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.header }> Edit author</Text>
            <TextInput
                value={ author.name }
                placeholder='Enter name'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setAuthor({ ...author, name: text }) }

            />
            <TextInput
                value={ author.phone }
                placeholder='Enter phone'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setAuthor({ ...author, phone: text }) }

            />

            <TextInput
                value={ author.email }
                placeholder='Enter email'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setAuthor({ ...author, email: text }) }

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

export default EditAuthor;


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