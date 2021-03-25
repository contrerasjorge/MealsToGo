import camelize from "camelize";

import { RestaurantType } from "../../features/restaurants/components/restaurant.type";
import { host, isMock } from "../../utils/env";
import { RestaurantShape } from "../../../types/restaurant.types";

export const restaurantsRequest = (
  location: string
): Promise<RestaurantType> => {
  return fetch(
    `${host}/placesNearby?location=${location}&mock=${isMock}`
  ).then((res) => res.json());
};

export const restaurantsTransform = ({
  results = [],
}: {
  results: RestaurantShape[];
}): RestaurantType => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
