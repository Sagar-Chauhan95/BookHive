import { useContext, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import serviceApis from '../../Apis/serviceApis';
import GlobalContext from '../context/globalContext';
import IPublisher from '../../types/publisher';

function AddPublisher({ navigation }: any) {
    const { dispatch } = useContext(GlobalContext);
    const [ publisher, setPublisher ] = useState<IPublisher>({ name: "", phone: "", email: "", address: "" });

    const onSubmit = async () => {
        if (!publisher.name || !publisher.email || !publisher.phone || !publisher.address) {
            return Alert.alert("Fields should not be empty");
        }

        if (publisher.phone.length !== 10) {
            return Alert.alert("Phone number must be 10 digits");
        }

        try {
            const response = await serviceApis.getPublisherByEmail(publisher.email);

            if (response.status === 200 && response.data.length > 0) {
                Alert.alert("Email Already exist, Try with new email");
                setPublisher({ name: "", phone: "", email: "", address: "" });
            } else {
                const response = await serviceApis.addPublisher(publisher);

                if (response.status == 200) {

                    dispatch({ type: 'add-publisher', payload: response.data });
                    Alert.alert("Successfully Added");
                    setPublisher({ name: "", phone: "", email: "", address: "" });
                    navigation.navigate('publishers');
                } else {
                    Alert.alert("Unsuccessfull, try again");
                    setPublisher({ name: "", phone: "", email: "", address: "" });
                }

            }

        } catch (error) {
            console.log('Unable to add publisher', error);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.header }> Add Publisher</Text>
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
                autoCapitalize='none'
                onChangeText={ (text: string) => setPublisher({ ...publisher, email: text }) }

            />
            <TextInput
                value={ publisher.address }
                placeholder='Enter address'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                autoCapitalize='none'
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

export default AddPublisher;

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
