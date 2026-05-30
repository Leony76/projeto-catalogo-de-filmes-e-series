import Button from '@/components/Button';
import ContentNotFound from '@/components/ContentNotFound';
import { Modal } from '@/components/modal';
import { style } from '@/css/movieOrSeriesInfo';
import { MovieAndSeriesService } from '@/services/movieAndSeries.service';
import type { MoviesAndSeriesResponse as MoviesOrSeriesInfo } from '@shared/types/movie/movies.dto';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { showToast } from '@/hooks/showToast';
import type { ToastState } from '@shared/types/toastState.type';
import { apiError } from '@/utils/apiError';

const MovieOrSeriesInfo = (): React.JSX.Element => {

  const { id } = useLocalSearchParams();

  const [movieOrSeriesInfos, setMovieOrSeriesInfos] = useState<MoviesOrSeriesInfo | null>(null);
  const [changed, setChanged] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({
    message : '',
    type    : 'INFO',
    visible : false,
  });

  const [expandImage, setExpandImage] = useState<boolean>(false);

  const handleAddToFavorites = async(id: string): Promise<void> => {
    try {
      const response = await MovieAndSeriesService.addTofavorites(id);

      if (response.success) {
        showToast(setToast, response.message, 'SUCCESS');
        setFavorited(true);
        setChanged(true);
      }

    } catch (error:unknown) {
      if (error instanceof Error) 
        showToast(setToast, apiError(error), 'ERROR');
    } 
  };

  const handleRemoveFromFavorites = async(id: string): Promise<void> => {
    try {
      const response = await MovieAndSeriesService.removeFromfavorites(id);

      if (response.success) {
        showToast(setToast, response.message, 'SUCCESS');
        setFavorited(false);
        setChanged(true);
      }

    } catch (error:unknown) {
      if (error instanceof Error) 
        showToast(setToast, apiError(error), 'ERROR');
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
        if (error instanceof Error) 
          showToast(setToast, apiError(error), 'ERROR');
      }
    })();
  },[id]);

  return (
    <>
      <Modal.ExpandedImage
        onClose={() => setExpandImage(false)}
        uri={movieOrSeriesInfos?.poster ?? ''}
        visible={expandImage}
      />

      <Modal
      onClose={changed 
        ? () => router.replace('/home')
        : () => router.back()
      }
      visible={!expandImage}
      title='DETALHES'
      toast={toast ? {
        message : toast.message,
        type    : toast.type,
        visible : toast.visible,
      } : undefined}
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