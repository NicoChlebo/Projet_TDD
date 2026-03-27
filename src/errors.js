export class ValidationError extends Error {
    constructor(message, details = {}) {
        super(message);
        this.name = "ValidationError";
        this.status = 400;
        this.details = details;
    }
}

export class ServiceError extends Error {
    constructor(message, cause = null) {
        super(message);
        this.name = "ServiceError";
        this.status = 503;
        this.cause = cause;
    }
}