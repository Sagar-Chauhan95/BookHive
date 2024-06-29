import "react-native-gesture-handler";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



import AuthorsScreen from "./AuthorsScreen copy";
import BooksScreen from "./BookScreen";
import MembersScreen from "./MembersScreen";
import PublishersScreen from "./PublishersScreen";
import TransactionScreen from "./TransactionScreen";


const { Navigator, Screen } = createDrawerNavigator();
function Home() {
    return (
        <Navigator >
            <Screen name="books-screen" component={ BooksScreen } options={ {
                title: "Books",
                drawerIcon: ({ color }) => <MaterialIcons name="library-books" size={ 24 } color="brown" />,
                drawerType: "front",
                swipeEdgeWidth: 10

            } } />
            <Screen name="authors-screen" component={ AuthorsScreen } options={ {
                title: "Authors",
                drawerType: "front",
                drawerIcon: ({ color }) => <FontAwesome name="address-book" size={ 24 } color="brown" />
            } } />
            <Screen name="members-screen" component={ MembersScreen } options={ {
                title: "Members",
                drawerType: "front",
                drawerIcon: ({ color }) => <FontAwesome5 name="users" size={ 24 } color="brown" />
            } } />
            <Screen name="publishers-screen" component={ PublishersScreen } options={ {
                title: "Publishers",
                drawerType: "front",
                drawerIcon: ({ color }) => <Entypo name="publish" size={ 24 } color="brown" />
            } } />
            <Screen name="transaction-screen" component={ TransactionScreen } options={ {
                title: "Transactions",
                drawerType: "front",
                drawerIcon: ({ color }) => <AntDesign name="profile" size={ 24 } color="brown" />
            } } />
        </Navigator>
    );
}

export default Home;
