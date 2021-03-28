import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RestaurantType } from "../../features/restaurants/components/restaurant.type";
import { AuthenticationContext } from "../authentication/authentication.context";

export const CartContext = createContext({});

type CartType = {
  item: string;
  price: number;
};

export const CartContextProvider: React.FC<any> = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const cartUser = user as firebase.UserInfo;

  const [cart, setCart] = useState<CartType[]>([]);
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);

  const [sum, setSum] = useState(0);

  const saveCart = async (
    rst: RestaurantType,
    crt: CartType[],
    uid: string
  ) => {
    try {
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (err) {
      console.log("error storing", err);
    }
  };

  const loadCart = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value !== null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (err) {
      console.log("error storing", err);
    }
  };

  useEffect(() => {
    if (cartUser && cartUser.uid) {
      loadCart(cartUser.uid);
    }
  }, [cartUser]);

  useEffect(() => {
    if (cartUser && cartUser.uid) {
      if (restaurant) {
        saveCart(restaurant, cart, cartUser.uid);
      }
    }
  }, [restaurant, cart, cartUser]);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  const add = (item: CartType, rst: RestaurantType) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      setCart([...cart, item]);
    }
  };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        restaurant,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
