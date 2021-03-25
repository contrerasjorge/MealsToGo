import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

interface FadeInViewProps {
  duration: number;
  [x: string]: any;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  duration = 1500,
  ...props
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};