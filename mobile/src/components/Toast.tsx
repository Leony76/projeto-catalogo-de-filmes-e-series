import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ToastState } from "@shared/types/toastState.type";

type Props = ToastState;

const Toast = (props: Props) => {

  const toastConfig = {
    SUCCESS: {
      icon  : <Entypo name="check" size={24} color="green" />, 
      style : { 
        container : styles.success_container,
        text      : styles.sucess_text,
      },
    },
    ERROR: {
      icon  : <MaterialIcons name="error" size={24} color="red" />, 
      style : { 
        container : styles.error_container,
        text      : styles.error_text,
      },
    },
    INFO: {
      icon  : <Entypo name="info-with-circle" size={24} color="blue" />, 
      style : { 
        container : styles.info_container,
        text      : styles.info_text,
      },
    },
  };

  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (props.visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timeout = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [props.visible]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        toastConfig[props.type].style.container,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      { toastConfig[props.type].icon }

      <Text style={[styles.text, toastConfig[props.type].style.text]}>
        {props.message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignSelf: "center",
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingRight: 16,
    gap: 10,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    zIndex: 999,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },

  text: {
    fontSize: 14,
    fontFamily: 'Nunito',
    fontWeight: "600",
  },

  success_container: {
    backgroundColor: "#e7ffe3",
    borderColor: 'green',
  },

  sucess_text: {
    color: "green",
  },

  error_container: {
    backgroundColor: "#ffeff3",
    borderColor: 'red',
  },

  error_text: {
    color: "red",
  },

  info_container: {
    backgroundColor: "#c1c5ff",
    borderColor: 'blue',
  },

  info_text: {
    color: "blue",
  },
});

export default Toast;