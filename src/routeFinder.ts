import { isList, isRecord } from "./object";
import { Route, toRoute } from "./route";

// Interface for the routes that are collected through the response for the appropriate location
export interface RoutesForLocationResp {
    foundRoutes: (routes: Route[]) => void;
    doError: (err: string) => void;
}

// Class for finding the routes near the appropriate location
export class RouteFinder {
    key: string;
    server: string;

    // key: the API key
    // server: the server containing the OneBusAway API
    constructor(key: string, server: string) {
        this.key = key;
        this.server = server + "/api/where/routes-for-location.json";
    }

    // Find the bus routes associated with a given location
    routesForLocation = (lat: string, lon: string, routesForLocationResp: RoutesForLocationResp): void => {
        const handleRoutesResp = (res: Response): void => {
            this.doRoutesResp(res, routesForLocationResp);
        };

        const url: string = this.server + "?key=" + encodeURIComponent(this.key) + "&lat=" + encodeURIComponent(lat) + "&lon=" + encodeURIComponent(lon);
        console.log(url);
        fetch(url).then(handleRoutesResp).catch(() => routesForLocationResp.doError(url + " is not valid"));
    }

    // Retrieve the response containing the bus routes associated with a given location
    doRoutesResp = (res: Response, routesForLocationResp: RoutesForLocationResp): void => {
        const handleRoutesJson = (res: Response): void => {
            this.doRoutesJson(res, routesForLocationResp);
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
    doRoutesJson = (val: unknown, routesForLocationResp: RoutesForLocationResp): void => {
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
}