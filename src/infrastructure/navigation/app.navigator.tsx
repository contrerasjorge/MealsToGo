import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import { DefaultNavigatorOptions } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";

import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavoritesContextProvider } from "../../services/favorites/favorites.context";
import { CartContextProvider } from "../../services/cart/cart.context";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

type TabIconType = {
  [key: string]: iconType;
};

type iconType = "md-restaurant" | "md-map" | "md-settings" | "md-cart";
type RouteType = {
  route: {
    name: string;
  };
};

const TAB_ICON: TabIconType = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
  Checkout: "md-cart",
};

const createScreenOptions = ({ route }: RouteType) => {
  const iconName: iconType = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <FavoritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <CartContextProvider>
          <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: colors.brand.primary,
              inactiveTintColor: colors.brand.muted,
            }}
          >
            <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
            <Tab.Screen name="Checkout" component={CheckoutScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsNavigator} />
          </Tab.Navigator>
        </CartContextProvider>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavoritesContextProvider>
);
