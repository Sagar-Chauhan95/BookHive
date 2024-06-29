import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalContext from "./context/globalContext";
import ITransaction from "../types/transaction";
import Transaction from "./transaction";
import { FlatList, Image, StyleSheet } from "react-native";

function TransactionScreen() {
    const { transactions, dispatch } = useContext(GlobalContext);
    return (
        <SafeAreaView>
            <Image source={ require("../images/transaction.png") } style={ styles.image } />
            <FlatList
                data={ transactions }
                renderItem={ ({ item, index }) => <Transaction data={ item } index={ index } /> }
                keyExtractor={ (item: ITransaction) => item.id }
            />
        </SafeAreaView>
    );
}

export default TransactionScreen;


const styles = StyleSheet.create({
    image: {
        width: 430,
        height: 200,
        marginTop: -60
    }
});