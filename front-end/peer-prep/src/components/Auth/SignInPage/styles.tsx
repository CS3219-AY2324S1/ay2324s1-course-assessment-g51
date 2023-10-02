
export const signInPageStyle = {
    height: "100vh",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: "100%"
}

export const emailAndPasswordContainerStyle = {
    height: "60%",
    width: "60%",
    gridColumn: "1 / 2",
    gridRow: "1 / 1",
    border: "2px solid blue",
    justifySelf: "center",
    alignSelf: "center",
    display: "grid",
    //justifyContent: "center",
    justifyItems: "center",
    //alignItems: "center",
    alignContent: "center"
}

export const firstHeaderStyle = {
    height: "50px",
    paddingBottom: "20px",
    //border: "2px solid red",
    fontSize: "50px",
    fontFamily: "arial"
}

export const secondHeaderStyle = {
    //border: "2px solid red",
    fontSize: "20px",
    fontFamily: "arial",
    paddingBottom: "20px"
}

export const switchStyle = {
    height: "60px",
    width: "500px",
    //border: "1.5px solid black",
    backgroundColor: "#1B2735",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center"
}

export const signInToggleStyle = {
    backgroundColor: "white",
    height: "100%",
    width: "55%",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "2px solid black"
}

export const signOutToggleStyle = {
    //alignSelf: "flex-end"
    marginLeft: "50%"
}

export const toggleBorderStyle = {
    border: "2px solid pink",
    color: "pink"
}

export const toggleButtonTextStyle = {
    fontSize: "25px",
    height: "30px",
    fontFamily: "arial",
}

export const textFieldStyle = {
    marginTop: "20px",
    width: "500px",
    '& label.Mui-focused': {
        color: '#F4C2C2',
    },
	'& .MuiInput-underline:after': {
		borderBottomColor: '#F4C2C2',
	},
	'& .MuiOutlinedInput-root': {
        height: "60px",
		'& fieldset': {
			borderColor: "#1B2735",
			borderRadius: "10px",
		},
		'&:hover fieldset': {
			borderColor: '#F4C2C2',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#F4C2C2',
		}
    },
}

export const continueButtonStyle = {
    backgroundColor: "#1B2735",
    borderRadius: "15px",
    marginTop: "20px",
    height: "60px",
    width: "500px",
    '&:hover': {
        backgroundColor: 'pink', // Change background color to pink on hover
    },
    fontSize: "20px"
}