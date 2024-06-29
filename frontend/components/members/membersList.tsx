import React, { useContext } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import GlobalContext from '../context/globalContext';

import { FlatList } from 'react-native-gesture-handler';
import Member from './member';

function MembersList({ navigation }: any) {

    const { members } = useContext(GlobalContext);

    const addMember = () => {
        navigation.navigate("add-member");

    };

    return (
        <SafeAreaView>
            <Image source={ require("../../images/members.png") } style={ styles.image } />
            <Pressable style={ styles.button }
                onPress={ addMember }
            >
                <Text style={ styles.buttonText }> Add Member</Text>
            </Pressable>
            <FlatList
                data={ members }
                renderItem={ ({ item, index }) => <Member data={ item } index={ index } /> }
                keyExtractor={ (item: any) => item.id }
            />

        </SafeAreaView>
    );

}

export default MembersList;

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
