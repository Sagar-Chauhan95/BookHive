import { useContext, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

import serviceApis from '../../Apis/serviceApis';
import GlobalContext from '../context/globalContext';
import IPublisher from '../../types/publisher';
import IMember from '../../types/member';

function AddMember({ navigation }: any) {
    const { dispatch } = useContext(GlobalContext);
    const [ member, setMember ] = useState<IMember>({ firstname: "", lastname: "", residentID: "", phone: "", email: "", address: "" });

    const onSubmit = async () => {
        if (!member.firstname || !member.lastname || !member.email || !member.phone || !member.address || !member.residentID) {
            return Alert.alert("Fields should not be empty");
        }

        if (member.phone.length !== 10) {
            return Alert.alert("Phone number must be 10 digits");
        }

        try {
            const response = await serviceApis.getMemberByResidentId(member.residentID);

            if (response.status === 200 && response.data.length > 0) {
                Alert.alert("Resident ID Already exist, Try with new ID");
                setMember({ firstname: "", lastname: "", residentID: "", phone: "", email: "", address: "" });
            } else {
                const response = await serviceApis.addMember(member);

                if (response.status == 200) {

                    dispatch({ type: 'add-member', payload: response.data });
                    Alert.alert("Successfully Added");
                    setMember({ firstname: "", lastname: "", residentID: "", phone: "", email: "", address: "" });
                    navigation.navigate('members');
                } else {
                    Alert.alert("Unsuccessfull, try again");
                    setMember({ firstname: "", lastname: "", residentID: "", phone: "", email: "", address: "" });
                }

            }

        } catch (error) {
            console.log('Unable to add member', error);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.header }> Add Member</Text>
            <TextInput
                value={ member.firstname }
                placeholder='Enter firstname'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setMember({ ...member, firstname: text }) }

            />
            <TextInput
                value={ member.lastname }
                placeholder='Enter lastname'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setMember({ ...member, lastname: text }) }

            />
            <TextInput
                value={ member.residentID }
                placeholder='Enter Resident Id'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                onChangeText={ (text: string) => setMember({ ...member, residentID: text }) }

            />

            <TextInput
                value={ member.phone }
                placeholder='Enter phone'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                autoCapitalize='none'
                onChangeText={ (text: string) => setMember({ ...member, phone: text }) }

            />

            <TextInput
                value={ member.email }
                placeholder='Enter email'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                autoCapitalize='none'
                onChangeText={ (text: string) => setMember({ ...member, email: text }) }

            />
            <TextInput
                value={ member.address }
                placeholder='Enter address'
                placeholderTextColor={ 'black' }
                textAlign='left'
                style={ styles.input }
                autoCapitalize='none'
                onChangeText={ (text: string) => setMember({ ...member, address: text }) }

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

export default AddMember;

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
