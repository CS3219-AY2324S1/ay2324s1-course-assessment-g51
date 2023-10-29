export const ManagePageContainerStyle = {
	height: "100vh",
	width: "100vw",
	backgroundColor: "#131B25",
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	gridTemplateRows: "1fr 15fr",
	justifyItems: "center",
	alignItems: "center",
	overflow: "hidden",
};

export const AdminMainStyle = {
	height: "100%",
	width: "100%",
	gridColumn: "1/2",
	gridRow: "2/2",
	fontSize: "30px",
	display: "grid",
	gridTemplateColumns: "1fr",
	gridTemplateRows: "1fr 15fr",
	justifyItems: "center",
	alignItems: "center",
	overflow: "hidden",
};

export const AdminTextStyle = {
	height: "100%",
	width: "100%",
	fontSize: "30px",
	color: "white",
	gridColumn: "1/1",
	gridRow: "1/2",
	minHeight: "10px",
	textAlign: "center" as any,
	position: "relative" as any,
	marginTop: "14%",
};

export const AdminListStyle = {
	height: "90%",
	width: "85%",
	border: "2px solid pink",
	fontSize: "20px",
	backgroundColor: "#1B2735",
	borderRadius: "15px",
	minHeight: "200px",
	marginBottom: "40px",
	gridColumn: "1/1",
	gridRow: "2/2",
};

export const RequestorMainStyle = {
	height: "100%",
	width: "100%",
	gridColumn: "2/2",
	gridRow: "2/2",
	fontSize: "30px",
	display: "grid",
	gridTemplateColumns: "1fr",
	gridTemplateRows: "1fr 15fr",
	justifyItems: "center",
	alignItems: "center",
	overflow: "hidden",
};

export const RequestorTextStyle = {
	height: "100%",
	width: "100%",
	fontSize: "30px",
	color: "white",
	gridColumn: "1/1",
	gridRow: "1/2",
	minHeight: "10px",
	textAlign: "center" as any,
	position: "relative" as any,
	marginTop: "14%",
	overflow: "hidden",
};

export const RequestorListStyle = {
	height: "90%",
	width: "85%",
	border: "2px solid pink",
	fontSize: "20px",
	backgroundColor: "#1B2735",
	borderRadius: "15px",
	minHeight: "200px",
	marginBottom: "40px",
	gridColumn: "1/1",
	gridRow: "2/2",
};

export const textStyle = {
	color: "white",
	mt: 2,
	mb: 2,
};

export const deleteIconStyle = {
	color: "#D22B2B",
	cursor: "pointer",
};

export const clearIconStyle = {
	//marginLeft: "25px",
	color: "#D22B2B",
	cursor: "pointer",
};

export const tickIconStyle = {
	color: "green",
	cursor: "pointer",
};

export const emptySpace = {
	hight: "5px",
	width: "20px",
	cursor: "default",
	zIndex: 1,
};

export const listStyle = {
	maxHeight: "97%",
	overflow: "auto",
	paddingTop: "10px",
	paddingBottom: "10px",
	"&::-webkit-scrollbar": {
		width: "10px", // Set the width of the scrollbar
		borderRadius: "15px",
		scrollTop: "100px",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "#F4C2C2", // Set the color of the thumb (scrollbar handle)
		borderRadius: "15px",
		scrollTop: "100px",
	},
	"&::-webkit-scrollbar-thumb:hover": {
		backgroundColor: "#F4C2C2", // Set the color of the thumb on hover
		borderRadius: "15px",
		scrollTop: "100px",
	},
};

export const DividerStyle = {
	borderColor: "lightblue",
};
