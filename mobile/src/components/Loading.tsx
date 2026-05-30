import { systemColor } from '@/css/global'
import React from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { View } from 'react-native'

const Loading = (): React.JSX.Element => {
  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <ActivityIndicator color={systemColor.secondary.medium}/>

      <Text style={{ fontFamily: 'Nunito', color: systemColor.secondary.medium }}>
        Carregando...
      </Text>
    </View>
  )
}

export default Loading