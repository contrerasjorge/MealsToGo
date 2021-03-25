import React from "react";
import styled, { useTheme, DefaultTheme } from "styled-components/native";

type SizeVariantType<T> = {
  [key: string]: T;
};

const sizeVariant: SizeVariantType<number> = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant: SizeVariantType<string> = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

interface ThemeType extends DefaultTheme {
  space?: string;
}

const getVariant = (position: string, size: string, theme: ThemeType) => {
  const sizeIndex: number = sizeVariant[size];
  const property: string = positionVariant[position];
  const value: string = theme.space ? theme.space[sizeIndex] : "";

  return `${property}:${value}`;
};

interface SpacerViewProps {
  variant?: string;
}

const SpacerView = styled.View<SpacerViewProps>`
  ${({ variant }) => variant}
`;

interface SpacerProps {
  position: string;
  size: string;
}

export const Spacer: React.FC<SpacerProps> = ({
  position = "top",
  size = "small",
  children,
}) => {
  const theme: ThemeType = useTheme();
  const variant = getVariant(position, size, theme);

  return <SpacerView variant={variant}>{children}</SpacerView>;
};
