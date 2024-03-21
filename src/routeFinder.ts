import { API_KEY, SERVER } from "./config";
import { isList, isRecord } from "./object";
import { Route, toRoute } from "./route";

// Interface for the routes that are collected through the response for the appropriate location
export interface RoutesForLocationResp {
    foundRoutes: (routes: Route[]) => void;
    doError: (err: string) => void;
}

// Find the bus routes associated with a given location
export const routesForLocation = (lat: string, lon: string, routesForLocationResp: RoutesForLocationResp): void => {
    const handleRoutesResp = (res: Response): void => {
        doRoutesResp(res, routesForLocationResp);
    };

    const url: string = SERVER + "?key=" + encodeURIComponent(API_KEY) + "&lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon);
    console.log(url);
    fetch(url).then(handleRoutesResp).catch(() => routesForLocationResp.doError(url + " is not valid"));
}

// Retrieve the response containing the bus routes associated with a given location
const doRoutesResp = (res: Response, routesForLocationResp: RoutesForLocationResp): void => {
    const handleRoutesJson = (res: Response): void => {
        doRoutesJson(res, routesForLocationResp);
    };
    
    if (res.status === 200) {
        console.log("200");
        res.json().then(handleRoutesJson).catch(() => routesForLocationResp.doError("200 response is not valid JSON"));
    } else if (res.status === 400) {
        console.log("400");
        res.text()
            .then()
            .catch(() => routesForLocationResp.doError("400 response is not valid JSON"));
    } else {
        console.log("404");
        routesForLocationResp.doError("bad status code: " + res.statusText);
    }
}

// Retrieve the JSON containing information regarding the bus routes associated with a given location
const doRoutesJson = (val: unknown, routesForLocationResp: RoutesForLocationResp): void => {
    if (!isRecord(val)) {
        routesForLocationResp.doError("bad data from /load: not a record");
        return;
    }
    if (!isRecord(val.data)) {
        routesForLocationResp.doError("bad data from /load: not a record");
        return;
    }
    if (!isList(val.data.list)) {
        routesForLocationResp.doError("bad data from /load: not a record");
        return;
    }
    const routes: Route[] = [];
    for (let i = 0; i < val.data.list.length; i++) {
        routes[i] = toRoute(val.data.list[i]);
    }
    routesForLocationResp.foundRoutes(routes);
}