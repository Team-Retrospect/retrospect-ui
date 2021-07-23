import React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const CustomDataGrid = ({dataRows, dataColumns, filterField, onHandleClick}) => {

  const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
			// marginTop: 75,
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
		customTable: {
			'& .MuiDataGrid-root': {
				backgroundColor: "#ffffff", 
				padding: 15
			}
		}, 
		chip: {
			 marginLeft: 30
		}
	}));

  const classes = useStyles();

  const handleClick = (e) => { 
    onHandleClick(e);
  }


  return (
    <div style={{ height: dataRows.length < 5 ? 450 : 700, width: '100%'}} className={classes.customTable} className={classes.root} >
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
      	  rows={dataRows}
      	  columns={dataColumns}
      	  pageSize={25}
					onRowClick={(e) => handleClick(e)}
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