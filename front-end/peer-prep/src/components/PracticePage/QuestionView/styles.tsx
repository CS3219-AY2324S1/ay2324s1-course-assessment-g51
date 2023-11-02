export const questionViewContainerStyle = {
    backgroundColor: "#131B25",
    height: "80%",
    width: "90%",
    display: "grid",
    borderRadius: "15px", 
    alignItems: "center",
    justifyItems: "center",
}

export const questionViewMainStyle = {
    height: "80%",
    width: "80%",
    gridTemplateRows: "1fr 1fr 1fr 0.5fr 8fr",
    display: "grid",
}

export const titleStyle = {
    color: "white",
    fontSize: "20px",
}

export const difficultyChipStyle = {
	color: "#90EE90",
	fontFamily: "arial",
    backgroundColor: "#1B2735",
	fontSize: "15px",
};

export const categoryChipStyle = {
	color: "white",
	fontFamily: "arial",
    backgroundColor: "#1B2735",
	fontSize: "15px",
};

export const descriptionStyle = {
    color: "white",
    gridRow: "5/5",
    overflow: "auto",
    maxHeight: 400,
       "&::-webkit-scrollbar": {
		width: "12px", // Set the width of the scrollbar
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
}
