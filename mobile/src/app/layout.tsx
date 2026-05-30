import React from 'react'
import { styles } from '@/css/layout'
import { Text, View, type StyleProp, type ViewStyle } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '@/components/Button';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import { systemColor } from '@/css/global';
import { router } from 'expo-router';

type Props = {
  children          : React.ReactNode;
  mainWrapperStyle? : StyleProp<ViewStyle>;
}

const Layout = (props:Props): React.JSX.Element => {
  return (
    <View style={styles.body_container}>
      <View style={styles.header_container}>
        <View style={styles.header_inner_container}>
          <View style={styles.system_icon}>
            <MaterialIcons 
              name="local-movies" 
              size={28} 
              color="#00c1d2" 
            />

            <Text style={styles.header_title}>
              HàgháBêÓh
            </Text>
          </View>

          <Button
            onPress={() => router.push('/home/movies-and-series/new')}
            text=''
            icon={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo name="plus" size={18} color={systemColor.secondary.medium} />
                <FontAwesome6 name="film" size={18} color={systemColor.secondary.medium} />
              </View>
            )}
          />
        </View>
      </View>

      <View style={[styles.main_container, props.mainWrapperStyle]}>
        { props.children }
      </View>

      <View style={styles.footer_container}>
        <Text style={styles.footer_copyright_paragraph}>
          &copy; 2026 Hàghábêóh Team. Todos os direitos reservados. 
        </Text>
      </View>
    </View>
  )
}

export default Layout