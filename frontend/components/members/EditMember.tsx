import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import IAuthor from '../../types/author';
import serviceApis from '../../Apis/serviceApis';
import GlobalContext from '../context/globalContext';
import IPublisher from '../../types/publisher';
import IMember from '../../types/member';

function EditMember() {
    const { members, dispatch } = useContext(GlobalContext);
    const route = useRoute();
    const navigation = useNavigation();
    const data = route.params as IMember;
    const [ member, setMember ] = useState<IMember>(data);

    const onSubmit = async () => {
        try {

            const response = await serviceApis.editMemberById(data._id!, member);

            if (response.status === 200) {
                const updatedMemberResponse = await serviceApis.getMemberById(data._id!);

                const index = members.findIndex((i: IMember) => i._id === data._id);
                if (index === -1) {
                    throw new Error("Member doesn't exist");
                } else {
                    const newMemberArray = [ ...members ];
                    newMemberArray[ index ] = updatedMemberResponse.data[ 0 ];
                    dispatch({ type: 'members', payload: newMemberArray });
                    navigation.navigate('members');

                }

            };

        } catch (error) {
            console.log("Unable to Edit member", error);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.header }> Edit Member</Text>
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
                editable={ false }
            // onChangeText={ (text: string) => setMember({ ...member, residentID: text }) }

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

export default EditMember;


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