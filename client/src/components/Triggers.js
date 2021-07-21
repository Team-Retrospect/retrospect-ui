import React, { useState, useEffect } from "react";
// import Trigger from "./Trigger";
import axios from "axios";
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";


const Triggers = () => {
	const [gridableTriggers, setGridableTriggers] = useState([]);
	let counter = 0;

	const history = useHistory();

	useEffect(() => {
		axios.get("/api/trigger_routes").then((response) => {
			const gridTriggers = response.data.map(trigger => {
				// const { span_id } = trigger;
				return { id: counter++, trigger_route: trigger };
			})
			setGridableTriggers(gridTriggers)
		});
	}, []);

	const handleRoute = (e) =>{ 
    history.push({
			pathname: '/spans/',
			state: {
				data: e.row.trigger_route, 
			},
		});
  }

	const columns = [
		{field: 'id', headerName: 'Id', width: 200, hide: true},
		{field: 'trigger_route', headerName: 'Trigger Route', width: 300},
	];

	return (
			<div style={{ height: 700, width: '100%' }}>
      	<DataGrid
					components={{
						Toolbar: GridToolbar,
					}}
      	  rows={gridableTriggers}
      	  columns={columns}
      	  pageSize={25}
					onRowClick={(e) => handleRoute(e)}
  				filterModel={{
						items: [
							{ columnField: 'trigger_route', operatorValue: 'contains', value: '' },
						],
  				}}
      	/>
			</div>
		// <div id="span-list">
		// 	<h1>Trigger Routes</h1>
		// 	{triggers.map((trigger) => {
		// 		return <Trigger key={trigger} url={trigger} />;
		// 	})}
		// </div>
	)
};

export default Triggers;