import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ITransaction from "../types/transaction";

interface TransactionProps {
    data: ITransaction;
    index: number;
}
function Transaction({ data, index }: TransactionProps) {
    return (
        <SafeAreaView style={ { backgroundColor: index % 2 === 0 ? '#F3F3F7' : 'white' } }>
            <View style={ styles.container } >
                <Text style={ styles.title }> Book Id: <Text style={ styles.text } >{ data.bookId }</Text> </Text>
                <Text style={ styles.title }>Member Id: <Text style={ styles.text } >{ data.memberId }</Text> </Text>
                <Text style={ styles.title }> Burrowed date: <Text style={ styles.text } >{ data.borrowedDate }</Text> </Text>
                <Text style={ styles.title }> Return Date: <Text style={ styles.text } >{ data.returnedDate }</Text> </Text>
            </View>

        </SafeAreaView>

    );
}

export default Transaction;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        padding: 10,
        marginBottom: 15
    },
    title: {
        color: "red",
        fontSize: 14

    },

    text: {
        fontSize: 14,
        color: "brown"
    }

});