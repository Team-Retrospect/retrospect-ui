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
      contrastText: '#F4F6F8',
      main: '#271d3f', // changes color of gridtoolbar
    },
    text: {
      primary: '#271d3f', // main text color
      // secondary: '#6b778c' // changes color in cards
      secondary: '#271d3f',
    },
  },
  shadows,
  typography,
});

export default theme;
