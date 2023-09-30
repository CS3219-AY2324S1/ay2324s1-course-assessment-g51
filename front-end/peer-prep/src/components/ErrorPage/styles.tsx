
export const errorPageContainerStyle = {
    height: "100vh",
    border: "2px solid black",
    display: "grid",
    gridTemplateRows: "10% 90%",
    gridTemplateColumns: "35% 30% 35%",
    backgroundColor: "#131B25"
}

export const errorContainerStyle = {
    height: "100%",
    gridColumn: "2 / 3",
    gridRow: "1 / 3",
    display: "grid",
    gridTemplateRows: "calc(( 100% - 400px) / 2 ) 200px 150px 50px calc(( 100% - 400px) / 2 )",
    gridTemplateColumns: "calc(( 100% - 600px ) / 2 ) 600px calc(( 100% - 600px ) / 2 )",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: "200px",
    fontFamily: "arial",
    color: "black"
}

export const EyePlayerContainerStyle = {
    height: "100%",
    width: "100%",
    gridRow: "2 / 3",
    gridColumn: "1 / 4",
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "center",
    alignItems: "center"
}

export const sorryContainerStyle = {
    height: "100%",
    widht: "100%",
    gridRow: "3 / 3",
    gridColumn: "1 / 4",
    fontSize: "60px",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    alignContent: "center",
    color: "white"
}

export const sorryStyle = {
    textAlign: "center" as "center"
}

export const backButtonStyle = {
    gridRow: "4 / 4",
    gridColumn: "1 / 4",
    height: "50px",
    width: "60%",
    backgroundColor: "#1B2735",
    borderRadius: "15px",
    fontSize: "30px",
    '&:hover': {
        backgroundColor: 'pink',
    }
}