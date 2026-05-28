import React from 'react'
import { styles } from '@/css/layout'
import { Text, View, type StyleProp, type ViewStyle } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
  children          : React.ReactNode;
  mainWrapperStyle? : StyleProp<ViewStyle>;
}

const Layout = (props:Props): React.JSX.Element => {
  return (
    <View style={styles.body_container}>
      <View style={styles.header_container}>
        <View style={styles.header_inner_container}>
          <MaterialIcons 
            name="local-movies" 
            size={28} 
            color="#00c1d2" 
          />

          <Text style={styles.header_title}>
            HàgháBêÓh
          </Text>
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