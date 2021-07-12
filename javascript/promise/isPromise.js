function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === "function" || typeof obj === "object") &&
        typeof obj.then === "function" &&
        typeof obj.catch === "function"
    );
}
