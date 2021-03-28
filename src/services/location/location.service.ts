import camelize from "camelize";
import { host, isMock } from "../../utils/env";
//import { RestaurantType } from "../../features/restaurants/components/restaurant.type";
import { RestaurantShape } from "../../../types/restaurant.types";

export const locationRequest = (
  searchTerm: string
): Promise<RestaurantShape> => {
  return fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const locationTransform = (result: RestaurantShape) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
