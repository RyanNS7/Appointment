import { HttpResponse } from "../httpResponse";

export function created(data: unknown): HttpResponse{
    return {
        body: data,
        statusCode: 201
    }
}

export function ok(data: unknown): HttpResponse{
    return {
        body: data,
        statusCode: 201
    }
}

export function badRequest(error: unknown): HttpResponse {
    return {
        body: {data: error},
        statusCode: 400
    }
}

export function notFound(error: unknown): HttpResponse {
    return {
        body: {data: error},
        statusCode: 404
    }
}

export function internalServerError(error: unknown): HttpResponse {
    return {
        body: {data: error},
        statusCode: 500
    }
}