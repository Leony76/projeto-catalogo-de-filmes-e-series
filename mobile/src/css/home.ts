import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  search_and_filter_container: {
    flexDirection: 'row',
    gap: 10,
  },

  movies_and_series_cards_container: {
    gap: 12,
    paddingBottom: 12,
  },
  
  separation_row: {
    height: 1, 
    width: '100%', 
    backgroundColor: 'lightgray', 
  },
  
  main_wrapper: {
    marginTop: 12,
    gap: 12,
  },
});