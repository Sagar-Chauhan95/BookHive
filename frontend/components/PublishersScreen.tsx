import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PublishersList from "./publishers/PublishersList";
import AddPublisher from "./publishers/AddPublisher";
import EditPublisher from "./publishers/EditPublisher";

const { Navigator, Screen } = createNativeStackNavigator();
function PublishersScreen() {
    return (
        <Navigator>
            <Screen name='publishers' component={ PublishersList } options={ { headerShown: false } } />
            <Screen name="add-publisher" component={ AddPublisher } options={ { headerTitle: "" } } />
            <Screen name="edit-publisher" component={ EditPublisher } options={ { headerTitle: "" } } />
        </Navigator>

    );
}

export default PublishersScreen;
