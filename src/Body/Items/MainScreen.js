import React, { useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import ListItems from "./ListItems";

const MainScreen = () => {

	const [selectedTab, setSelectedTab] = useState('Vegetables');

	const handleChange = (event, tab) => {
		setSelectedTab(tab);
		//navigate(tab);
	};

	return (
		<React.Fragment>
			<TabContext value={selectedTab}>
				<Box className="d-flex align-items-center justify-content-evenly">
					<TabList
						onChange={handleChange}
						aria-label="lab API tabs example"    
					>
						<Tab label="Vegetables" value={"Vegetables"}/>
						<Tab label="Fruits" value={"Fruits"}/>
						<Tab label="Dairy" value={"Dairy"}/>
					</TabList>
				</Box>
                <ListItems selectedTab={selectedTab}/>

			</TabContext>
		</React.Fragment>
	);
};

export default MainScreen;
