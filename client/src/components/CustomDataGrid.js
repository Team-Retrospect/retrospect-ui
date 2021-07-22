import React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const CustomDataGrid = ({dataRows, dataColumns, filterField}) => {
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
			marginTop: 75,
			marginBottom: 50, 
		},
		// header: {
		// 	'& .super-app-theme--header': {
		// 		backgroundColor: '#FFC288',
		// 	},
		// },
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
		avatar: {
			backgroundColor: red[500]
		}, 
		customTable: {
			'& .MuiDataGrid-root': {
				backgroundColor: "#ffffff", 
				padding: 15
			}
		}, 
		chip: {
			 marginLeft: 30
		}, 
		errors: {

		}
	}));

  const classes = useStyles();

  const handleRoute = (e) =>{ 
    history.push(`/chapter/${e.row.chapter_id}`);
  }

  return (
    <div style={{ height: dataRows.length < 5 ? 450 : 700, width: '100%'}} className={classes.customTable} >
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
      	  rows={dataRows}
      	  columns={dataColumns}
      	  pageSize={25}
					onRowClick={(e) => handleRoute(e)}
  				filterModel={{
						items: [
							{ columnField: {filterField}, operatorValue: 'contains', value: "" },
						],
  				}}
      	/>
			</div>
  )
}

export default CustomDataGrid;