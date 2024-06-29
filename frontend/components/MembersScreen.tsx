import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MembersList from "./members/membersList";
import AddMember from "./members/AddMember";
import EditMember from "./members/EditMember";

const { Navigator, Screen } = createNativeStackNavigator();
function MembersScreen() {
    return (

        <Navigator>
            <Screen name='members' component={ MembersList } options={ { headerShown: false } } />
            <Screen name="add-member" component={ AddMember } options={ { headerTitle: "" } } />
            <Screen name="edit-member" component={ EditMember } options={ { headerTitle: "" } } />
        </Navigator>

    );
}

export default MembersScreen;
