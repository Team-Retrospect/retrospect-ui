import React from 'react';
import { 
  Drawer , 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider
  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';

// Issues:
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

// Event Search:
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

// Span Search:
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

// Trigger Routes:
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles({
	container: {
		width: "160px"
	}
});

const Sidebar = () => {
  const classes = useStyles();
  const history = useHistory();

  const itemsList = [
    {
      text: 'Dashboard',
      icon: <InboxIcon />, 
      path: '/'
    }, {
      text: 'Issues',
      icon: <ErrorOutlineIcon />, 
      path: '/issues'
    }, {
      text: 'Event Search',
      icon: <ImageSearchIcon />, 
      path: '/events'
    }, {
      text: 'Span Search',
      icon: <LocationSearchingIcon />, 
      path: '/spans'
    }, {
      text: 'Trigger Routes',
      icon: <LanguageIcon />, 
      path: '/trigger_routes'
    }
  ]

  return (
    <Drawer variant="permanent" className={classes.drawer}>
      <Typography variant="h3" align="center" gutterBottom="true">Retr<VisibilityIcon fontSize="medium"/>spect</Typography>
      <Divider />
      <List>
        {itemsList.map(item => {
          const { text, icon, path } = item;
          return (
            <ListItem 
              button 
              key={text}
              onClick={() => history.push(path)}
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;

// const drawerWidth = 240

// const useStyles = makeStyles({
//   page: {
//     background: '#f9f9f9',
//     width: '100%'
//   },
//   drawer: {
//     width: drawerWidth
//   },
//   drawerPaper: {
//     width: drawerWidth
//   }
// })

// const listItems = [
//   {
//     text: 'Dashboard',
//     icon: <InboxIcon />, 
//     href: '/'
//   }, {
//     text: 'Issues',
//     icon: <InboxIcon />, 
//     href: '/'
//   }, {
//     text: 'Event Search',
//     icon: <InboxIcon />, 
//     href: '/events'
//   }, {
//     text: 'Span Search',
//     icon: <InboxIcon />, 
//     href: '/spans'
//   }, {
//     text: 'Trigger Routes',
//     icon: <InboxIcon />, 
//     href: '/trigger_routes'
//   }
// ]

// const Sidebar = () => {
//   const classes = useStyles();
//   return (
//     <Drawer
//       classname={classes.drawer}
//       variant="permanent"
//       anchor="left"
//       classes={{ paper: classes.drawerPaper }}
//     >
//       <Typography variant="h5">Testing</Typography>
//       <List>
//         {listItems.map(item => {
//           <ListItem
//             button
//             key={item.text}
//             // onClick
//           >
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.text}/>
//           </ListItem>
//         })}
//       </List>
//     </Drawer>
//   );
// }


// export default Sidebar;