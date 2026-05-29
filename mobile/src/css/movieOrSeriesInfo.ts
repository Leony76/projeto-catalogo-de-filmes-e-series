import { StyleSheet } from "react-native";
import { systemColor } from "./global";

export const style = StyleSheet.create({
  card_container: {
    borderWidth: 1,
    borderRadius: 8,
    gap: 8,
    padding: 8,
    borderColor: systemColor.primary.dark,
    backgroundColor: systemColor.primary.translucite
  },

  text: {
    fontFamily: 'Nunito',
    color: systemColor.primary.dark,
    fontWeight: '600'
  },

  year: {
    color: systemColor.secondary.dark,
    fontFamily: 'Nunito',
    fontWeight: '600',
  },

  poster_container: {
    width: "auto", 
    height: 310 ,
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
    paddingRight: 8,
  },

  year_and_add_to_favorites_button_container: {
    flexDirection  : 'row',
    justifyContent : 'space-between',
  },
});