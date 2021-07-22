import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Triggers from './Triggers';
import Home from './Home';
import Chapter from './Chapter';
import Chapters from './Chapters';
import Session from './Session';
import SpanSearch from './SpanSearch';
import EventSearch from './EventSearch';
import Issues from './Issues';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@material-ui/core';

// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import SpeedIcon from '@material-ui/icons/Speed';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import LanguageIcon from '@material-ui/icons/Language';

const sidebarWidth = 200;

const useStyles = makeStyles({
  page: {
    background: '#f9f9f9',
    width: '100%',
  },
  drawer: {
    width: sidebarWidth,
  },
  root: {
    display: 'flex',
  },
});

const drawerItems = [
  {
    text: 'Dashboard',
    icon: <SpeedIcon />,
    path: '/',
  },
  {
    text: 'Issues',
    icon: <ErrorOutlineIcon />,
    path: '/issues',
  },
  {
    text: 'Event Search',
    icon: <ImageSearchIcon />,
    path: '/events',
  },
  {
    text: 'Span Search',
    icon: <LocationSearchingIcon />,
    path: '/spans',
  },
  {
    text: 'Trigger Routes',
    icon: <LanguageIcon />,
    path: '/trigger_routes',
  },
  {
    text: 'Sessions',
    icon: <LanguageIcon />,
    path: '/session/test',
  },
];

function App() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer variant="permanent" className={classes.drawer}>
        <br></br>
        <Typography variant="h4" align="center" gutterBottom>
          Retrospect
        </Typography>
        <Divider />
        <List>
          {drawerItems.map((item) => {
            const { text, icon, path } = item;
            return (
              <ListItem button key={text} onClick={() => history.push(path)}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <div id="app" className={classes.page}>
        <Route path="/" exact component={Home} /> {/* Count of errors maybe? */}
        <Route path="/spans" exact component={SpanSearch} />
        <Route path="/events" exact component={EventSearch} />
        <Route path="/issues" exact component={Issues} />
        <Route path="/trigger_routes" exact component={Triggers} />
        <Route path="/trigger_route/:id" component={Chapters} />
        <Route path="/session/:id" component={Session} />
        <Route path="/chapter/:id" component={Chapter} />
      </div>
    </div>
  );
}

export default App;
