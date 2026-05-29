import { Modal } from '@/components/modal';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { showToast } from '@/hooks/showToast';
import type { ToastState } from '@shared/types/toastState.type';
import Input from '@/components/Input';
import { style } from '@/css/newMovieOrSeries';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { systemColor } from '@/css/global';
import Button from '@/components/Button';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {newMovieOrSeriesSchema, type NewMovieOrSeriesSchema } from "@/schemas/newMovieOrSeries";
import * as ImagePicker from "expo-image-picker";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MovieAndSeriesService } from '@/services/movieAndSeries.service';
import { apiError } from '@/utils/apiError';

const NewMovieOrSeries = (): React.JSX.Element => {

  const { 
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMovieOrSeriesSchema>({
    resolver: zodResolver(newMovieOrSeriesSchema),
     defaultValues: {  
      poster : "",
      title  : "",
      year   : "",
      genres : [],
    },
  })

  const [genreInput, setGenreInput] = useState<string>('');
  const [expandedPoster, setExpandedPoster] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({
    message : '',
    type    : 'INFO',
    visible : false,
  });

  const genres = watch("genres");
  const poster = watch("poster");

  const isBase64Image = poster.startsWith("data:image");

  const handleNewMovieOrSeries = async(data: NewMovieOrSeriesSchema): Promise<void> => {
    try { 
      const response = await MovieAndSeriesService.addNewMovieOrSeries(data);

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
      if (error instanceof Error) 
        showToast(setToast, apiError(error), 'ERROR');
    } 
  };

  const handlePickImage = async (): Promise<void> => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      showToast(setToast, "Permissão negada", "ERROR");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ['images'],
      quality    : 1,
      base64     : true,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    if (!asset.base64) {
      showToast(setToast, "Não foi possível converter imagem", "ERROR");
      return;
    }

    const base64 = `data:image/jpeg;base64,${asset.base64}`;

    setValue(
      "poster",
      base64,
      {
        shouldValidate : true,
        shouldDirty    : true,
        shouldTouch    : true,
      }
    );
  };

  const handleAddGenre = (): void => {
    const formattedGenre = genreInput.trim();

    if (!formattedGenre) return;

    const alreadyExists = genres.some(
      genre => genre.toLowerCase() === formattedGenre.toLowerCase()
    );

    if (alreadyExists) {
      showToast(setToast, "Gênero já adicionado", "INFO");
      return;
    }

    setValue(
      "genres", 
      [...genres, formattedGenre], 
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }
    );

    setGenreInput("");
  };

  const handleRemoveGenre = (genreToRemove: string): void => {
    setValue(
      "genres", 
      genres.filter(genre => genre !== genreToRemove),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }
    );
  };

  useEffect(() => {
    if (!router.canGoBack()) {
      router.replace('/home');
    }
  }, []);

  return (
    <>
      <Modal.ExpandedImage
        onClose={() => setExpandedPoster(false)}
        uri={poster}
        visible={expandedPoster}
      />

      <Modal
      onClose={() => router.back()}
      visible={!expandedPoster}
      title='Novo filme/série'
      toast={toast ? {
        message : toast.message,
        type    : toast.type,
        visible : toast.visible,
      } : undefined}
      >
        <View style={style.form_container}>
          <TouchableOpacity 
          style={style.poster_preview_container}
          activeOpacity={0.67}
          onPress={poster ? () => setExpandedPoster(true) : handlePickImage}
          >
            {poster ? (
              <Image
                source={{ uri: poster }}
                style={style.image_preview}
                resizeMode="cover"
              />
            ) : (
              <>
                <Entypo
                  name="image-inverted"
                  size={36}
                  color={systemColor.primary.medium}
                />

                <Text style={style.poster_preview_text}>
                  Aperte para inserir o poster
                </Text>
              </>
            )}
          </TouchableOpacity>

          {!isBase64Image && (
            <>
              { !poster &&         
                <View style={style.or_container}>
                  <View style={style.or_rows} />
                  <Text style={{ color: systemColor.secondary.medium }}>
                    Ou
                  </Text>
                  <View style={style.or_rows} />
                </View>
              }

              <Controller
                control={control}
                name="poster"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="URL"
                    placeholder="Insira a URL de uma imagem"
                    value={value}
                    onChange={onChange}
                    onClick={{ clearText: () => onChange("")}}
                    error={errors.poster?.message}
                  />
                )}
              />
            </>
          )}

          {(isBase64Image && poster) && (
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button
                text='Trocar'
                onPress={handlePickImage}
                icon={() => <Entypo name="images" size={18} color="darkgoldenrod" />}
                customStyle={{ 
                  container : { flex: 1, backgroundColor: '#fffde4', borderColor: 'darkgoldenrod' }, 
                  text      : { color: 'darkgoldenrod' }
                }}
              />

              <Button
                text='Remover'
                icon={() => <FontAwesome name="trash" size={18} color="red" />}
                onPress={() => setValue("poster", "", {
                  shouldValidate : true,
                  shouldDirty    : true,
                  shouldTouch    : true,               
                })}
                customStyle={{ 
                  container : { flex: 1, backgroundColor: '#ffeded', borderColor: 'red' }, 
                  text      : { color: 'red' }
                }}
              />
            </View>
          )}

          <View style={{ height: 1, backgroundColor: 'lightgray', marginTop: 5 }}/>

          <Controller
            control={control}
            name='title'
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome"
                placeholder="Insira o nome do filme/série"
                value={value}
                onChange={onChange}
                onClick={{ clearText: () => onChange("")}}
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='year'
            render={({ field: { onChange, value } }) => (
              <Input
                label="Ano"
                placeholder="Insira o ano de estreia do filme/série"
                value={value}
                onChange={onChange}
                onClick={{ clearText: () => onChange("")}}
                error={errors.year?.message}
                />
              )}
            />

          <Controller
            control={control}
            name='genres'
            render={({ field: { onChange, value } }) => (
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Input
                    label="Gênero(s)"
                    placeholder="Insira um gênero"
                    flex={1}
                    value={genreInput}
                    onChange={setGenreInput}
                    onClick={{clearText: () => setGenreInput("")}}
                    error={errors.genres?.message}
                  />

                  <Button
                    text=""
                    disabled={genreInput.length < 2}
                    icon={() => <AntDesign name="plus" size={18} color={systemColor.secondary.medium} />}
                    onPress={handleAddGenre}
                    customStyle={{ 
                      text      : { color: systemColor.secondary.medium },
                      container : { paddingLeft: 12, height: 29, alignSelf: 'flex-end' },
                    }}
                  />
                </View>

                <View style={style.genre_tags_container}>
                  {genres.map((genre, index) => (
                    <View
                    key={index}
                    style={style.genre_tag}
                    >
                      <Text style={style.genre_tag_text}>
                        { genre }
                      </Text>

                      <TouchableOpacity 
                      activeOpacity={0.67}
                      onPress={() => handleRemoveGenre(genre)}
                      >
                        <AntDesign
                          name="close"
                          size={12}
                          color={systemColor.primary.dark}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
          />

          <Button
            text='Adicionar'
            disabled={Object.keys(errors).length > 0}
            onPress={handleSubmit(handleNewMovieOrSeries)}
            customStyle={{ 
              text : { color: systemColor.secondary.medium, paddingVertical: 6 }, 
            }}
            icon={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo 
                  name="plus" 
                  size={18} 
                  color={systemColor.secondary.medium} 
                />

                <FontAwesome6 
                  name="film" 
                  size={18} 
                  color={systemColor.secondary.medium} 
                />
              </View>
            )}
          />
        </View>
      </Modal>
    </>
  )
}

export default NewMovieOrSeries;