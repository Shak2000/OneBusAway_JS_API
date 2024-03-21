import { isRecord } from "./object";

// Bus route for OneBusAway
export type Route = {
    readonly id: string;
    readonly shortName: string;
    readonly longName: string;
    readonly description: string;
    readonly type: number;
    readonly url: string;
    readonly color: string;
    readonly textColor: string;
    readonly agencyId: string;
}

// Converts a generic record into a bus route for OneBusAway if possible
export const toRoute = (val: unknown): Route => {
    if (!isRecord(val) || typeof val.id !== "string" || typeof val.shortName !== "string" || typeof val.longName !== "string"
        || typeof val.description !== "string" || typeof val.type !== "number" || typeof val.url !== "string" || typeof val.color !== "string"
        || typeof val.textColor !== "string" || typeof val.agencyId !== "string") {
        throw new Error("wrong types");
    }
    const route: Route = {id: val.id, shortName: val.shortName, longName: val.longName, description: val.description, type: val.type, url: val.url,
                          color: val.color, textColor: val.textColor, agencyId: val.agencyId};
    return route;
}