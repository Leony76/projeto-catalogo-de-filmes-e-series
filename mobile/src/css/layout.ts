import { StyleSheet } from "react-native";
import { systemColor } from "./global";

export const styles = StyleSheet.create({
  body_container: {
    flex: 1,
  },

  header_container: {
    backgroundColor: systemColor.primary.light,
    borderBottomColor: systemColor.secondary.light,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderStyle: 'dashed',
    borderBottomWidth: 3,
  },  
  
  header_inner_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1300,
    padding: 10,
    width: '100%',
  },  
  
  header_title: {
    color: systemColor.secondary.medium,
    fontSize: 28,
    fontStyle: 'italic',
    fontFamily: 'Catalunya',
  },

  main_container: {
    flex: 1,
    maxWidth: 1300,
    paddingHorizontal: 12,
    marginHorizontal: 'auto',
    width: '100%',
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

  system_icon: {
    flexDirection: 'row',
    gap: 2,
  }
});