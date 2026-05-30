import { systemColor } from '@/css/global';
import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

type Props = {
  value        : string;
  label?       : string;
  icon?        : React.ElementType;
  placeholder? : string;
  onChange     : (text: string) => void;
  onBlur?      : () => void;
  error?       : string;
  flex?        : number;
  onClick: {
    clearText: () => void;
  };
};

const Input = (props:Props): React.JSX.Element => {

  const Icon = props.icon;

  return (
    <View style={[style.text_input_container, { flex: props.flex }]}> 
      {props.label && (
        <Text style={style.text_input_label}>
          {props.label}
        </Text>
      )}

      <View
        style={[
          style.text_input_wrapper,

          props.error && {
            borderColor: "red",
          },
        ]}
      >
        {Icon && (
          <View style={style.text_input_icon_container}>
            <Icon />
          </View>
        )}

        <TextInput
          style={style.text_input}
          onChangeText={props.onChange}
          onBlur={props.onBlur}
          placeholderTextColor={systemColor.secondary.medium}
          placeholder={props.placeholder}
          value={props.value}
        />

        {props.value.length > 0 && (
          <TouchableOpacity
            style={style.clear_text_input_button_container}
            activeOpacity={0.67}
            onPress={() => props.onClick.clearText()}
          >
            <AntDesign
              name="close"
              size={15}
              color={systemColor.secondary.medium}
            />
          </TouchableOpacity>
        )}
      </View>

      {props.error && (
        <Text style={style.error_text}>
          {props.error}
        </Text>
      )}
    </View>
  )
};

const style = StyleSheet.create({
  text_input_container: {
    gap: 5,
  },

  error_text: {
    color: "red",
    fontSize: 12,
    fontFamily: 'Nunito',
  },

  clear_text_input_button_container: {
    paddingHorizontal: 8,
  },

  text_input_icon_container: {
    paddingHorizontal: 8,
  },

  text_input_label: {
    fontFamily: 'Nunito',
    fontWeight: '600',
    fontSize: 15,
    color: systemColor.primary.medium
  },

  text_input: {
    flex: 1,
    minWidth: 0,
    fontFamily: 'Nunito',
    color: systemColor.secondary.medium,
    padding: 4,
    paddingHorizontal: 8,
  },

  text_input_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: systemColor.secondary.medium,
    borderRadius: 4,
    backgroundColor: systemColor.primary.translucite,
  },
});

export default Input;