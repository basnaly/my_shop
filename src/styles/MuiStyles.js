import { styled } from "@mui/material";
import { Button, Box, DialogTitle, Paper, Badge } from "@mui/material";

export const MainStyled = styled("div")({
	fontFamily: "'Spinnaker', sans-serif",
	fontSize: "30px",
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
	color: "#FF1493",
	border: "1px solid dimgray",
	fontSize: "18px",
	backgroundColor: "darkgray",
	padding: "1px 5px",
});

export const AuthButton = styled(Button)({
	textTransform: "none",
	color: "#FF1493",
	border: "1px solid dimgray",
	fontSize: "18px",
	backgroundColor: "darkgray",
	padding: "2px 7px",
});

export const BasketButton = styled(Button)({
	textTransform: "none",
	color: "yellow",
	border: "1px solid dimgray",
	fontSize: "28px",
	backgroundColor: "darkgray",
	padding: "3px 10px",
});

export const LightYellowButton = styled(Button)({
	textTransform: "none",
	color: "yellow",
	border: "1px solid dimgray",
	fontSize: "18px",
	backgroundColor: "lightgray",
	padding: "1px 5px",
});

export const LightPinkButton = styled(Button)({
	textTransform: "none",
	color: "#FF1493",
	border: "1px solid dimgray",
	fontSize: "18px",
	backgroundColor: "lightgray",
	padding: "1px 5px",
});

export const PaperStyled = styled(Paper)({
	padding: "10px",
	margin: "10px",
	position: "relative",
	border: "1px solid #FF1493",
	borderRadius: "10px",
	fontSize: "30px",
	backgroundColor: "linen",
});

export const DialogTitleStyled = styled(DialogTitle)({
	fontSize: "24px",
});

export const IconItemStyled = styled("div")({
	fontSize: "60px",
	padding: "3px",
});

export const BoxStyled = styled(Box)({
	position: "relative",
	border: "1px solid dimgray",
	borderRadius: "10px",
});

export const ItemNameStyled = styled("div")({
	fontSize: "26px",
	fontWeight: "bold",
});

export const ItemDataStyled = styled("div")({
	fontSize: "22px",
});

export const ErrorStyled = styled("div")({
	fontFamily: "'Spinnaker', sans-serif",
	color: "#FF1493",
	fontSize: "20px",
	fontWeight: "bold",
	textAlign: "center",
	
});

export const UserMenuStyled = styled("div")({
	fontSize: "24px",
	color: "#FF1493",
	fontWeight: "bold",
	cursor: "pointer",
	"&:hover": {
		backgroundColor: "#fff6",
	},
});

export const TotalStyled = styled("div")({
	fontSize: "26px",
});

export const TotalSumStyled = styled("span")({
	fontSize: "30px",
	color: "#FF1493",
	fontWeight: "bold",
});

export const ItemCartStyled = styled("div")({
	fontSize: "24px",
});

export const TitleCartStyled = styled("div")({
	fontSize: "26px",
	textDecoration: "underline",
});

export const OrderTitleStyled = styled("div")({
	fontSize: "26px",
	textDecoration: "underline",
});

export const OrderDataStyled = styled("div")({
	fontSize: "22px",
});

export const SpanOrderStyled = styled("span")({
	color: "#FF1493",
	fontWeight: "bold",
	marginLeft: "10px",
});

export const BadgeStyled = styled(Badge)({
	"& .MuiBadge-badge": {
		right: -40,
		top: 5,
		padding: "0 4px",
		height: "40px",
		width: "80px",
		backgroundColor: "#FF1493",
		color: "yellow",
	},
});

export const BadgeCartStyled = styled(Badge)({
	"& .MuiBadge-badge": {
		right: -10,
		top: -3,
	},
});

export const AddAddressStyled = styled("div")({
	color: "#FF1493",
	textShadow: "1px 1px black"
});

export const DeliveryStyled = styled("div")({
	color: "#FF1493",
	fontSize: "22px",
	margin: "5px 0"
});

export const DeliveryTimeStyled = styled("div")({
	fontSize: "22px",
	margin: "5px 0"
});

export const LoginStyled = styled("div")({
	fontSize: "22px",
	fontFamily: "'Spinnaker', sans-serif",
});

export const DiscountButton = styled(Button)({
	textTransform: "none",
	border: "1px solid dimgray",
	color: 'white',
	fontSize: "24px",
	backgroundColor: "dimgray",
});

export const FooterStyled = styled("div")({
	backgroundColor: "lightgray",
});

export const TotalDescriptionStyled = styled("span")({
	fontSize: "20px",
	paddingLeft: "10px"
});

export const BadgeItemStyled = styled(Badge)({
	"& .MuiBadge-badge": {
		right: 30,
		top: 30,
		padding: "5px",
		height: "40px",
		width: "120px",
	},
});