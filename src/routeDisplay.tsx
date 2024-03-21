import React, { Component } from "react";
import { RoutesForLocationResp, routesForLocation } from "./routeFinder";
import { Route } from "./route";

type RouteProps = {

}

type RouteState = {
    latitude: string;
    longitude: string;
    localRoutes: Route[];
    errorMessage: string;
}

export class RouteDisplay extends Component<RouteProps, RouteState> implements RoutesForLocationResp {
    constructor(props: RouteProps) {
        super(props);
        this.state = {latitude: "", longitude: "", localRoutes: [], errorMessage: ""};
    }

    render = (): JSX.Element => {
        return(
            <div>
                <h1>Sample Application for Finding Bus Routes</h1>
                <p>Latitude: <input onChange={this.doLatitutdeChange} value={this.state.latitude}></input></p>
                <p>Longitude: <input onChange={this.doLongitudeChange} value={this.state.longitude}></input></p>
                <button onClick={this.doOnNewClick}>Search</button>
                <table>
                    {this.renderRoutes()}
                </table>
                <p>{this.state.errorMessage}</p>
            </div>
        )
    }

    renderRoutes = (): JSX.Element[] => {
        if (this.state.localRoutes.length === 0) {
            return [];
        } else {
            const routeTable: JSX.Element[] = [];
            routeTable.push(<thead>
                <tr>
                    <th>ID</th>
                    <th>Short Name</th>
                    <th>Long Name</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Agency ID</th>
                </tr>
            </thead>);
            const routeBody: JSX.Element[] = [];
            for (let i = 0; i < this.state.localRoutes.length; i++) {
                routeBody.push(<tr>
                    <td>{this.state.localRoutes[i].id}</td>
                    <td><a href={this.state.localRoutes[i].url}>{this.state.localRoutes[i].shortName}</a></td>
                    <td>{this.state.localRoutes[i].longName}</td>
                    <td>{this.state.localRoutes[i].description}</td>
                    <td>{this.state.localRoutes[i].type}</td>
                    <td>{this.state.localRoutes[i].agencyId}</td>
                </tr>);
            }
            routeTable.push(<tbody>{routeBody}</tbody>)
            return routeTable;
        }
    }

    doLatitutdeChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({latitude: evt.target.value});
    }

    doLongitudeChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({longitude: evt.target.value});
    }

    doOnNewClick = (): void => {
        if (this.state.latitude.length > 0 && this.state.longitude.length > 0 && !isNaN(Number(this.state.latitude)) && !isNaN(Number(this.state.longitude))
            && Number(this.state.latitude) >= -90 && Number(this.state.latitude) <= 90 && Number(this.state.longitude) >= -180
            && Number(this.state.longitude) <= 180) {
            this.setState({errorMessage: ""});
            routesForLocation(this.state.latitude, this.state.longitude, this);
        } else {
            this.setState({errorMessage: "Error: The latitude must be a number from -90 to 90, and the longitude must be a number from -180 to 180."});
        }
    }

    foundRoutes(routes: Route[]): void {
        this.setState({localRoutes: routes, errorMessage: ""});
    }

    doError(err: string): void {
        this.setState({errorMessage: err});
    }
}