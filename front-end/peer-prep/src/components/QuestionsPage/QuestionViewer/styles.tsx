export const questionViewerContainerStyle = {
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
}

export const questionViewerViewStyle = {
    display: "grid",
    backgroundColor: "#131B25",
    justifyItems: "center",
    alignItems: "center",
    height: "80%",
    width: "90%",
    borderRadius: "15px",
}

export const questionViewerInnerStyle = {
    display: 'block',
    p: 1,
    m: 1,
    backgroundColor: "#1B2735",
    color: "white",
    border: '1px solid',
    borderColor: "#F4C2C2",
    borderRadius: 2
}

export const questionViewerDescriptionStyle = {
    display: 'block',
    p: 1,
    m: 1,
    backgroundColor: "#1B2735",
    color: "white",
    border: '1px solid',
    borderColor: "#F4C2C2",
    borderRadius: 2,
    overflow: "scroll",
    height: "200px",
    '&::-webkit-scrollbar': {
        width: '12px', // Set the width of the scrollbar
        borderRadius: "15px",
        scrollTop: "100px",
        backgroundColor: "#1B2735",
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: "#F4C2C2", // Set the color of the thumb (scrollbar handle)
        borderRadius: "15px",
        scrollTop: "100px",
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: "#F4C2C2", // Set the color of the thumb on hover
        borderRadius: "15px",
        scrollTop: "100px",
    },
    '&::-webkit-scrollbar-corner': {
        background: "transparent"
    }
}
