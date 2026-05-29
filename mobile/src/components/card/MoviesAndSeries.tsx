import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import type { MoviesAndSeriesResponse as MoviesAndSeriesType } from "@shared/types/movie/movies.dto";
import { systemColor } from '@/css/global';
import Button from '../Button';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';

type Props = MoviesAndSeriesType & {
  numColumns: number;
};

const MoviesAndSeries = (props:Props): React.JSX.Element => {
  
  return (
    <View style={[style.card_container, { width: props.numColumns === 1 ? '100%': 300 } ]}>
      <View style={style.poster_container}>
        <Image
          style={style.poster}
          source={{ uri: props.poster }}
        />
      </View>

      <Text style={style.title}>
        { props.title }
      </Text>

      <View style={style.genres_container}>
        {props.genre.slice(0, 3).map((genre, index) => (
          <View 
          key={index}
          style={style.genre_card}
          >
            <Text style={style.genre_name}>
              { genre } 
            </Text>
          </View>    
        ))}

        { props.genre.length > 3 &&
          <Text style={{ marginTop: 4, fontFamily: 'Nunito' }}>
            Mais ...
          </Text>
        }
      </View>

      <Button
        icon={() => <Entypo name="info-with-circle" size={16} color={systemColor.secondary.dark} />}
        onPress={() => router.push(`/home/movies-and-series/${props.id}`)}
        text='Ver mais'
        customStyle={{
          container : { paddingVertical: 8 },
          text      : { fontSize: 15 }
        }}
      />
    </View>
  )
}

const style = StyleSheet.create({
  card_container: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderRadius: 8,
    gap: 8,
    padding: 8,
    borderColor: systemColor.primary.dark,
    backgroundColor: systemColor.primary.translucite
  },

  poster_container: {
    width: "auto", 
    height: 300 ,
  },

  title: {
    fontFamily: 'Catalunya',
    fontSize: 24,
    color: systemColor.secondary.dark,
  },

  poster: {
    height: "100%",
    borderRadius: 8,
  },

  genres_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  genre_card: {
    backgroundColor: systemColor.secondary.translucite,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: systemColor.secondary.medium,
  },

  genre_name: {
    color: systemColor.secondary.dark,
    fontFamily: 'Nunito',
    fontWeight: '600',
  },
});

export default MoviesAndSeries