import { FlatList, View } from "react-native";
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
import MoviesAndSeries from "@/components/card/MoviesAndSeries";

const Home = (): React.JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<MoviesFilterOptions>('none');

  const [moviesAndSeries, setMoviesAndSeries] = useState<MoviesAndSeriesResponse[]>([]);

  useEffect(() => {
    (async() => {
      try {
        const response = await MovieAndSeriesService.getMovies();

        setMoviesAndSeries(response);
      } catch (error:unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    })();

    console.log(process.env.EXPO_PUBLIC_API_URL);
  },[]);

  return (
    <Layout>
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

      <FlatList
        data={moviesAndSeries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MoviesAndSeries 
            { ...item }
          />
        )}
      />
    </Layout>
  );
}

export default Home;