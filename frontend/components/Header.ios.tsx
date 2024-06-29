
import { Text, View, Image, Platform, Pressable, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect } from 'react';
import GlobalContext from './context/globalContext';

const Header = () => {
    const { dispatch } = useContext(GlobalContext);
    const onLogout = async () => {
        try {
            await AsyncStorage.clear();
            dispatch({ type: "token", payload: "" });

        } catch (error) {
            console.log(Error);
        }
    };

    return (
        <View style={ [ Platform.OS === 'ios' ? styles.ios : styles.android, { justifyContent: "center", alignItems: "center" } ] }>
            <Pressable style={ styles.button }
                onPress={ onLogout }
            >
                <Text style={ styles.buttonText }> Logout</Text>
            </Pressable>
            <View >
                <Image source={ require('../images/books.png') } style={ styles.picture } />
            </View>

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    button: {
        width: "20%",
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "brown",
        padding: 5,
        marginLeft: 330,
        marginTop: -30
    },

    buttonText: {
        fontSize: 20,
        color: "white"
    },
    android: {
        padding: 30,
        fontSize: 30,
        textAlign: 'center',
        color: '#0066CC',
        fontWeight: '300',

    },
    ios: {
        paddingTop: 30,
        fontSize: 26,
        textAlign: 'center',
        color: '#0066CC',
        fontWeight: '200',
    },
    picture: {
        width: 430,
        height: 150,
        justifyContent: 'center',
        marginTop: 2
    }



});
