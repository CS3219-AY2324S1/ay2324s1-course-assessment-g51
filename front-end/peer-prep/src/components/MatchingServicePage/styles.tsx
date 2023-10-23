export const matchingServicePageContainerStyle = {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#131B25",
    display: "grid",
    justifyItems: "center",
    alignItems: "center",
    gridTemplateRows: "2fr 6fr 2fr"
}

export const checkBoxStyle = {
    color: "pink"
}

export const formControlLabelStyle = {
    color: "white"
}

export const circleStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    backgroundColor: "pink",
    display: "flex",            // Use Flexbox to center content
    justifyContent: "center",   // Center content horizontally
    alignItems: "center",       // Center content vertically
}

export const progressBarComponentStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 2fr",
    alignItems: "center",
    gridColumnGap: "8%"
}

export const progressBarContainerStyle = {
    width: "80%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridColumnGap: "3%",
    marginLeft: "5%"
}

export const horizontalLineStyle = {
    width: "100%",
    height: "1%",
    backgroundColor: "white"
}

export const textStyle = {
    color: "white"
}

export const mainContainerStyle = {
    display: "grid",
    width: "80%",
    gridTemplateColumns: "1fr 6fr 1fr",
    gridColumnGap: "20%",
    alignItems: "center",
    justifyItems: "center"
}

export const arrowStyle = {
    color: "pink"
}

export const arrowStylesDisabled = {
    color: "#131B25"
}

export const difficultyStyle = {
    color: "pink",
}

export const stepperStyle = {
    width: "80%",
    '.MuiSvgIcon-root': {
        color: "pink",
    },
    '& .Mui-disabled': {
        color: "white"
    },
    '.MuiStepLabel-root .Mui-completed' : {
        color: "#90EE90",
    },
    '.MuiStepLabel-root .Mui-active': {
        color: "rgb(240, 105, 180)"
    },
    '& .MuiStepIcon-text': {
        fill: "black"
    }
}
