import React from 'react'
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { systemColor } from '@/css/global';

type Props = {
  visible  : boolean;
  onClose  : () => void;
  title    : string;
  children : React.ReactNode; 
}

const Default = (props:Props): React.JSX.Element => {
  return (
    <Modal
    visible={props.visible}
    transparent
    animationType="fade"
    >
      <Pressable 
      style={styles.overlay}
      onPress={props.onClose}
      >
        <Pressable style={styles.modal}>
          <View style={styles.title_and_close_modal_button_container}>
            <Text style={styles.title}>
              { props.title}
            </Text>

            <TouchableOpacity
            style={styles.button}
            onPress={() => props.onClose()}
            >
              <AntDesign 
                name="close" 
                size={15} 
                color={systemColor.secondary.medium} 
              />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content_container}>
            { props.children }
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title_and_close_modal_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  content_container: {
    maxHeight: 500,
  },

  modal: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 18,
    fontFamily: 'Catalunya',
    paddingVertical: 5,
    color: systemColor.primary.dark
  },

  button: {
    alignItems: "center",
  },
});

export default Default