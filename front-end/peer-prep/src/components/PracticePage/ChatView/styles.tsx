export const chatViewContainerStyle = {
    backgroundColor: "#131B25",
    height: "80%",
    width: "90%",
    borderRadius: "15px",
    display: "grid",
    gridTemplateRows: "9fr 1fr"
}

export const listStyle = {
    maxHeight: 600,
    overflow: "auto",
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

export const textFieldStyle = {
    input : {color: "white"},
    label: {color: "white"},
    '& label.Mui-focused': {
        color: '#F4C2C2',
    },
	'& .MuiInput-underline:after': {
		borderBottomColor: '#F4C2C2',
	},
	'& .MuiOutlinedInput-root': {
        height: "100%",
		'& fieldset': {
			borderColor: "#F4C2C2",
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

