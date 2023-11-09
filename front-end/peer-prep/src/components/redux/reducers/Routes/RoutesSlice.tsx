import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IRouteState {
    environment: string
    port: string
}

const routesSlice = createSlice({
    name: "routes",
    initialState: {
        environment: "localhost",
        port: ""
    } as IRouteState,
    reducers: {
        updateEnvironment(state: IRouteState, action: PayloadAction<string>) {
            state.environment = action.payload
        },
        updatePort(state: IRouteState, action: PayloadAction<string>) {
            if (action.payload !== "") {
                state.port = ":" + action.payload
            }
        }
    }
});

export const { updateEnvironment } = routesSlice.actions;
export default routesSlice.reducer;

// Selectors
export const selectEnvironment = (state: { routes: IRouteState }) => state.routes.environment;

