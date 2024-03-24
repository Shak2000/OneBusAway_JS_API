import * as assert from "assert";
import { Route, toRoute } from "./route";
import { RoutesForLocationResp, routesForLocation } from "./routeFinder";

class RouteResponseFinder implements RoutesForLocationResp {
    foundRoutes(routes: Route[]): void {
        console.log("Found the routes");
        for (let i = 0; i < routes.length; i++) {
            console.log(routes[i]);
        }
    }

    doError(err: string): void {
        console.log(err);
    }
}

// Unit test for the route finder
describe("route_finder_test", function() {
    const routeResponseFinder = new RouteResponseFinder();

    it("routes_for_location", function() {
        routesForLocation("47.653435", "-122.305641", routeResponseFinder);
    });
});


// Unit test for the route type
describe("route_test", function() {
    const route_json = {
        id: '40_100479',
        shortName: '1 Line',
        longName: 'Northgate - Angle Lake',
        description: '1 Line runs between Northgate Station and Angle Lake Station seven days a week',
        type: 0,
        url: 'https://www.soundtransit.org/1',
        color: '28813F',
        textColor: 'FFFFFF',
        agencyId: '40'
    }

    it("route_test", function() {
        const route: Route = toRoute(route_json);
        assert.deepEqual(route, route_json);
    });
});