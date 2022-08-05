import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PlayListScreen from './src/screens/PlayListScreen';
import TracksList from './src/screens/TracksList';
import TrackDetailsScreen from './src/screens/TrackDetailsScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen component={PlayListScreen} name="PlayList" />
        <Stack.Screen component={TracksList} name="TracksList" />
        <Stack.Screen component={TrackDetailsScreen} name="TrackDetails" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
