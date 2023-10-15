export const VerificationPageContainerStyle = {
	height: "100vh",
	width: "100vw",
	backgroundColor: "#131B25",
	display: "grid",
	gridTemplateColumns:
		"calc( ( 100% - 700px ) / 2) 700px calc( ( 100% - 700px ) / 2 )",
	gridTemplateRows:
		"calc( ( 100% - 600px ) / 2) 600px calc( ( 100% - 600px ) / 2 )",
};

export const mainContainerStyle = {
	height: "100%",
	width: "100%",
	border: "2px solid pink",
	gridColumn: "2/3",
	gridRow: "2/3",
	fontSize: "20px",
	backgroundColor: "#1B2735",
	borderRadius: "15px",
};

export const textStyle = {
	height: "20%",
	width: "100%",
	border: "2px solid red",
	color: "white",
	fontFamily: "arial",
	fontSize: "40px",
	display: "flex",
	justifyContent: "center",
	paddingTop: "10%",
	borderRadius: "15px",
	fontWeight: "bold",
};

export const innerTextStyle = {
	height: "20%",
	width: "90%",
	border: "2px solid red",
	color: "white",
	fontFamily: "arial",
	fontSize: "20px",
	display: "flex",
	alignItems: "center",
	borderRadius: "15px",
	paddingLeft: "5%",
	paddingRight: "5%",
};
