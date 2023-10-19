export const deletePageContainerStyle = {
    height: "100vh",
    width: "100vw",
    display: "grid",
    gridTemplateColumns: "calc( ( 100% - 500px ) / 2) 500px calc( ( 100% - 500px ) / 2 )",
    gridTemplateRows: "calc( ( 100% - 500px ) / 2) 500px calc( ( 100% - 500px ) / 2 )"
}

export const textContainerStyle = {
    height: "100%",
    width: "100%",
    gridColumn: "2 / 3",
    gridRow: "2 / 3",
    display: "flex",
    flexDirection: "column" as "column",
    fontSize: "50px",
    fontFamily: "arial",
    textAlign: "center" as "center",
    justifyContent: "center"
}

export const redirectContainerStyle = {
    height: "50px",
    width: "100%",
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "center" as "center",   
    alignItems: "center" as "center",
    marginTop: "20px"
}

export const deletePlayerStyle = {
    height: "300px",
    width: "100%",
}

export const loginButtonStyle = {
    height: "80%",
    width: "150px",
    backgroundColor: "pink",
    color: "white",
    borderRadius: "15px",
    ":hover": {
        color: "white",
        backgroundColor: "pink"
    }
}
