import { createTheme } from "@mui/material/styles";

export const myTheme = createTheme({
	typography: {
		fontFamily: "'Spinnaker', sans-serif",
		fontSize: 24,
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
                    border: '1px solid #FF1493',      
                }
            }
        },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    fontSize: '16px',
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontSize: '22px',
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#FF1493',
                    fontSize: '16px',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    color: '#FF1493',
                },
                input: {
                    fontSize: '20px',
                }
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    color: 'white',
                    backgroundColor: '#FF1493',
                    fontWeight: 'bold',
                    fontSize: "16px",
                },
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    color: '#FF1493',
                    fontWeight: "bold",
                    fontSize: '18px',
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: 'black',
                    textTransform: "none",
                    fontSize: "26px",
                    "&.Mui-selected": {
                        
                    },
                }
            }
        },
        MuiTabs: {
            styleOverrides: {
                flexContainer: {
                    justifyContent: 'space-evenly',
                },
                root: {
                    width: '100%',
                    backgroundColor: 'yellow',
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: "16px",
                }
            }
        }
	},
});
