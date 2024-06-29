import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthorsList from "./authors/AuthorsList";
import AddAuthor from "./authors/AddAuthor";
import EditAuthor from "./authors/editAuthor";

const { Navigator, Screen } = createNativeStackNavigator();
function AuthorsScreen() {
    return (

        <Navigator>
            <Screen name='authors' component={ AuthorsList } options={ { headerShown: false } } />
            <Screen name="add-author" component={ AddAuthor } options={ { headerTitle: "" } } />
            <Screen name="edit-author" component={ EditAuthor } options={ { headerTitle: "" } } />
        </Navigator>

    );
}

export default AuthorsScreen;
