import { FlatList, View, useWindowDimensions } from "react-native";
import Layout from "../layout";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { systemColor } from "@/css/global";
import Select from "@/components/Select";
import { style } from "@/css/home";
import { MOVIES_FILTER, type MoviesFilterOptions } from "@/maps/value_label/filters/movies.filter";
import { MovieAndSeriesService } from "@/services/movieAndSeries.service";
import type { MoviesAndSeriesResponse } from "@shared/types/movie/movies.dto";
import { Card } from "@/components/card";
import { useMoviesAndSeriesFilter } from "@/hooks/useMoviesAndSeriesFIlter";

const Home = (): React.JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<MoviesFilterOptions>('none');

  const [moviesAndSeries, setMoviesAndSeries] = useState<MoviesAndSeriesResponse[]>([]);
  const [favoriteMoviesAndSeriesIds, setFavoriteMoviesAndSeriesIds] = useState<string[]>([]);

  const { width } = useWindowDimensions();
  const numColumns: 1 | 2 | 3 | 4 = 
    width >= 1250  ? 4 
    : width >= 950 ? 3 
    : width >= 650 ? 2
    :                1 
  ;

  const { filteredMoviesAndSeries } = useMoviesAndSeriesFilter(
    moviesAndSeries,
    favoriteMoviesAndSeriesIds,
    filter,
    search,
  )

  useEffect(() => {
    (async() => {
      try {
        const [moviesAndSeries, favoriteMoviesAndSeriesIds] = await Promise.all([
          MovieAndSeriesService.get(),
          MovieAndSeriesService.getFavoriteIds(),
        ]); 

        setMoviesAndSeries(moviesAndSeries);
        setFavoriteMoviesAndSeriesIds(favoriteMoviesAndSeriesIds);
      } catch (error:unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    })();
  },[]);

  return (
    <Layout mainWrapperStyle={style.main_wrapper}>
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
          optionsSchema={MOVIES_FILTER}
          onClick={(option) => setFilter(option)}
        />  
      </View>

      <View style={style.separation_row}/>
      
      <FlatList
        data={filteredMoviesAndSeries}
        style={numColumns === 1 ? { width: '100%' } : { alignSelf: 'center' }}
        key={numColumns}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? { gap: 12 } : undefined}
        contentContainerStyle={style.movies_and_series_cards_container}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card.MoviesAndSeries 
            { ...item }
            numColumns={numColumns}
          />
        )}
      />
    </Layout>
  );
}

export default Home;