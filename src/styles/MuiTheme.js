import { createTheme } from "@mui/material/styles";

export const myTheme = createTheme({
	typography: {
		fontFamily: "'Spinnaker', sans-serif",
		fontSize: "30px",
		backgroundColor: "gray",
	},
    palette: {
        primary: {
            main: '#FF1493' // deeppink
        },
    },
	components: {
		MuiDialog: {
            styleOverrides: {
                paper: {
					backgroundColor: "linen",
				},
			},
		},
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: '18px',
                    backgroundColor: 'lightgray',
                    border: '1px solid forestgreen',
                      
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'deeppink',
                    fontSize: '16px',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    color: 'forestgreen',
                },
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    color: 'white',
                    backgroundColor: 'hotpink',
                    fontWeight: 'bold',
                    fontSize: "16px",
                },
            }
        }
	},
});
