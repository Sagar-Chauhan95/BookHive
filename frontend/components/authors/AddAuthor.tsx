import { useContext, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import IAuthor from '../../types/author';
import serviceApis from '../../Apis/serviceApis';
import GlobalContext from '../context/globalContext';

function AddAuthor({ navigation }: any) {
    const { authors, dispatch } = useContext(GlobalContext);
    const [ author, setAuthor ] = useState<IAuthor>({ name: "", phone: "", email: "" });

    const onSubmit = async () => {
        if (!author.name || !author.email || !author.phone) {
            return Alert.alert("Fields should not be empty");
        }

        if (author.phone.length !== 10) {
            return Alert.alert("Phone number must be 10 digits");
        }

        try {
            const response = await serviceApis.getAuthorByEmail(author.email);

            if (response.status === 200 && response.data.length > 0) {
                Alert.alert("Email Already exist, Try with new email");
                setAuthor({ name: "", phone: "", email: "" });
            } else {
                const response = await serviceApis.addAuthor(author);

                if (response.status == 200) {
                    // const newAuthorArray = [];
                    dispatch({ type: 'add-author', payload: response.data });
                    Alert.alert("Successfully Added");
                    setAuthor({ name: "", phone: "", email: "" });
                    navigation.navigate('authors');
                } else {
                    Alert.alert("Unsuccessfull, try again");
                    setAuthor({ name: "", phone: "", email: "" });
                }

            }

        } catch (error) {
            console.log('Unable to add author', error);
        }
    };



    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.header }> Add author</Text>
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
                autoCapitalize='none'
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

export default AddAuthor;

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
