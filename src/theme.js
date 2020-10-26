import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff6600" ,
      light:"#ff983f",
      dark:"#c43300"
    },
    secondary: {
      main: "#2c88d3",
      light:"#6cb8ff",
      dark:"#005ca1"
    },
    deactivated:{
      main:"#eceff1"
    }
  },
});