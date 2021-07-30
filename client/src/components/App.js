import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Triggers from './Triggers';
import Chapter from './Chapter';
import Session from './Session';
import Sessions from './Sessions';
import SpanSearch from './SpanSearch';
import EventSearch from './EventSearch';
import Issues from './Issues';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, AppBar } from '@material-ui/core';
import theme from '../theme';
import { ReactComponent as Logo } from '../logo.svg';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import SpeedIcon from '@material-ui/icons/Speed';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import LanguageIcon from '@material-ui/icons/Language';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';

const sidebarWidth = 300;

const colors = {
  steelBlue: '#367f8f',
  cadetBlue: '#49adaf',
  mediumAquamarine: '#68c2bf',
  sandyBrown: '#f2bc46',
  peru: '#e4874c',
  indianRed: '#df564d',
  white: '#9EBEB9',
  wheat: '#f3e0b5',
  midnightBlue: '#271d3f',
  realWhite: '#F9F9F9',
};

const useStyles = makeStyles({
  page: {
    background: colors.realWhite,
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: colors.midnightBlue,
    height: 85,
  },
  drawer: {
    width: sidebarWidth,
  },
  root: {
    display: 'flex',
  },
  drawerPaper: {
    width: sidebarWidth,
    paddingTop: 85,
    backgroundColor: colors.midnightBlue,
  },
  title: {
    flexGrow: 1,
    fontSize: 35,
    paddingLeft: 20,
  },
  list: {
    paddingLeft: 40,
  },
});

const drawerItems = [
  {
    text: 'Dashboard',
    icon: <SpeedIcon style={{ color: colors.cadetBlue }} />,
    path: '/',
  },
  {
    text: 'Event Search',
    icon: <ImageSearchIcon style={{ color: colors.mediumAquamarine }} />,
    path: '/events',
  },
  {
    text: 'Span Search',
    icon: <LocationSearchingIcon style={{ color: colors.wheat }} />,
    path: '/spans',
  },
  {
    text: 'Trigger Routes',
    icon: <LanguageIcon style={{ color: colors.sandyBrown }} />,
    path: '/trigger_routes',
  },
  {
    text: 'Sessions',
    icon: <OndemandVideoIcon style={{ color: colors.indianRed }} />,
    path: '/sessions',
  },
];

function App() {
  const classes = useStyles();
  const history = useHistory();
  const [currentUrl, setCurrentUrl] = useState('');

  const handleClick = (e, path) => {
    e.preventDefault();
    if (currentUrl === path) {
      if (currentUrl === '/sessions' || currentUrl === '/trigger_routes') {
        history.goBack();
        history.push(path);
      }
      history.push('/temp');
      history.goBack();
    } else {
      setCurrentUrl(path);
      history.push(path);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Logo />
      </AppBar>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <br></br>
          <br></br>
          <List>
            {drawerItems.map((item) => {
              const { text, icon, path } = item;
              return (
                <ListItem
                  button
                  key={text}
                  onClick={(e) => handleClick(e, path)}
                  className={classes.list}
                >
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText
                    primary={text}
                    style={{ color: colors.realWhite }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <div id="app" className={classes.page}>
          <Route path="/" exact component={Issues} />
          <Route path="/spans" exact component={SpanSearch} />
          <Route path="/events" exact component={EventSearch} />
          <Route path="/trigger_routes" exact component={Triggers} />
          <Route path="/sessions" component={Sessions} />
          <Route path="/session/:id" component={Session} />
          <Route path="/chapter/:id" component={Chapter} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
