import { StyleSheet } from "react-native";
import { systemColor } from "./global";

export const style = StyleSheet.create({
  form_container: {
    gap: 8,
  },

  poster_preview_container: {
    borderWidth: 1,
    backgroundColor: systemColor.primary.translucite,
    borderColor: systemColor.primary.medium,
    borderRadius: 8,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  poster_preview_text: {
    fontFamily: 'Nunito',
    color: systemColor.primary.medium,
    fontWeight: '600',
    fontSize: 12
  },

  or_container: { 
    flexDirection: 'row', 
    gap: 8, 
    alignItems: 'center' 
  },

  or_rows: { 
    flex: 1, 
    height: 1, 
    backgroundColor: systemColor.secondary.medium, 
    marginTop: 5 
  },

  genre_tags_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  genre_tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: systemColor.primary.translucite,
    borderWidth: 1,
    borderColor: systemColor.primary.medium,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    gap: 6,
  },

  image_preview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  genre_tag_text: {
    color: systemColor.primary.medium,
    fontFamily: "Nunito",
    fontWeight: "600",
  }
});