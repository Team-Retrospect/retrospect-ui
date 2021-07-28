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
      main: '#271d3f',
    },
    text: {
      primary: '#271d3f',
      secondary: '#271d3f',
    },
  },
  shadows,
  typography,
});

export default theme;
