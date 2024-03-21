# OneBusAway_JS_API
This is a JavaScript API for the OneBusAway app. Currently, the API can only be used to find routes at a particular location.

The source code can be found in the "/src" folder:
- "routeFinder.ts" contains the API.
- "route.ts" contains the "Route" type used to store records of routes.
- "routeDisplay.tsx" is a sample application that allows users to try out the API.

In order to use the API:
1) Install React and run the following command:
- npm install --no-audit

2) Add a simple file named config.js with two lines to the "src" folder (or simply rename "config.js.example" as "config.js"):
- export const API_KEY = "<YOUR API_KEY>";
- export const SERVER = "<YOUR SERVER>";
- You can use "TEST" as an API key, but it meet its use limit quickly.
- You can use "https://api.pugetsound.onebusaway.org/api/where/routes-for-location.json" as a reliable server.

3) Extend the "RoutesForLocationResp" interface, found in "routeFinder.ts":
- "foundRoutes" provides a list of Route objects upon a successful call to the server API
- "doError" is called upon an unsuccessful call to the server API that throws an error message.

4) Call the "routesForLocation" function in routeFinder.ts, with the parameters being the latitude, the longitude, and the class implementing the "RoutesForLocationResp" interface.

Example of API usage:
routeDisplay.tsx - a simple react application that collects the latitude and longitude, calls the API, and display the results.
