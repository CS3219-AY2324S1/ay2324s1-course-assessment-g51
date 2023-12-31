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
    height: "70%",
    width: "30%",
    borderRadius: "15px",
}

export const DetailsContainerStyle = {
    height: "80%",
    width: "80%",
    display: "grid",
    gridRowGap: "4%",
    marginTop: "10%",
}

export const AvatarContainerStyle = {
    display: "grid",
    gridRowGap: "10%",
    justifyItems: "center",
    marginBottom: "5%"
}

export const AvatarStyle = {
    width: "50px",
    height: "50px"
}

export const detailStyle = {
    backgroundColor: "#1B2735",
    borderRadius: "10px",
    input: { color: "white" },
    label: { color: "white" },
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
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#F4C2C2",
    },
    '& .MuiInputLabel-root.Mui-disabled': {
        borderRadius: "10px",
        color: 'pink', // Change label color for disabled state
        height: "100%",
    },
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1B2735', // Change border color for disabled state
        borderRadius: "10px",
        height: "100%",
    },
}

export const buttonStyle = {
    justifySelf: "end",
    backgroundColor: "rgba(0, 0, 0, 0)",
    border: "none"
}

export const deleteConfirmationButton = {
    color: "red"
}

export const deleteAccountButton = {
    color: "red"
}

export const upgradeAccountButton = {
    color: "green"
}
