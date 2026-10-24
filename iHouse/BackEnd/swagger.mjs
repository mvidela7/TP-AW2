
import swaggerJsdoc from "swagger-jsdoc";

const opciones = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API iHouse",
            version: "1.0.0",
            description: "API para administrar productos de iHouse"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./rutas/*.mjs"]
};

const swaggerSpec = swaggerJsdoc(opciones);

export default swaggerSpec;
