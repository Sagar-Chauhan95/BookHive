import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import IAuthor from '../../types/author';
import { useNavigation } from '@react-navigation/native';
import serviceApis from '../../Apis/serviceApis';
import { useContext } from 'react';
import GlobalContext from '../context/globalContext';

interface AuthorProps {
    data: IAuthor;
    index: number;
}

function Author({ data, index }: AuthorProps) {

    const navigation = useNavigation();
    const { authors, dispatch } = useContext(GlobalContext);
    const navigateToEditAuthor = () => {
        navigation.navigate('edit-author', data);
    };

    const deleteAuthor = async () => {
        try {
            const response = await serviceApis.deleteAuthorById(data._id!);
            if (response.status === 200) {

                const index = authors.findIndex((i: IAuthor) => i._id === data._id);
                if (index === -1) {
                    throw new Error("Author not found");
                } else {
                    const newArray = authors.filter((i: IAuthor) => i._id !== data._id);
                    dispatch({ type: "authors", payload: newArray });

                }
            }

        } catch (error) {
            console.log("Unable to delete author", error);
        }

    };

    const onDelete = async () => {
        try {
            Alert.alert("Alert Title", "Sure wanna delete", [
                {
                    text: "Cancel",
                    onPress: () => Alert.alert("Author not deleted")
                },
                {
                    text: 'Ok',
                    onPress: deleteAuthor
                }
            ]);

        } catch (error) {
            console.log("Error while deleting", error);
        }
    };

    const onDetail = () => {

    };

    return (
        <SafeAreaView style={ { backgroundColor: index % 2 === 0 ? '#F3F3F7' : 'white' } }>
            <View style={ styles.container } >
                <View>
                    <Text style={ styles.title }> Name:  <Text style={ styles.text }>{ data.name }</Text>  </Text>
                    <Text style={ styles.title }> Phone No: <Text style={ styles.text } >{ data.phone }</Text> </Text>
                    <Text style={ styles.title }> Email: <Text style={ styles.text }> { data.email }</Text>  </Text>
                </View>
                <View>
                    <Pressable style={ styles.button }
                        onPress={ navigateToEditAuthor }
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

export default Author;


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
        fontSize: 18

    },

    text: {
        fontSize: 18,
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
