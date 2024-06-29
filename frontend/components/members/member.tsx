import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import IAuthor from '../../types/author';
import { useNavigation } from '@react-navigation/native';
import serviceApis from '../../Apis/serviceApis';
import { useContext } from 'react';
import GlobalContext from '../context/globalContext';
import IMember from '../../types/member';

interface MemberProps {
    data: IMember;
    index: number;
}

function Member({ data, index }: MemberProps) {

    const navigation = useNavigation();
    const { members, dispatch } = useContext(GlobalContext);

    const navigateToEditMember = () => {
        navigation.navigate('edit-member', data);
    };

    const deleteMember = async () => {
        try {
            console.log("ID check", data);
            const response = await serviceApis.deleteMemberById(data._id!);
            if (response.status === 200) {

                const index = members.findIndex((i: IMember) => i._id === data._id);
                if (index === -1) {
                    throw new Error("Member not found");
                } else {
                    const newArray = members.filter((i: IMember) => i._id !== data._id);
                    dispatch({ type: "members", payload: newArray });

                }
            }

        } catch (error) {
            console.log("Unable to delete member", error);
        }

    };

    const onDelete = async () => {
        try {
            Alert.alert("Alert Title", "Sure wanna delete", [
                {
                    text: "Cancel",
                    onPress: () => Alert.alert("Member not deleted")
                },
                {
                    text: 'Ok',
                    onPress: deleteMember
                }
            ]);

        } catch (error) {
            console.log("Error while deleting", error);
        }
    };

    return (
        <SafeAreaView style={ { backgroundColor: index % 2 === 0 ? '#F3F3F7' : 'white' } }>
            <View style={ styles.container } >
                <View>
                    <Text style={ styles.title }> Name:  <Text style={ styles.text }>{ data.firstname } { data.lastname }</Text>  </Text>
                    <Text style={ styles.title }> Phone No: <Text style={ styles.text } >{ data.phone }</Text> </Text>
                    <Text style={ styles.title }> Resident ID: <Text style={ styles.text } >{ data.residentID }</Text> </Text>
                    <Text style={ styles.title }> Email: <Text style={ styles.text }> { data.email }</Text>  </Text>
                    <Text style={ styles.title }> Address: <Text style={ styles.text }> { data.address }</Text>  </Text>

                </View>
                <View>
                    <Pressable style={ styles.button }
                        onPress={ navigateToEditMember }
                    >
                        <Text style={ styles.buttonText }>Edit</Text>
                    </Pressable>
                    <Pressable style={ styles.button }
                        onPress={ onDelete }
                    >
                        <Text style={ styles.buttonText }>Delete</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default Member;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,

    },

    title: {
        color: "red",
        fontSize: 14

    },

    text: {
        fontSize: 14,
        color: "brown"
    },

    button: {
        width: 60,
        height: 30,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'brown',
        marginBottom: 8,
        alignItems: "center"
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }

});
