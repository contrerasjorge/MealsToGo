import { Platform } from "react-native";

const liveHost = "";
const localHost = "http://localhost:5001/mealstogo-d1847/us-central1";

export const isAndroid = Platform.OS === "android";

export const isDevelopment = process.env.NODE_ENV === "development";

export const isMock = true;

// Note that for android you need to use a liveHost
export const host = !isDevelopment || isAndroid ? liveHost : localHost;
