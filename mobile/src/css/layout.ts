import { StyleSheet } from "react-native";
import { systemColor } from "./global";

export const styles = StyleSheet.create({
  body_container: {
    flex: 1,
  },

  header_container: {
    backgroundColor: systemColor.primary.light,
    padding: 12,
    borderBottomColor: systemColor.secondary.light,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderStyle: 'dashed',
    borderBottomWidth: 3,
  },  
  
  header_title: {
    color: systemColor.secondary.medium,
    fontSize: 28,
    fontStyle: 'italic',
    fontFamily: 'Catalunya',
  },

  main_container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  footer_container: {
    backgroundColor: systemColor.primary.light,
    padding: 12,
    borderTopColor: systemColor.secondary.light,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    textAlign: 'center',
    borderStyle: 'dashed',
    borderTopWidth: 3,
  },

  footer_copyright_paragraph: {
    textAlign: 'center',
    fontFamily: 'Catalunya',
    color: systemColor.secondary.medium,
  },
});