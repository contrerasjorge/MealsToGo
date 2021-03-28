import React, { useState, useEffect, createContext } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext({});

interface LatLng {
  lat: number;
  lng: number;
}

interface LocationShape extends LatLng {
  viewport: {
    northeast: LatLng;
    southwest: LatLng;
  };
}

export const LocationContextProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [keyword, setKeyword] = useState("San Francisco");
  const [location, setLocation] = useState<LocationShape | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch((err) => {
        setError(null);
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
