import React from 'react'
import { Image, Modal, TouchableOpacity } from 'react-native'

type Props = {
  visible : boolean;
  onClose : () => void;
  uri     : string;
};

const ExpandedImage = (props:Props): React.JSX.Element => {
  return (
    <Modal
    visible={props.visible}
    transparent
    animationType="fade"
    >
      <TouchableOpacity
      activeOpacity={0.67}
      onPress={props.onClose}
      style={{    
        flex            : 1,
        backgroundColor : "rgba(0,0,0,0.67)",
        justifyContent  : "center",
        alignItems      : "center",
      }}
      >
        <Image
          resizeMode="contain"
          source={{ uri: props.uri }}
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>
    </Modal>
  )
}

export default ExpandedImage