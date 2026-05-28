import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type Props = {
  message: string;
};

const ContentNotFound = (props:Props): React.JSX.Element => {
  return (
    <View style={style.container}>
      <FontAwesome5 
        name="question" 
        size={24} 
        color="gray" 
      />
      
      <Text style={style.message}>
        { props.message }
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 5,
    padding: 8,
  },

  message: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    color: 'gray',
  },
});

export default ContentNotFound