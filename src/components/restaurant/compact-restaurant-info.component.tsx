import React from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { WebViewSharedProps } from "react-native-webview/lib/WebViewTypes";
import { Platform, ImagePropsBase } from "react-native";
import { RestaurantType } from "../../features/restaurants/components/restaurant.type";

import { Text } from "../typography/text.component";

const CompactImage = styled.Image<ImagePropsBase>`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)<WebViewSharedProps>`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

type CompactRestaurantInfoType = {
  restaurant: RestaurantType;
  isMap?: boolean;
};

export const CompactRestaurantInfo: React.FC<CompactRestaurantInfoType> = ({
  restaurant,
  isMap = false,
}) => {
  // the issue appears to be with WebView and its types
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;

  return (
    <Item>
      {/* @ts-ignore */}
      <Image source={{ uri: restaurant.photos[0] }} />
      <Text textAlign="center" variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </Item>
  );
};
