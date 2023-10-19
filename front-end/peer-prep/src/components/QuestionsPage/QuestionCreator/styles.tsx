
export const questionCreatorContainerStyle = {
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
}

export const questionCreatorViewStyle = {
    display: "grid",
    backgroundColor: "#131B25",
    justifyItems: "center",
    alignItems: "center",
    height: "80%",
    width: "90%",
    borderRadius: "15px",  
}

export const labelContainerStyle = {
    height: "60%",
    width: "80%",
    display: "grid",
    gridRowGap: "5%",
    backgroundColor: "#131B25",
}

export const labelStyle = {
    backgroundColor: "#1B2735",
    borderRadius: "10px",
    input : {color: "white"},
    label: {color: "white"},
    '& label.Mui-focused': {
        color: '#F4C2C2',
        borderRadius: "10px",
    },
	'& .MuiInput-underline:after': {
		borderBottomColor: '#F4C2C2',
	},
	'& .MuiOutlinedInput-root': {
        height: "100%",
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
    }
}

export const idTextFieldStyle = {
    backgroundColor: "#1B2735",
    borderRadius: "10px",
    label: {color: "#F4C2C2"},
    height: "100%",
    '& .MuiInputLabel-root.Mui-disabled': {
		borderRadius: "10px",
		color: 'pink', // Change label color for disabled state
        height: "100%",
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
		borderColor: 'pink', // Change border color for disabled state
		borderRadius: "10px",
        height: "100%",
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#F4C2C2",
    },
    '& .MuiOutlinedInput-root': {
        height: "100%"
    }
}

export const descriptionStyle = {
    backgroundColor: "#1B2735",
    borderRadius: "10px",
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
    "& .MuiInputBase-inputMultiline" : {
        //WebkitTextFillColor: "red",
    	color: "white",
       	'&::-webkit-scrollbar': {
        width: '12px', // Set the width of the scrollbar
        borderRadius: "15px",
        scrollTop: "100px",
    	},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: "#F4C2C2", // Set the color of the thumb (scrollbar handle)
			borderRadius: "15px",
			scrollTop: "100px"
		},
		'&::-webkit-scrollbar-thumb:hover': {
			backgroundColor: "#F4C2C2", // Set the color of the thumb on hover
			borderRadius: "15px",
			scrollTop: "100px"
		},
    },
}

export const buttonStyle = {
    justifySelf: "end",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none"
}

export const chipStyle = {
    color: "white"
}