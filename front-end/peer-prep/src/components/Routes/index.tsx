const liveDomain = "peerprepgroup51sem1y2023.xyz"

export interface IRoutes {
    questions: string,
    profile: string[],
    socketIO: string[]

}

const localhostRoutes = {
    questions: "http://localhost:8080/api/questions",
    profile: [
        "http://localhost:3100/users/profile/",
        "http://localhost:3100/users/admin/",
        "http://localhost:3100/users/admin",
        "http://localhost:3100/users/request/",
        "http://localhost:3100/users/request",
        "http://localhost:3100/users/superAdmin/",
    ],
    socketIO: [
        "http://localhost:8000/", // for matching service socket
        "http://localhost:8576/", // for collab service socket
    ]

}

const liveRoutes = {
    questions: "https://api." + liveDomain + "/api/questions",
    profile: [
        "https://api." + liveDomain + "/users/profile/",
        "https://api." + liveDomain + "/users/admin/",
        "https://api." + liveDomain + "/users/admin",
        "https://api." + liveDomain + "/users/request/",
        "https://api." + liveDomain + "/users/request/",
        "https://api." + liveDomain + "/users/superAdmin/",
    ],
    socketIO: [
        "https://api." + liveDomain + "/", // for matching service socket
        "https://collab." + liveDomain + "/"  // for collab service socket
    ]
}

const gkeRoutes = {
    questions: "https://questionsk8." + liveDomain + "/api/questions",
    profile: [
        "https://usersk8." + liveDomain + "/users/profile/",
        "https://usersk8." + liveDomain + "/users/admin/",
        "https://usersk8." + liveDomain + "/users/admin",
        "https://usersk8." + liveDomain + "/users/request/",
        "https://usersk8." + liveDomain + "/users/request",
        "https://usersk8." + liveDomain + "/users/superAdmin/",
    ],
    socketIO: [
        "https://matchk8." + liveDomain + "/",
        "https://collabk8." + liveDomain + "/"
    ]
}

export const getRoutes = () => {
    if (process.env.REACT_APP_ENVIRONMENT === "dev") {
        return localhostRoutes;
    } else if (process.env.REACT_APP_ENVIRONMENT === "gke") {
        return gkeRoutes;
    } else {
        return liveRoutes;
    }
}


