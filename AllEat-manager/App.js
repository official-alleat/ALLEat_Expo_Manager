import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Provider as PaperProvider} from "react-native-paper";

import StoreScreen from "./Store.js";
import SeatScreen from "./Seat.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Store" component={StoreScreen}/>
          <Stack.Screen name="Seat" component={SeatScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
