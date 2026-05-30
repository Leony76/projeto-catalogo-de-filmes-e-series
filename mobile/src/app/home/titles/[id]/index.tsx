import Button from '@/components/Button';
import ContentNotFound from '@/components/ContentNotFound';
import { Modal } from '@/components/modal';
import { style } from '@/css/titleInfo';
import { TitleService } from '@/services/title.service';
import type { TitlesResponse as MoviesOrSeriesInfo } from '@shared/types/title/titles.dto';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { showToast } from '@/hooks/showToast';
import type { ToastState } from '@shared/types/toastState.type';
import { apiError } from '@/utils/apiError';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const MovieOrSeriesInfo = (): React.JSX.Element => {

  const { id } = useLocalSearchParams();

  const [movieOrSeriesInfos, setMovieOrSeriesInfos] = useState<MoviesOrSeriesInfo | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);
  const [modal, setModal] = useState<'EXPAND_POSTER' | 'REMOVE_TITLE_CONFIRM' | null>(null);
  const [toast, setToast] = useState<ToastState>({
    message : '',
    type    : 'INFO',
    visible : false,
  });

  const handleRemoveTitle = async(id:string): Promise<void> => {
    try {
      setProcessing(true);

      const response = await TitleService.remove(id);

      if (response.success) {
        router.replace({
          pathname : '/home',
          params   : {
            message : response.message,
            type    : 'SUCCESS',
          }
        });
      }
    } catch (error:unknown) {
      showToast(setToast, apiError(error), 'ERROR');
    } finally {
      setProcessing(false);
    }
  };

  const handleAddToFavorites = async(id: string): Promise<void> => {
    try {
      setProcessing(true);

      const response = await TitleService.addTofavorites(id);

      if (response.success) {
        showToast(setToast, response.message, 'SUCCESS');
        setFavorited(true);
        setChanged(true);
      }

    } catch (error:unknown) {
      showToast(setToast, apiError(error), 'ERROR');
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveFromFavorites = async(id: string): Promise<void> => {
    try {
      setProcessing(true);

      const response = await TitleService.removeFromfavorites(id);

      if (response.success) {
        showToast(setToast, response.message, 'SUCCESS');
        setFavorited(false);
        setChanged(true);
      }

    } catch (error:unknown) {
      showToast(setToast, apiError(error), 'ERROR');
    } finally {
      setProcessing(false);
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
          TitleService.getInfo(String(id)),
          TitleService.getFavoriteIds(),
        ]); 

        setMovieOrSeriesInfos(infos);
        setFavorited(favoriteIds.includes(infos.id) ? true : false);
      } catch (error:unknown) {
        showToast(setToast, apiError(error), 'ERROR');
      }
    })();
  },[id]);

  return (
    <>
      <Modal.ExpandedImage
        onClose={() => setModal(null)}
        uri={movieOrSeriesInfos?.poster ?? ''}
        visible={modal === 'EXPAND_POSTER'}
      />

      <Modal.ConfirmAction
        title='Confirmar ação'
        message='Tem certeza em remover esse título?'
        processing={processing}
        onClose={() => setModal(null)}
        onAccept={() => handleRemoveTitle(String(id))}
        visible={modal === 'REMOVE_TITLE_CONFIRM'}
      />

      <Modal
      title='DETALHES'
      onClose={changed 
        ? () => router.replace('/home')
        : () => router.back()
      }
      visible={!modal}
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
              onPress={() => setModal('EXPAND_POSTER')}
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
                
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Button
                    text={
                      !processing 
                        ? favorited 
                          ? 'Favorito' 
                          :'Favoritar' 
                        : ''
                    }
                    loading={processing}
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
                    />

                  <Button
                    icon={() => <FontAwesome style={{  marginRight: -6 }} name="trash" size={24} color="red" />}
                    onPress={() => setModal('REMOVE_TITLE_CONFIRM')}
                    customStyle={{
                      text      : { color: 'red' },
                      container : { borderColor: 'red', paddingHorizontal: 12, backgroundColor: '#ffebeb' }
                    }}
                  />
                </View>
              </View>
            </>
          ) : <ContentNotFound message='Não foi possível trazer as informações do(a) filme/série'/>} 
        </View>
      </Modal>
    </>
  )
}

export default MovieOrSeriesInfo;