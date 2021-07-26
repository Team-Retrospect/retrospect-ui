import { createMuiTheme as createTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white, 
    },
    primary: { 
      contrastText: '#ffffff',
      main: '#001c58'// changes color of gridtoolbar
    },
    text: {
      primary: '#172b4d', // main text color
      // secondary: '#6b778c' // changes color in cards
      secondary: '#000000'
    }, 
  },
  shadows,
  typography
});

export default theme;
