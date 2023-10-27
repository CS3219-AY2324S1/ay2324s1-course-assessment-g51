export const verificationPageContainerStyle = {
	height: "100vh",
	width: "100vw",
	backgroundColor: "#131B25",
	display: "grid",
	gridTemplateColumns:
		"calc( ( 100% - 700px ) / 2) 700px calc( ( 100% - 700px ) / 2 )",
	gridTemplateRows:
		"calc( ( 100% - 500px ) / 2) 500px calc( ( 100% - 500px ) / 2 )",
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

export const backButtonStyle = {
	height: "100px",
	width: "100px",
	gridColumn: "2/3",
	gridRow: "2/3",
	zIndex: "1",
	paddingLeft: "15px",
	paddingTop: "13px",
};

export const iconStyle = {
	height: "30%",
	width: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "15px",
};

export const textStyle = {
	height: "20%",
	width: "100%",
	color: "white",
	fontFamily: "arial",
	fontSize: "40px",
	display: "flex",
	justifyContent: "center",
	borderRadius: "15px",
	fontWeight: "bold",
	paddingBottom: "3.5%",
};

export const innerTextStyle = {
	height: "20%",
	width: "90%",
	color: "white",
	fontFamily: "arial",
	fontSize: "20px",
	display: "flex",
	alignItems: "center",
	borderRadius: "15px",
	paddingLeft: "5%",
	paddingRight: "5%",
};

export const buttonStyle = {
	height: "23%",
	width: "100%",
	fontFamily: "arial",
	fontSize: "20px",
	display: "flex",
	alignItems: "center",
	borderRadius: "15px",
	justifyContent: "center",
};
