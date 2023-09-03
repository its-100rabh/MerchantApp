import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import DiscountScreen from '../screens/DiscountScreen';
import PointsScreen from '../screens/PointsScreen';
import ServiceScreen from '../screens/ServiceScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProductDetailsScreen from '../screens/ProductScreen';

const point = 'Points';
const discount = 'Discounts';
const services = 'Services';
const history = 'History';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen() {
    return (

        <Tab.Navigator
            initialRouteName={discount}
            screenOptions={({ route }) => ({

                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    height: 60,
                    padding: 10
                },
                tabBarLabelStyle: {
                    paddingBottom: 10,
                    fontSize: 12
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconname;
                    let rn = route.name;

                    if (rn === point) {
                        iconname = focused ? 'happy' : 'happy-outline';
                    } else if (rn === discount) {
                        iconname = focused ? 'mail-unread' : 'mail-unread-outline';
                    } else if (rn === services) {
                        iconname = focused ? 'man' : 'man-outline';
                    } else if (rn === history) {
                        iconname = focused ? 'file-tray-stacked' : 'file-tray-stacked-outline';
                    }

                    return <Ionicons name={iconname} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name={point} component={PointsScreen} />
            <Tab.Screen name={discount} options={{ headerShown: false }} component={DiscountScreen} />
            <Tab.Screen name={services} component={ServiceScreen} />
            <Tab.Screen name={history} component={HistoryScreen} />
        </Tab.Navigator>

    );
}
export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Product" options={{ headerShown: false }} component={ProductDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>);
}
