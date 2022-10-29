import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { GreenButton, PinkButton, RedButton, UserMenuStyled, YellowButton } from "../../styles/MuiStyles";
import { ResetUser } from "../UserRedux";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Logout = () => {

    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    
    const openLogoutDialog = () => setIsLogoutDialogOpen(true);
    const closeLogoutDialog = () => setIsLogoutDialogOpen(false);

    const dispatch = useDispatch();

    const handleLogout = () => { 

        sessionStorage.removeItem('authToken')
        dispatch(ResetUser()) // no userId, no email, no password
        dispatch({
            type: "RESET_USER_DATA"
        })
    }

  return (

    <React.Fragment>
        
            <UserMenuStyled
                className="d-flex flex-column align-items-center w-100 py-2"
                data-testid="logout-element"
                variant={'outlined'}
                onClick={openLogoutDialog}>
                Log out
            </UserMenuStyled>

            <Dialog
                data-testid="dialog-logout-element"
                open={isLogoutDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeLogoutDialog}
                aria-labelledby="modal-modal-title"
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle id="modal-modal-title" variant="h6" component="h2"
                    className='pb-1 m-1'>
                    Log out
                </DialogTitle>

                <hr className='mx-2 my-0' />

                <DialogContent className='pb-3'>
                    <DialogContentText id="alert-dialog-slide-description"
                        className='mt-0 mb-0'>
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>

                <DialogActions className="d-flex align-items-center mt-0 mb-3">
                    <YellowButton
                        data-testid="cancel-element"
                        variant={'outlined'}
                        className="mx-3"
                        onClick={closeLogoutDialog}
                    >
                        Cancel
                    </YellowButton>

                    <PinkButton
                        variant={'outlined'}
                        className="mx-3"
                        onClick={handleLogout}>
                        Logout
                    </PinkButton>

                </DialogActions>
            </Dialog>
        </React.Fragment>
  )
}

export default Logout
