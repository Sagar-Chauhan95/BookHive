import { useContext } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Author from './author';
import GlobalContext from '../context/globalContext';

function AuthorsList({ navigation }: any) {
    const { authors } = useContext(GlobalContext);
    const addAuthor = () => {
        navigation.navigate("add-author");
    };

    return (
        <SafeAreaView>
            <Image source={ require('../../images/authors.png') } style={ styles.image } />
            <Pressable style={ styles.button }
                onPress={ addAuthor }
            >
                <Text style={ styles.buttonText }> Add Author</Text>
            </Pressable>
            <FlatList
                data={ authors }
                renderItem={ ({ item, index }) => <Author data={ item } index={ index } /> }
                keyExtractor={ (item: any) => item.id }
            />
        </SafeAreaView>
    );

}

export default AuthorsList;

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'brown',
        alignContent: "center"

    },
    image: {
        width: 430,
        height: 200
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        padding: 10,

    },

    button: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: 'brown',
        marginTop: 20,
        marginLeft: 100,
        marginBottom: 8,
        alignItems: "center",
        alignContent: "flex-end",
        justifyContent: "flex-end"
    },
    buttonText: {
        color: 'white',
        fontSize: 22
    }
});
