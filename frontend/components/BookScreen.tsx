import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddBook from "./books/AddBook";
import EditBook from "./books/EditBook";
import BookList from "./books/BookList";
import AuthorPicker from "./books/AuthorPicker";
import PublisherPicker from "./books/PublisherPicker";
import BurrowBooks from "./books/BurrowBooks";

const { Navigator, Screen } = createNativeStackNavigator();
function BooksScreen() {
    return (

        <Navigator initialRouteName="books">
            <Screen name="books" component={ BookList } options={ { headerShown: false } } />
            <Screen name="add-book" component={ AddBook } options={ { headerTitle: "" } } />
            <Screen name="edit-book" component={ EditBook } options={ { headerTitle: "" } } />
            <Screen name="author-picker" component={ AuthorPicker } options={ { headerTitle: "" } } />
            <Screen name='publisher-picker' component={ PublisherPicker } options={ { headerTitle: "" } } />
            <Screen name="burrow-book" component={ BurrowBooks } options={ { headerTitle: "" } } />
        </Navigator>

    );
}

export default BooksScreen;
