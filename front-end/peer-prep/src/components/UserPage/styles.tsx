export const UserPageContainerStyle = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#131B25",
    display: "grid",
    justifyItems: "center",
    alignItems: "center"
}

export const MainContainerStyle = {
    display: "grid",
    backgroundColor: "#1B2735",
    justifyItems: "center",
    height: "60%",
    width: "30%",
    borderRadius: "15px",  
}

export const DetailsContainerStyle = {
    height: "80%",
    width: "80%",
    display: "grid",
    gridRowGap: "4%",
    marginTop: "5%",
}

export const AvatarAndUsernameContainerStyle = {
    display: "grid",
    gridRowGap: "10%",
    justifyItems: "center",
}

export const AvatarStyle = {
    width: "50px",
    height: "50px"
}

export const userStyle = {
    backgroundColor: "#1B2735",
    width: "60%",
    borderRadius: "10px",
    input : {color: "white"},
    label: {color: "white"},
    '& MuiInputBase-input-MuiOutlinedInput-input': {
        color: "white"
    },
    '& label.Mui-focused': {
        color: '#F4C2C2',
        borderRadius: "10px",
    },
	'& .MuiInput-underline:after': {
		borderBottomColor: '#F4C2C2',
	},
	'& .MuiOutlinedInput-root': {
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

export const detailStyle = {
    backgroundColor: "#1B2735",
    borderRadius: "10px",
    input : {color: "white"},
    label: {color: "white"},
    '& MuiInputBase-input-MuiOutlinedInput-input': {
        color: "white"
    },
    '& label.Mui-focused': {
        color: '#F4C2C2',
        borderRadius: "10px",
    },
	'& .MuiInput-underline:after': {
		borderBottomColor: '#F4C2C2',
	},
	'& .MuiOutlinedInput-root': {
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
