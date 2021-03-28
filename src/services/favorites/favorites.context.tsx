import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RestaurantType } from "../../features/restaurants/components/restaurant.type";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const FavoritesContext = createContext({});

export const FavoritesContextProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const { user } = useContext(AuthenticationContext);
  const cartUser = user as firebase.UserInfo;

  const [favorites, setFavorites] = useState<RestaurantType[]>([]);

  const saveFavorites = async (
    value: RestaurantType[] | string,
    uid: string
  ) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);
    } catch (err) {
      console.log("error storing", err);
    }
  };

  const loadFavorites = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`);
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch (err) {
      console.log("error loading", err);
    }
  };

  const add = (restaurant: RestaurantType) => {
    setFavorites([...favorites, restaurant]);
  };

  const remove = (restaurant: RestaurantType) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    );

    setFavorites(newFavorites);
  };

  useEffect(() => {
    if (cartUser && cartUser.uid) {
      loadFavorites(cartUser.uid);
    }
  }, [cartUser]);

  useEffect(() => {
    if (cartUser && cartUser.uid && favorites.length) {
      saveFavorites(favorites, cartUser.uid);
    }
  }, [favorites, cartUser]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites: add,
        removeFromFavorites: remove,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
