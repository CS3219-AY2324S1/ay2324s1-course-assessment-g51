export const listStyle = {
    width: '100%',
    maxWidth: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    '&::-webkit-scrollbar': {
        width: '12px', // Set the width of the scrollbar
        borderRadius: "15px",
        scrollTop: "100px"
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
}

export const stackContainerStyle = {
    width: "100%",
    borderRadius: "15px",
    backgroundColor: "#1B2735",
    // Stack height can only use px -> MUI
    height: "110px",
}

export const questionHeadingsStyle = {
    color: "white",
    fontFamily: "arial",
    fontSize: "20px",
    marginLeft: "5%"
}

export const iconButtonStyle = {
    color: "white"
}

export const categoryChipStyle = {
    color: "white",
    fontFamily: "arial",
    backgroundColor: "#131B25",
    fontSize: "15px"
}

export const difficultyChipStyle = {
    color: "#90EE90",
    fontFamily: "arial",
    backgroundColor: "#131B25",
    fontSize: "15px",
    marginLeft: "20px"
}
