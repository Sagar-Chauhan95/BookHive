import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import IAuthor from '../../types/author';
import serviceApis from '../../Apis/serviceApis';
import GlobalContext from '../context/globalContext';
import IPublisher from '../../types/publisher';

function EditPublisher() {
    const { publishers, dispatch } = useContext(GlobalContext);
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params as IPublisher;
    const [ publisher, setPublisher ] = useState<IPublisher>(data);

    const onSubmit = async () => {
        try {
            const response = await serviceApis.editPublisherByid(data._id!, publisher);
            if (response.status === 200) {
                const updatedPublisherResponse = await serviceApis.getPublisherById(data._id!);
                const index = publishers.findIndex((i: IAuthor) => i._id === data._id);
                if (index === -1) {
                    throw new Error("Publisher doesn't exist");
                } else {
                    const newPublisherArray = [ ...publishers ];
                    newPublisherArray[ index ] = updatedPublisherResponse.data[ 0 ];
                    dispatch({ type: 'publishers', payload: newPublisherArray });
                    navigation.navigate('publishers');

                }

            };

        } catch (error) {
            console.log("Unable to Edit publisher", error);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.header }> Edit Publisher</Text>
            <TextInput
                value={ publisher.name }
                placeholder='Enter name'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setPublisher({ ...publisher, name: text }) }

            />
            <TextInput
                value={ publisher.phone }
                placeholder='Enter phone'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setPublisher({ ...publisher, phone: text }) }

            />

            <TextInput
                value={ publisher.email }
                placeholder='Enter email'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setPublisher({ ...publisher, email: text }) }

            />

            <TextInput
                value={ publisher.address }
                placeholder='Enter address'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setPublisher({ ...publisher, address: text }) }

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

export default EditPublisher;


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