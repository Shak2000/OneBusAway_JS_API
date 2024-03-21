// Checks if a variable of unknown type is a record
export const isRecord = (val: unknown): val is Record<string, unknown> => {
    return val !== null && typeof val === "object";
};

// Checks if a variable of unknown type is a list
export const isList = (val: unknown): val is any[] => {
    return val !== null && typeof val === "object";
};