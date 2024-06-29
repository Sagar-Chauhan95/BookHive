import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import IAuthor from '../../types/author';
import { useNavigation } from '@react-navigation/native';
import serviceApis from '../../Apis/serviceApis';
import { useContext } from 'react';
import GlobalContext from '../context/globalContext';
import IPublisher from '../../types/publisher';

interface PublisherProps {
    data: IPublisher;
    index: number;
}

function Publisher({ data, index }: PublisherProps) {

    const navigation = useNavigation();
    const { publishers, dispatch } = useContext(GlobalContext);

    const navigateToEditPublisher = () => {
        navigation.navigate('edit-publisher', data);
    };

    const deletePublisher = async () => {
        try {
            const response = await serviceApis.deletePublisherById(data._id!);
            if (response.status === 200) {

                const index = publishers.findIndex((i: IPublisher) => i._id === data._id);
                if (index === -1) {
                    throw new Error("Publisher not found");
                } else {
                    const newArray = publishers.filter((i: IPublisher) => i._id !== data._id);
                    dispatch({ type: "publishers", payload: newArray });

                }
            }

        } catch (error) {
            console.log("Unable to delete publisher", error);
        }

    };

    const onDelete = async () => {
        try {
            Alert.alert("Alert Title", "Sure wanna delete", [
                {
                    text: "Cancel",
                    onPress: () => Alert.alert("Publisher not deleted")
                },
                {
                    text: 'Ok',
                    onPress: deletePublisher
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
                    <Text style={ styles.title }> Name:  <Text style={ styles.text }>{ data.name }</Text>  </Text>
                    <Text style={ styles.title }> Phone No: <Text style={ styles.text } >{ data.phone }</Text> </Text>
                    <Text style={ styles.title }> Email: <Text style={ styles.text }> { data.email }</Text>  </Text>
                    <Text style={ styles.title }> Address: <Text style={ styles.text }> { data.address }</Text>  </Text>
                </View>
                <View>
                    <Pressable style={ styles.button }
                        onPress={ navigateToEditPublisher }
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

export default Publisher;


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
