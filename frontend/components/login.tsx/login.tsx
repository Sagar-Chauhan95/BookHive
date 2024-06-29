import { useContext, useEffect, useState } from "react";
import IUser from "../../types/user";
import { Alert, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import serviceApis from "../../Apis/serviceApis";
import { LOCAL_STORAGE_KEY } from "../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalContext from "../context/globalContext";

function Login() {
    const [ user, setUser ] = useState<IUser>({ name: "", email: "" });
    const { dispatch } = useContext(GlobalContext);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const onSignIn = async () => {
        try {

            if (!user.email.trim()) {
                return Alert.alert("Email can't be empty");
            }


            if (reg.test(user.email)) {
                return Alert.alert("Invalid Email Type");
            }

            const response = await serviceApis.singIn(user);
            if (response.status === 200) {
                await AsyncStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ token: response.data }));
                dispatch({ type: "token", payload: response.data });
            }

        } catch (error: any) {
            if (error.response.request.status === 404) {
                Alert.alert(error.response.data.message);
            } else if (error.response.request.status === 401) {
                Alert.alert(error.response.data.message);

            } else if (error.response.request.status === 501) {
                Alert.alert(error.response.data.message);
            } else {
                Alert.alert(error.response.data.message);

            }

        }

    };


    const onSignUp = async () => {
        try {

            if (!user.email.trim() || !user.name?.trim()) {
                return Alert.alert("Name and email must be entered");
            }

            if (reg.test(user.email)) {
                return Alert.alert("Invalid Email Type");
            }

            const response = await serviceApis.signUp(user);

            if (response.request.status === 201) {
                Alert.alert("SignUp Successful");
                setUser({ name: "", email: "" });
            }
        } catch (error: any) {

            if (error.response.request.status === 400) {
                Alert.alert(error.response.data.error);
            } else {
                return Alert.alert(error.response.data.error);
            }

        }
    };

    return (
        <SafeAreaView style={ styles.main } >
            <KeyboardAvoidingView style={ styles.container }>
                <Text style={ styles.header }>Login</Text>
                <TextInput
                    style={ styles.input }
                    onChangeText={ (text: string) => setUser({ ...user, name: text }) }
                    placeholder='Enter Name'
                    value={ user.name }
                    placeholderTextColor={ 'brown' }
                    textAlign='center'
                />

                <TextInput
                    style={ styles.input }
                    onChangeText={ (text: string) => setUser({ ...user, email: text }) }
                    placeholder='Enter Email'
                    autoCapitalize='none'
                    value={ user.email }
                    placeholderTextColor={ 'brown' }
                    textAlign='center'
                />

                <Pressable style={ styles.button }
                    onPress={ onSignIn } >

                    <Text style={ styles.buttonText }>
                        Login
                    </Text>

                </Pressable>

                <Pressable style={ styles.button }
                    onPress={ onSignUp } >

                    <Text style={ styles.buttonText }>
                        Sign Up
                    </Text>

                </Pressable>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: 300,
        height: 400,
        borderWidth: 2,
        borderColor: "brown",
        marginTop: "45%",
        borderRadius: 25,
        shadowOpacity: 5,
        shadowOffset: {
            height: 2,
            width: 3
        },
        shadowColor: 'grey',


    },
    main: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",


    }
    ,
    header: {
        fontSize: 35,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 70,
        marginTop: -30,
        color: "brown"

    },

    input: {
        width: "60%",
        height: 40,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 7,
        color: "brown",
        borderColor: "brown"
    },

    button: {
        width: "40%",
        height: 35,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "brown",
        alignItems: "center",
        marginBottom: 10
    },

    buttonText: {
        fontSize: 18,
        alignItems: "center",
        color: 'white'
    }
});
