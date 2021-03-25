import styled from "styled-components/native";
import { theme as ThemeTypes } from "../../infrastructure/theme";

const defaultTextStyles = (theme: typeof ThemeTypes) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: typeof ThemeTypes) => `
  font-size: ${theme.fontSizes.body};
`;

const hint = (theme: typeof ThemeTypes) => `
  font-size: ${theme.fontSizes.body};
`;

const error = (theme: typeof ThemeTypes) => `
  color: ${theme.colors.text.error};
`;

const caption = (theme: typeof ThemeTypes) => `
  font-size: ${theme.fontSizes.caption};
  font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: typeof ThemeTypes) => `
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes.body};
  font-weight: ${theme.fontWeights.medium};
`;

type variantsType = {
  [key: string]: (theme: typeof ThemeTypes) => string;
};
const variants: variantsType = {
  body,
  label,
  caption,
  error,
  hint,
};

interface TextProp {
  theme: typeof ThemeTypes;
  variant: string;
}

export const Text = styled.Text<TextProp>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant = "body", theme }): string => variants[variant](theme)}
`;

// Text.defaultProps = {
// variant: "body",
//};
