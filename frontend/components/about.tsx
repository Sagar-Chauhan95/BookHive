import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

function About() {
    return (
        <SafeAreaView style={ styles.container }>


            <FontAwesome5 name="readme" size={ 24 } color="brown"
                style={ styles.icon } />

            <Text style={ styles.content }> This book management system is an integrated solution designed
                to streamline the processes of managing books,
                authors, publishers, and library transactions.
                Utilizing a centralized context and state management
                via React's Context API and a reducer, it ensures
                efficient data handling and real-time updates across
                the application. The system features user authentication,
                enabling secure access and personalized interactions for
                logged-in users. It also supports dynamic data fetching
                from APIs, allowing for real-time synchronization of book
                inventories and related entities. With a user-friendly
                interface, it offers seamless navigation and efficient
                catalog management, enhancing the overall library
                experience for users and administrators alike.</Text>
        </SafeAreaView>
    );
}

export default About;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignContent: 'center'
    },
    icon: {
        fontSize: 90,
        alignContent: "center",
        justifyContent: "center",
        marginLeft: 150,
        marginBottom: 20,
        marginTop: -140
    },
    content: {
        width: "98%",
        padding: 40,
        alignItems: "center",
        alignContent: "center",
        color: 'brown'

    }
});