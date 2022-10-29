import React from 'react'
import { YellowButton } from '../../styles/MuiStyles'
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';

const Basket = () => {

  return (

    <div>
        <YellowButton 
            variant={"outlined"}
			className=" mx-3"
        >
            <ShoppingBasketRoundedIcon />
        </YellowButton>
      
    </div>
  )
}

export default Basket
