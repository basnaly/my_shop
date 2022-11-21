import moment from "moment";
import { useSelector } from "react-redux";
import { DATE_FORMAT, DELIVERY_TIME } from "../constants";
import { DeliveryTimeStyled } from "../styles/MuiStyles";

const DeliveryTime = () => {

    const userDistrict = useSelector((state) => state?.user?.address?.district);
	const deliveryDistrict = DELIVERY_TIME[userDistrict]

    let todayDate = moment()
    let todayDay = todayDate.day() // week day

    let deliveryDate = todayDate.clone().add(deliveryDistrict, 'days')
    let deliveryDay = deliveryDate.day()

    let hour = todayDate.hour()

    if (hour >= 16 && (todayDay !== 4 || todayDay !== 5 || todayDay !== 6)) {
        deliveryDate = todayDate.clone().add(deliveryDistrict + 1, 'days')
    } else if (todayDay === 5 || todayDay === 6) {
        deliveryDate = todayDate.clone().add(deliveryDistrict + 1, 'days')
    } else if (deliveryDay === 5) {
        deliveryDate = todayDate.clone().add(deliveryDistrict + 2, 'days')
    } else if (deliveryDay === 6) {
        deliveryDate = todayDate.clone().add(deliveryDistrict + 1, 'days')
    } else {
        deliveryDate = todayDate.clone().add(deliveryDistrict, 'days')
    }
    
	return (
		<DeliveryTimeStyled className="w-100 text-start">
			<div>If you order now, the delivery will be</div>
            <div>on {deliveryDate.format(DATE_FORMAT)} by 20:00</div>
		</DeliveryTimeStyled>
	);
};

export default DeliveryTime;
