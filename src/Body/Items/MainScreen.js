import React, { useState } from "react";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useLocation, useNavigate, useParams } from "react-router";
import { TabBoxStyled } from "../../styles/MuiStyles";

const MainScreen = () => {

    const navigate = useNavigate();

	const location = useLocation();

	const params = useParams();

	const idPath = `/${params.id}/`;

	const [selectedTab, setSelectedTab] = useState('Vegetables');

	const handleChange = (_, tab) => {
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

			</TabContext>
		</React.Fragment>
	);
};

export default MainScreen;
