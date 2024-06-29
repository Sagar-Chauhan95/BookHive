import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/globalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import IAuthor from "../../types/author";
import serviceApis from "../../Apis/serviceApis";
import IBook from "../../types/book";
import IPublisher from "../../types/publisher";

function PublisherPicker({ route, navigation }: any) {
    const data = route.params;
    console.log("Check", data);
    const { publishers, books, dispatch } = useContext(GlobalContext);
    const [ selectedPublisher, setSelectedPublisher ] = useState<string>(data.publisherId);


    const onAdd = async () => {
        try {
            if (!selectedPublisher) {
                return Alert.alert("Please Scroll to select Picker");
            }

            if (data.publisherId === selectedPublisher) {
                return Alert.alert("Publisher Already existed");
            } else {
                console.log("Check data", data);
                console.log("id", selectedPublisher);

                const newBook = { ...data, publisherId: selectedPublisher };
                console.log("New Book", newBook);

                const response = await serviceApis.editBookById(data._id, newBook);
                console.log("Edit check", response.data);
                console.log(response.status);

                if (response.status === 200) {
                    const updatedBookResponse = await serviceApis.getBookById(data._id);
                    console.log("recponse check", updatedBookResponse.data);
                    const index = books.findIndex((i: IBook) => i._id === data._id);
                    if (index === -1) {
                        throw new Error("Book doesn't exist");
                    } else {
                        const newBookArray = [ ...books ];
                        newBookArray[ index ] = updatedBookResponse.data[ 0 ];

                        dispatch({ type: 'books', payload: newBookArray });
                        Alert.alert("Publisher successfully added to book");
                        navigation.navigate('books');

                    }

                };

            }



        } catch (error) {
            console.log("Server Error", error);
        }
    };




    return (
        <SafeAreaView  >
            <Picker
                selectedValue={ selectedPublisher }
                onValueChange={ (itemValue, itemIndex) => setSelectedPublisher(itemValue)
                }>
                { publishers.map((publisher: IPublisher) => (
                    <Picker.Item key={ publisher._id } label={ publisher.name } value={ publisher._id } />
                )) }
            </Picker>

            <Pressable style={ styles.button }
                onPress={ onAdd }
            >
                <Text style={ styles.buttonText }>Add</Text>
            </Pressable>

        </SafeAreaView >
    );
};

export default PublisherPicker;


const styles = StyleSheet.create({

    button: {
        width: 60,
        height: 30,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'brown',
        marginBottom: 8,
        alignItems: "center",
        marginLeft: 180,
        marginTop: 60
    },

    buttonText: {
        color: 'white',
        fontSize: 16
    }
});