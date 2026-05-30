import { FlatList, View, useWindowDimensions } from "react-native";
import Layout from "../layout";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { systemColor } from "@/css/global";
import Select from "@/components/Select";
import { style } from "@/css/home";
import { TITLES_FILTER, type TitlesFilterOptions } from "@/maps/value_label/filters/title.filter";
import { TitleService } from "@/services/title.service";
import type { TitlesResponse } from "@shared/types/title/titles.dto";
import { Card } from "@/components/card";
import { useTitleFilter } from "@/hooks/useTitleFilter";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "@/components/Toast";
import { apiError } from "@/utils/apiError";
import { showToast } from "@/hooks/showToast";
import type { ToastState } from "@shared/types/toastState.type";
import type { ToastType } from "@shared/types/toastType.type";
import ContentNotFound from "@/components/ContentNotFound";
import Loading from "@/components/Loading";

const Home = (): React.JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const params = useLocalSearchParams<{
    message? : string;
    type?    : 'SUCCESS' | 'ERROR' | 'INFO';
  }>();

  const [filter, setFilter] = useState<TitlesFilterOptions>('none');
  const [loading, setLoading] = useState<boolean>(false);
  
  const [toast, setToast] = useState<ToastState>({
    message: '', 
    type: 'INFO', 
    visible: false,
  });


  const [titles, setTitles] = useState<TitlesResponse[]>([]);
  const [favoriteTitlesIds, setFavoriteTitlesIds] = useState<string[]>([]);

  const { width } = useWindowDimensions();
  const numColumns: 1 | 2 | 3 | 4 = 
    width >= 1250  ? 4 
    : width >= 950 ? 3 
    : width >= 650 ? 2
    :                1 
  ;

  const { filteredTitles } = useTitleFilter(
    titles,
    favoriteTitlesIds,
    filter,
    search,
  );

  useEffect(() => {
    if (!params.message) return;

    setToast({
      message : String(params.message),
      type    : (params.type as ToastType) ?? 'INFO',
      visible : true,
    });

    router.setParams({
      message : undefined,
      type    : undefined,
    });
  }, [params.message, params.type]);

  useEffect(() => {
    (async() => {
      try {
        setLoading(true);

        const [titles, favoriteTitlesIds] = await Promise.all([
          TitleService.get(),
          TitleService.getFavoriteIds(),
        ]); 

        setTitles(titles);
        setFavoriteTitlesIds(favoriteTitlesIds);
      } catch (error:unknown) {
        showToast(setToast, apiError(error), 'ERROR');
      } finally {
        setLoading(false);
      }
    })();
  },[]);

  return (
    <Layout mainWrapperStyle={style.main_wrapper}>
      <Toast
        message={toast.message}
        visible={toast.visible}
        type={toast.type}
      />

      <View style={style.search_and_filter_container}>
        <Input
          value={search}
          icon={() => <FontAwesome5 name="search" size={15} color={systemColor.secondary.medium} />}
          placeholder="Pesquisar"
          flex={1}
          onChange={(text) => setSearch(text)}
          onClick={{
            clearText: () => setSearch(''),
          }}
        />  

        <Select
          value={filter}
          icon={() => <FontAwesome5 name="filter" size={12} color={systemColor.secondary.medium} />}
          placeholder="Filtro"
          optionsSchema={TITLES_FILTER}
          onClick={(option) => setFilter(option)}
        />  
      </View>

      <View style={style.separation_row}/>
      
      { loading ? <Loading/> : (
        <FlatList
          data={filteredTitles}
          style={numColumns === 1 ? { width: '100%' } : { alignSelf: 'center' }}
          key={numColumns}
          numColumns={numColumns}
          columnWrapperStyle={numColumns > 1 ? { gap: 12 } : undefined}
          contentContainerStyle={style.movies_and_series_cards_container}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<ContentNotFound message="Nenhum filme/série no momento!"/>}
          renderItem={({ item }) => (
            <Card.Title 
              { ...item }
              numColumns={numColumns}
            />
          )}
        />
      )}
    </Layout>
  );
}

export default Home;