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
import { ThemeProvider } from '@material-ui/core';
import theme from '../theme';
import { AppBar, Toolbar } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

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

const sidebarWidth = 250

const useStyles = makeStyles({
	page: {
		background: '#f9f9f9',
		width: '100%'
	},
	appBar: {
    zIndex: theme.zIndex.drawer + 1,
		backgroundColor: '#fb6500',
  },
	drawer: {
		width: sidebarWidth,
	},
	root: {
		display: 'flex'
	}, 
	drawerPaper: {
    width: sidebarWidth,
		paddingTop: 50
  }, 
	title: {
		flexGrow: 1, 
		fontSize: 35,
		paddingLeft: 20
	}, 
	list: {
		paddingLeft: 40
	}
})

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
		<ThemeProvider theme={theme}>
			<AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
				<Typography variant="h6" noWrap className={classes.title}>
            Retrospect
          </Typography>
        </Toolbar>
      </AppBar>
			<div className={classes.root}>
				<CssBaseline />
				<Drawer variant="permanent" className={classes.drawer} classes={{
          paper: classes.drawerPaper,
        }}>
					<br></br>
					<List>
						{drawerItems.map(item => {
							const { text, icon, path } = item;
							return (
								<ListItem 
									button 
									key={text}
									onClick={() => history.push(path)}
									className={classes.list}
								>
									{icon && <ListItemIcon>{icon}</ListItemIcon>}
									<ListItemText primary={text} />
								</ListItem>
							)
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
		</ThemeProvider>
	);
}

export default App;
