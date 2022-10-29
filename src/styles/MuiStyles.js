import { styled} from "@mui/material";
import { Button, Box, DialogTitle, Paper} from "@mui/material";

export const MainStyled = styled('div')({
    // backgroundColor: "lightgray",
});

export const HeaderStyled = styled("div")({
	backgroundColor: "lightgray",
	fontSize: "34px",
	fontWeight: "bold",
});

export const YellowButton = styled(Button)({
	textTransform: "none",
	color: "yellow",
	border: "1px solid dimgray",
	fontSize: "18px",
	backgroundColor: "darkgray",
	padding: "1px 5px",
});

export const PinkButton = styled(Button)({
	textTransform: "none",
	color: "deeppink",
	border: "1px solid dimgray",
	fontSize: "18px",
	backgroundColor: "darkgray",
	padding: "1px 5px",
});

export const AuthButton = styled(Button)({
	textTransform: "none",
	color: "deeppink",
	border: "1px solid dimgray",
	fontSize: "18px",
	backgroundColor: "darkgray",
	padding: "2px 7px",
});

export const PaperStyled = styled(Paper)({
	padding: "10px",
	margin: "10px",
	position: "relative",
	border: "1px solid hotpink",
	borderRadius: "10px",
	fontSize: "30px",
	backgroundColor: "linen",
});

export const DialogTitleStyled = styled(DialogTitle)({
	fontSize: "24px",
	// paddingBottom: 0
});

export const IconItemStyled = styled("div")({
	fontSize: "60px",
	padding: "3px",
});

export const BoxStyled = styled(Box)({
	position: "relative",
	border: '1px solid dimgray',
	borderRadius: "10px",
});

export const ItemNameStyled = styled("div")({
	fontSize: "26px",
	fontWeight: "bold",
});

export const ItemDataStyled = styled("div")({
	fontSize: "22px",
	//fontWeight: "bold",
});

export const ErrorStyled = styled("div")({
	color: "red",
	fontSize: "20px",
	fontWeight: "bold",
});

export const UserMenuStyled = styled("div")({
	fontSize: "22px",
	color: "forestgreen",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#fff6",
	},
});
