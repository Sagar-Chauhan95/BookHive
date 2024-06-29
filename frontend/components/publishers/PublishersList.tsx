import React, { useContext, useEffect } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import GlobalContext from '../context/globalContext';
import serviceApis from '../../Apis/serviceApis';
import IAuthor from '../../types/author';

import { FlatList } from 'react-native-gesture-handler';
import Publisher from './publisher';

function PublishersList({ navigation }: any) {

    const { publishers, dispatch } = useContext(GlobalContext);

    const addPublisher = () => {
        navigation.navigate("add-publisher");

    };

    return (
        <SafeAreaView>
            <Image source={ require('../../images/publishers.png') } style={ styles.image } />

            <Pressable style={ styles.button }
                onPress={ addPublisher }
            >
                <Text style={ styles.buttonText }> Add Publisher</Text>
            </Pressable>
            <FlatList
                data={ publishers }
                renderItem={ ({ item, index }) => <Publisher data={ item } index={ index } /> }
                keyExtractor={ (item: any) => item.id }
            />

        </SafeAreaView>
    );

}

export default PublishersList;

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

