const liveDomain = "peerprepgroup51sem1y2023.xyz"

export interface IRoutes {
    questions: string,
    profile: string[]

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
    ]

}

const liveRoutes = {
    questions: "https://api" + liveDomain + "/api/questions",
    profile: [
        "https://" + liveDomain + "/users/profile/",
        "https://" + liveDomain + "/users/admin/",
        "https://" + liveDomain + "/users/admin",
        "https://" + liveDomain + "/users/request/",
        "https://" + liveDomain + "/users/request/",
        "https://" + liveDomain + "/users/superAdmin/"
    ]
}

export const getRoutes = () => {
    if (process.env.REACT_APP_ENVIRONMENT === "localhost") {
        return localhostRoutes;
    } else {
        return liveRoutes;
    }
}


