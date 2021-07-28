import React from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

const CustomDataGrid = ({
  loading,
  dataRows,
  dataColumns,
  filterField,
  onHandleClick,
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: 50,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    customTable: {
      '& .MuiDataGrid-root': {
        backgroundColor: '#ffffff',
        padding: 15,
      },
      cursor: "pointer"
    },
    chip: {
      marginLeft: 30,
    },
    datagrid: {
      cursor: "pointer"
    }
    
  }));

  const classes = useStyles();

  const handleClick = (e) => {
    onHandleClick(e);
  };

  return (
    <div
      style={{ height: dataRows.length < 5 ? 450 : 700, width: '100%' }}
      className={classes.customTable}
      className={classes.root}
    >
      <DataGrid
        className={classes.datagrid}
        loading={loading}
        components={{
          Toolbar: GridToolbar,
        }}
        rows={dataRows}
        columns={dataColumns}
        pageSize={25}
        onRowClick={(e) => handleClick(e)}
        filterModel={{
          items: [
            {
              columnField: { filterField },
              operatorValue: 'contains',
              value: '',
            },
          ],
        }}
      />
    </div>
  );
};

export default CustomDataGrid;
