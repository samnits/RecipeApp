
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from "../screens/HomeScreen"
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const Stack=createNativeStackNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#f5f5f5", width: 240 },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
    </Drawer.Navigator>
  );
}



export default function AppNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false, // Stack screens won't show headers
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{
          headerShown: false, // Hide Drawer header
        }}
      />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

{/* <NavigationContainer>
        <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{
          headerShown:false,
        }}
        >
            <Stack.Screen name ="Home" component={HomeScreen}/>
            <Stack.Screen name ="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name ="RecipeDetails" component={RecipeDetailsScreen}/>
        </Stack.Navigator>
    </NavigationContainer>  */}