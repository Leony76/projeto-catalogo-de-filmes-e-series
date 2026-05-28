import { systemColor } from '@/css/global';
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { Modal } from './modal';

type Option<T extends string> = {
  value : T;
  label : string;
};

type Props<T extends string> = {
  label?        : string;
  flex?         : number;
  icon?         : React.ElementType;
  placeholder?  : string;
  value         : T;
  optionsSchema : readonly Option<T>[];
  onClick       : (option: T) => void; 
};

const Select = <T extends string>(props:Props<T>): React.JSX.Element => {

  const [showOptions, setShowOption] = useState<boolean>(false);

  const Icon = props.icon;

  return (
    <View style={[style.select_container, { flex: props.flex }]}>
      { props.label && 
        <Text style={style.select_label}>
          { props.label }
        </Text>
      }

      <TouchableOpacity 
      style={style.select_wrapper}
      activeOpacity={0.67}
      onPress={() => setShowOption(true)}
      >
        { Icon && 
          <View style={style.select_icon_container}>
            <Icon/>
          </View>
        }

        <Text style={style.select_placeholder}>
          { props.placeholder }
        </Text>
        
        { showOptions ? (
          <Entypo style={style.select_icon_container}
            name="chevron-up" 
            size={18} 
            color={systemColor.secondary.medium}
          />
        ) : (
          <Entypo style={style.select_icon_container}
            name="chevron-down" 
            size={18} 
            color={systemColor.secondary.medium}
          />
        )}
      </TouchableOpacity>

      <Modal
      onClose={() => setShowOption(false)}
      title={'Filtro'}
      visible={showOptions}
      >
        <ScrollView contentContainerStyle={style.select_options_container}>
          {props.optionsSchema.map((option) => {

            const selected: boolean = props.value === option.value;

            return (
              <TouchableOpacity 
              key={option.value}
              onPress={() => {
                props.onClick(option.value);
                setShowOption(false);
              }}
              activeOpacity={0.67}
              style={[
                style.option_button, 
                selected && { backgroundColor: systemColor.secondary.medium }
              ]}
              >
                <Text style={[
                  style.option_label_text,
                  selected && { color: 'white' }
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </Modal>
    </View>
  )
};

const style = StyleSheet.create({
  select_container: {
    gap: 5,
  },

  clear_select_button_container: {
    paddingHorizontal: 8,
  },

  option_button: {
    backgroundColor: systemColor.primary.translucite,
    borderRadius: 8,
    alignItems: 'center',
    padding: 5,
  },
  
  option_label_text: {
    fontFamily: 'Nunito',
    color: systemColor.secondary.medium,
  },

  select_icon_container: {
    paddingHorizontal: 8,
  },

  select_label: {
    fontFamily: 'Nunito',
    fontWeight: '600',
    fontSize: 15,
    color: systemColor.primary.dark,
  },

  select_placeholder: {
    fontFamily: 'Nunito',
    flex: 1,
    fontSize: 14,
    color: systemColor.secondary.medium
  },

  select: {
    flex: 1,
    fontFamily: 'Nunito',
    color: systemColor.secondary.dark,
  },

  select_options_container: {
    gap: 5,
    maxHeight: 255,
  },

  select_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: systemColor.secondary.medium,
    borderRadius: 4,
    paddingVertical: 4,
    backgroundColor: systemColor.primary.translucite,
  },
});

export default Select;