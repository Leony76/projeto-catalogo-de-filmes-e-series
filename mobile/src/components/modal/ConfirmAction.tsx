import React from 'react'
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { systemColor } from '@/css/global';
import Toast from '../Toast';
import type { ToastType } from '@shared/types/toastType.type';
import Button from '../Button';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';

type Props = {
  visible  : boolean;
  onClose  : () => void;
  onAccept : () => void;
  processing?: boolean;
  title    : string;
  message  : string; 
  toast?   : {
    visible : boolean;
    message : string;
    type    : ToastType;
  }
}

const ConfirmAction = (props:Props): React.JSX.Element => {
  return (
    <Modal
    visible={props.visible}
    transparent
    animationType="fade"
    >
      { props.toast &&   
        <Toast
          visible={props.toast.visible}
          message={props.toast.message}
          type={props.toast.type}
        />
      }

      <Pressable 
      style={styles.overlay}
      disabled={props.processing}
      onPress={props.onClose}
      >
        <Pressable 
        style={styles.modal}
        >
          <View style={styles.title_and_close_modal_button_container}>
            <Text style={styles.title}>
              { props.title }
            </Text>

            <TouchableOpacity
            style={styles.button}
            disabled={props.processing}
            onPress={() => props.onClose()}
            >
              <AntDesign 
                name="close" 
                size={15} 
                color={systemColor.secondary.medium} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content_container}>
            <Text style={styles.confirm_message}>
            { props.message }
            </Text>

            <View style={styles.confirm_buttons_container}>
              <Button
                onPress={props.onAccept}
                icon={() => <Entypo name="check" size={18} color="green" />}
                loading={props.processing}
                disabled={props.processing}
                text={props.processing ? '' : 'Sim'}
                customStyle={{ 
                  container : { flex: 1, backgroundColor: '#f0ffe6', borderColor: 'green', gap: 2 },
                  text      : { color: 'green' }
                }}
              />

              <Button
                onPress={props.onClose}
                icon={() => <Fontisto name="close-a" size={12} color="red" />}
                text='Não'
                disabled={props.processing}
                customStyle={{ 
                  container : { flex: 1, backgroundColor: '#ffe7e7', borderColor: 'red' },
                  text      : { color: 'red' }
                }}
              />
            </View>
          </View>
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

  confirm_buttons_container: {
    flexDirection: 'row',
    gap: 8,
  },

  confirm_message: {
    fontFamily: 'Nunito',
    color: systemColor.secondary.medium
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
    gap: 16,
  },

  modal: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 24,
    fontFamily: 'Catalunya',
    paddingVertical: 5,
    color: systemColor.primary.medium
  },

  button: {
    alignItems: "center",
  },
});

export default ConfirmAction