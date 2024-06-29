
import { useContext, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import GlobalContext from '../context/globalContext';
import serviceApis from '../../Apis/serviceApis';
import ICatalog from '../../types/catalog';
import ITransaction from '../../types/transaction';

function BurrowBooks({ navigation }: any) {
    const [ selectedBook, setSelectedBook ] = useState<string>();
    const { books, members, catalogs, transactions, dispatch } = useContext(GlobalContext);
    const [ member, setMember ] = useState<string>();

    const onBurrow = async () => {

        try {
            console.log("Burrow", selectedBook);
            if (!selectedBook || !member) {
                return Alert.alert("Book and member both must be selected");
            } else {
                const bookIndex = catalogs.findIndex((catalog: ICatalog) => catalog.bookId === selectedBook);
                if (bookIndex === -1) {
                    console.log("Books is unavailable");

                } else {
                    const newCatalog = [ ...catalogs ];
                    let matchedCatalog = newCatalog[ bookIndex ];

                    if (matchedCatalog.availableCopies <= 0) {
                        return Alert.alert("Selected book is unavailable to burrow");
                    } else {
                        matchedCatalog.availableCopies -= 1;
                        const response = await serviceApis.editCatalogById(matchedCatalog._id!, matchedCatalog);
                        if (response.status === 200) {
                            dispatch({ type: 'catalogs', payload: newCatalog });
                            Alert.alert("Burrow Successfull and Transaction recorded");
                            navigation.navigate("books");

                            let date = new Date();
                            let currentDate = date.toISOString().slice(0, 10);
                            date.setDate(date.getDate() + 15);
                            let returnDate1 = date.toISOString().slice(0, 10);
                            if (selectedBook && member) {
                                let newTransaction = {
                                    bookId: selectedBook,
                                    memberId: member,
                                    borrowedDate: currentDate,
                                    returnedDate: returnDate1
                                };
                                const response = await serviceApis.addTransaction(newTransaction);
                                if (response.status === 200) {
                                    dispatch({ type: 'add-transaction', payload: response.data });
                                    navigation.navigate("transaction-screen");

                                } else {
                                    Alert.alert("Unable to proceed transaction");
                                }
                            }

                        } else {
                            Alert.alert("Server Error");
                        }

                    }

                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    const onReturn = async () => {
        try {
            if (!selectedBook && !member) {
                Alert.alert("Book and member both must be selected");
                return;
            } else {
                const transactionIndex = transactions.findIndex((transaction: ITransaction) => transaction.bookId === selectedBook && transaction.memberId === member);
                if (transactionIndex === -1) {
                    return Alert.alert('No any burrow history found');
                } else {
                    const recordedTransaction = transactions[ transactionIndex ];
                    const response = await serviceApis.deleteTransaction(recordedTransaction._id!);
                    if (response.status !== 200) {
                        return Alert.alert("Transaction cancellation Unsuccessfull");
                    }

                    const filteredTransaction = transactions.filter((transaction: ITransaction) => transaction._id !== recordedTransaction._id);
                    dispatch({ type: 'transactions', payload: filteredTransaction });

                    const bookIndex = catalogs.findIndex((catalog: ICatalog) => catalog.bookId === selectedBook);
                    if (bookIndex === -1) {
                        return Alert.alert("Book doesnot exist to return");
                    }

                    const newCatalog = [ ...catalogs ];
                    let matchedCatalog = newCatalog[ bookIndex ];

                    if (matchedCatalog.availableCopies >= matchedCatalog.numberOfCopies) {
                        return Alert.alert("Selected book is unavailable to return");
                    } else {
                        matchedCatalog.availableCopies += 1;
                        const response = await serviceApis.editCatalogById(matchedCatalog._id!, matchedCatalog);
                        if (response.status === 200) {
                            dispatch({ type: 'catalogs', payload: newCatalog });
                            Alert.alert("Return Successfull");
                            navigation.navigate("books");

                        } else {
                            return Alert.alert("Return Unsuccessfull");
                        }
                    }
                }
            }

        } catch (error) {
            Alert.alert("Unable to return book");
        }
    };


    return (
        <SafeAreaView>
            <SelectList
                setSelected={ (val: string) => setSelectedBook(val) }
                data={ books.map(book => ({ key: book._id, value: book.title })) }
                save="key"
                placeholder='Select Book'
            // onSelect={ onSelectBook }
            />

            <SelectList
                setSelected={ (val: string) => setMember(val) }
                data={ members.map(member => ({ key: member._id, value: `${member.firstname} ${member.lastname}` })) }
                save="key"
                placeholder='Select Member'
            // onSelect={ onSelectMember }
            />

            <Pressable style={ styles.button }
                onPress={ onBurrow }
            >
                <Text style={ styles.buttonText }> Burrow</Text>
            </Pressable>
            <Pressable style={ styles.button }
                onPress={ onReturn }
            >
                <Text style={ styles.buttonText }> Return</Text>
            </Pressable>



        </SafeAreaView>
    );
};

export default BurrowBooks;

const styles = StyleSheet.create({
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