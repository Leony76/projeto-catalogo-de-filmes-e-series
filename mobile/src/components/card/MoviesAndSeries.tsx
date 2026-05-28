import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import type { MoviesAndSeriesResponse as MoviesAndSeriesType } from "@shared/types/movie/movies.dto";
import { systemColor } from '@/css/global';

type Props = MoviesAndSeriesType;


const MoviesAndSeries = (props:Props): React.JSX.Element => {
  return (
    <View style={style.card_container}>
      <View style={{ width: 310, height: 310 }}>
        <Image
          source={{
            uri: props.poster,
          }}

          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <Text>
        { props.title }
      </Text>

      {props.genre.map((genre, index) => (
        <Text key={index}>
          { genre }{ index === props.genre.length - 1 ? '' : ', ' }
        </Text>
      ))}
    </View>
  )
}

const style = StyleSheet.create({
  card_container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: systemColor.primary.dark,
  },
});

export default MoviesAndSeries