// src/swagger/index.ts
import { OpenAPIV3 } from 'openapi-types';

export interface SwaggerRouteEntry {
    path: string;
    method: string;
    summary: string;
    description?: string;
    tags?: string[];
    responses: Record<
        string,
        {
            description: string;
            headers?: Record<string, OpenAPIV3.HeaderObject | OpenAPIV3.ReferenceObject>;
            content?: {
                [media: string]: OpenAPIV3.MediaTypeObject;
            };
            links?: Record<string, OpenAPIV3.LinkObject | OpenAPIV3.ReferenceObject>;
        }
    >;
    parameters?: OpenAPIV3.ParameterObject[];
    requestBody?: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject;
    operationId?: string;
    deprecated?: boolean;
    security?: OpenAPIV3.SecurityRequirementObject[];
}

export class CustomSwagger {
    private routes: SwaggerRouteEntry[] = [];

    constructor(
        readonly _title = 'API Dokumentation',
        readonly _version = '1.0.0',
        readonly _description = 'Automatisch generierte API-Doku',
    ) {}

    public addRoutes(routes: SwaggerRouteEntry[]): void {
        this.routes.push(...routes);
    }

    public build(): OpenAPIV3.Document {
        const paths: OpenAPIV3.PathsObject = {};

        for (const route of this.routes) {
            const cleanPath = route.path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');
            if (!paths[cleanPath]) paths[cleanPath] = {};

            (paths[cleanPath] as any)[route.method] = {
                summary: route.summary,
                description: route.description,
                tags: route.tags,
                responses: route.responses,
                parameters: route.parameters,
                requestBody: route.requestBody,
            };
        }

        return {
            openapi: '3.0.0',
            info: {
                title: this._title,
                version: this._version,
                description: this._description,
            },
            paths,
        };
    }
}

export default CustomSwagger;

export const standardErrorResponse = {
    description: 'Internal Server Error',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    status: { type: 'string', example: 'error' },
                    message: {
                        type: 'string',
                        example: 'An unexpected error occurred. On Route: /tools/:id',
                    },
                    code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
                },
                required: ['status', 'message', 'code'],
            },
        },
    },
};
