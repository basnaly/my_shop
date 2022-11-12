import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React from "react";

const style = {color: 'black', fontSize: '18px'}

const DetailsOrder = ({ items }) => {
	return (
		<TableContainer >
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center" sx={style}>
                                Item name
                        </TableCell>
						<TableCell align="center" sx={style}>
                            Price
                        </TableCell>
						<TableCell align="center" sx={style}>
                            Unit
                        </TableCell>
						<TableCell align="center" sx={style}>
                            Quantity
                        </TableCell>
						<TableCell align="center" sx={style}>
                            Total sum
                        </TableCell>
						<TableCell align="center" sx={style}>
                            Note
                        </TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{items.map((item) => (
						<TableRow key={item.itemName} sx={{fontSize: '18px'}}>
							<TableCell align="center">{item.itemName}</TableCell>
							<TableCell align="center">
								{" "}
								{item.price} €
							</TableCell>
							<TableCell align="center">
								{item.unit}
							</TableCell>
							<TableCell align="center">
								x {item.quantity}
							</TableCell>
							<TableCell align="center">
								{" "}
								{item.total} €
							</TableCell>
							<TableCell align="center">
								{item.note}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default DetailsOrder;
