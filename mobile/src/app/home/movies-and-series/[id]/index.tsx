import Button from '@/components/Button';
import ContentNotFound from '@/components/ContentNotFound';
import { Modal } from '@/components/modal';
import { style } from '@/css/movieOrSeriesInfo';
import { MovieAndSeriesService } from '@/services/movieAndSeries.service';
import type { MoviesAndSeriesResponse as MoviesOrSeriesInfo } from '@shared/types/movie/movies.dto';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View, Modal as ReactNativeModal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';

const MovieOrSeriesInfo = (): React.JSX.Element => {

  const { id } = useLocalSearchParams();

  const [movieOrSeriesInfos, setMovieOrSeriesInfos] = useState<MoviesOrSeriesInfo | null>(null);
  const [favorited, setFavorited] = useState<boolean>(false);

  const [expandImage, setExpandImage] = useState<boolean>(false);

  const handleAddToFavorites = async(id: string): Promise<void> => {
    try {
      const response = await MovieAndSeriesService.addTofavorites(id);

      if (response.success) {
        Toast.show({
          type     : 'success',
          text2    : response.message,
          position : 'top',
        });

        setFavorited(true);
      }

    } catch (error:unknown) {
      if (error instanceof Error) Toast.show({
        type     : 'error',
        text2    : error.message,
        position : 'top',
      });
    }
  };

  const handleRemoveFromFavorites = async(id: string): Promise<void> => {
    try {
      const response = await MovieAndSeriesService.removeFromfavorites(id);

      if (response.success) {
        Toast.show({
          type     : 'success',
          text2    : response.message,
          position : 'top',
        });

        setFavorited(false);
      }

    } catch (error:unknown) {
      if (error instanceof Error) Toast.show({
        type     : 'error',
        text2    : error.message,
        position : 'top',
      });
    }
  };

  useEffect(() => {
    if (!router.canGoBack()) {
      router.replace('/home');
    }
  }, []);

  useEffect(() => {
    (async() => {
      try {
        const [infos, favoriteIds] = await Promise.all([
          MovieAndSeriesService.getInfo(String(id)),
          MovieAndSeriesService.getFavoriteIds(),
        ]); 

        setMovieOrSeriesInfos(infos);
        setFavorited(favoriteIds.includes(infos.id) ? true : false);
      } catch (error:unknown) {
        if (error instanceof Error) console.error(error.message);
      }
    })();
  },[id]);

  return (
    <>
      <ReactNativeModal
      visible={expandImage}
      transparent
      animationType="fade"
      >
        <TouchableOpacity
        activeOpacity={0.67}
        onPress={() => setExpandImage(false)}
        style={style.expanded_poster_container}
        >
          <Image
            resizeMode="contain"
            source={{ uri: movieOrSeriesInfos?.poster }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      </ReactNativeModal>

      <Modal
      onClose={() => router.back()}
      visible={!expandImage}
      title='DETALHES'
      >
        <View style={style.card_container}>
          { movieOrSeriesInfos ? (
            <>
              <TouchableOpacity 
              style={style.poster_container}
              activeOpacity={0.67}
              onPress={() => setExpandImage(true)}
              >
                <Image
                  style={style.poster}
                  source={{ uri: movieOrSeriesInfos.poster }}
                />
              </TouchableOpacity>
      
              <Text style={style.title}>
                { movieOrSeriesInfos.title }
              </Text>
              
              <Text style={style.text}>
                Gêneros
              </Text>

              <View style={style.genres_container}>
                {movieOrSeriesInfos.genre.map((genre, index) => (
                  <Text 
                  key={index}
                  style={[
                    style.genre_name, 
                    index !== movieOrSeriesInfos.genre.length - 1
                      && { borderRightWidth: 1, borderColor: 'lightgray' }
                  ]}
                  >
                    { genre } 
                  </Text>
                ))}
              </View>    
              
              <View style={style.year_and_add_to_favorites_button_container}>
                <View>
                  <Text style={style.text}>
                    Ano de estreia
                  </Text> 

                  <Text style={style.year}>
                    { movieOrSeriesInfos.year } 
                  </Text>
                </View>

                <Button
                  icon={() => <AntDesign name="star" size={18} color={favorited ? "yellow" : "darkgoldenrod"} />}
                  onPress={
                    favorited 
                      ? () => handleRemoveFromFavorites(String(id))
                      : () => handleAddToFavorites(String(id))
                  }
                  customStyle={{
                    text      : { color: favorited ? 'yellow' : 'darkgoldenrod' },
                    container : { borderColor: favorited ? '#fff42b25' : 'darkgoldenrod', backgroundColor: favorited ? 'darkgoldenrod' : '#fff42b25' }
                  }}
                  text={favorited ? 'Favorito' :'Favoritar'}
                />
              </View>
            </>
          ) : <ContentNotFound message='Não foi possível trazer as informações do(a) filme/série'/>} 
        </View>
      </Modal>
    </>
  )
}

export default MovieOrSeriesInfo;