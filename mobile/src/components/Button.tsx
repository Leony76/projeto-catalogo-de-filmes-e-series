import { systemColor } from '@/css/global';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'

type Props = {
  text      : string;
  onPress   : () => void;
  icon?     : React.ElementType;
  disabled? : boolean;
  customStyle? : {
    container? : StyleProp<ViewStyle>;
    text?      : StyleProp<TextStyle>;
  }
};

const Button = (props:Props): React.JSX.Element => {

  const Icon = props.icon;

  return (
    <TouchableOpacity
    disabled={props.disabled}
    activeOpacity={0.67}
    style={[
      style.button_container, 
      props.customStyle?.container,
      props.disabled ? { opacity: 0.5, pointerEvents: 'none' } : undefined
    ]}
    onPress={props.onPress}
    >
      { Icon && <Icon/> }

      <Text style={[style.button_text, props.customStyle?.text]}>
        { props.text }
      </Text>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  button_container: {
    backgroundClip: systemColor.secondary.translucite,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: systemColor.secondary.medium,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    gap: 6,
    backgroundColor: systemColor.secondary.translucite,
  },

  button_text: {
    fontFamily: 'Nunito',
    color: systemColor.secondary.dark,
    fontWeight: '600',
  },
});

export default Button