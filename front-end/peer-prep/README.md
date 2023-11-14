
# Front-end documentation

This readme will cover some aspects of the design decisions our team made and the architecture of our front-end.


## Design Decisions

Many of our front-end pages were inspired from our designs in [Figma](https://www.figma.com/file/KH7a2ZONAF1fZEdaRzTcm1/PeerPrep-Full-Wireframe?type=design&node-id=0%3A1&mode=design&t=lkysywwJmQraspV2-1) and we decided that most of our designs should be `medium-fidelity` so that other front-end engineers are able to follow and code out the features easily.


## Architecture

1. [React](https://react.dev/) and [Redux](https://redux-toolkit.js.org/) are heavily used together to form the bulk of our web app. React powers our front-end to have `Single-Page-Application (SPA)` capabilities, while Redux manages most of the states in our app. 
2. [React Router v6](https://reactrouter.com/en/main/router-components/browser-router), particularly the `Browser Router`, is used to allow users in our app to visit different pages in our app while maintaining `SPA`, where users experience seemless redirection between pages.
3. [LottieFiles](https://lottiefiles.com/) is used to display animations in our app like `/goodbye` and `/signout` pages.

## Run Locally ( Without Docker )
#### All of the API routes used in the front-end will automatically switch to the API routes where it is deployed in a live server at peerprepgroup51sem1y2023.xyz if running without docker

Clone the project

```bash
  git clone https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g51.git
```

Go to the project directory

```bash
  cd ay2324s1-course-assessment-g51/tree/master/front-end/peer-prep
```

Install dependencies

```bash
  npm i
```

Start the front-end

```bash
  npm start
```

Access the front-end

```bash
  http://localhost:3000
```

## Run Locally ( With Docker )
#### All of the API routes used in the front-end will automatically switch to localhost routes where it is deployed by you in your local machine
Clone the project

```bash
  git clone https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g51.git
```

Go to the `docker-compose.yaml` file 

```bash
  cd ay2324s1-course-assessment-g51/Server-Configs/Without-K8/dev
```


Deploy all containers
```bash
  docker compose up -d
```

Access the front-end
```bash
  http://localhost:3000
```

## Access on (depreciated) live server ( For assignment grading )

Access the front-end
```bash
  https://app.peerprepgroup51sem1y2023.xyz
```
## Access on current live Google Kubernetes Engine (GKE) cluster ( For project grading )

Access the front-end
```bash
  https://app2.peerprepgroup51sem1y2023.xyz
```
