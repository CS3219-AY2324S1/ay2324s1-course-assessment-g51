export const signInPageStyle = {
	height: "100vh",
	width: "100%",
	display: "grid",
	gridTemplateColumns: "50% 50%",
	gridTemplateRows: "100%",
	backgroundColor: "#131B25",
};

export const emailAndPasswordContainerStyle = {
	height: "700px",
	width: "700px",
	gridColumn: "1 / 2",
	gridRow: "1 / 1",
	borderRadius: "20px",
	justifySelf: "center",
	alignSelf: "center",
	display: "grid",
	//justifyContent: "center",
	justifyItems: "center",
	//alignItems: "center",
	alignContent: "center",
	backgroundColor: "white",
};

export const firstHeaderStyle = {
	height: "50px",
	paddingBottom: "20px",
	//border: "2px solid red",
	fontSize: "50px",
	fontFamily: "arial",
	//color: "white"
};

export const secondHeaderStyle = {
	//border: "2px solid red",
	fontSize: "20px",
	fontFamily: "arial",
	paddingBottom: "20px",
	//color: "white"
};

export const switchStyle = {
	height: "60px",
	width: "500px",
	//border: "1.5px solid black",
	backgroundColor: "#1B2735",
	borderRadius: "20px",
	display: "flex",
	flexDirection: "row" as "row",
	alignItems: "center",
};

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
	border: "2px solid black",
};

export const toggleButtonStyle = {
	//alignSelf: "flex-end"
	// marginLeft: "50%",
	// zPosition: "3"
	position: "relative",
	left: "45% ",
};

export const additionalToggleTextStyle = {
	// marginRight: "50%",
	// zPosition: "1"
	position: "relative",
	right: "55%",
};

export const toggleBorderStyle = {
	border: "2px solid pink",
	color: "pink",
};

export const toggleButtonTextStyle = {
	fontSize: "25px",
	height: "30px",
	fontFamily: "arial",
};

// Styling for the text beside the toggle button
export const toggleTextStyle = {
	height: "100%",
	width: "45%",
	color: "white",
	display: "flex",
	justifyContent: "center",
	alignContent: "center",
	alignItems: "center",
	fontFamily: "arial",
	fontSize: "25px",
	cursor: "pointer",
};

export const textFieldStyle = {
	marginTop: "20px",
	width: "500px",
	"& label.Mui-focused": {
		color: "#F4C2C2",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "#F4C2C2",
	},
	"& .MuiOutlinedInput-root": {
		height: "60px",
		"& fieldset": {
			borderColor: "#1B2735",
			borderRadius: "10px",
		},
		"&:hover fieldset": {
			borderColor: "#F4C2C2",
		},
		"&.Mui-focused fieldset": {
			borderColor: "#F4C2C2",
		},
	},
};

export const continueButtonStyle = {
	backgroundColor: "#1B2735",
	borderRadius: "15px",
	marginTop: "20px",
	height: "60px",
	width: "500px",
	"&:hover": {
		borderColor: "red",
		backgroundColor: "pink", // Change background color to pink on hover
	},
	fontSize: "20px",
};

export const peerPrepImageContainerStyle = {
	gridColumn: " 2 / 2",
	gridRow: "1 / 1",
	position: "relative" as "relative",
	paddingTop: "56.25%", // 16:9 aspect ratio
};

export const imageStyle = {
	position: "absolute" as "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover" as "cover", // Ensure the image covers the entire container
};

export const errorTextStyle = {
	width: "500px",
	marginTop: "20px",
	fontSize: "15px",
	color: "red",
	fontFamily: "arial",
	textAlign: "center" as "center",
};

export const dividerStyle = {
	color: "#1B2735",
	marginTop: "20px",
	width: "40%",
	fontSize: "20px",
};

export const iconStyle = {
	width: "30px",
	height: "30px",
};
