const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const config = require('config');
const ServiceError = require('./core/serviceError');
const installRest = require('./rest')
const {initializeData} = require("./data");
const swaggerJsdoc = require('swagger-jsdoc');
const { koaSwagger } = require('koa2-swagger-ui');
const swaggerOptions = require('../swagger.config');
var jwt = require("koa-jwt")
var jwks = require("jwks-rsa")

//const NODE_ENV = config.get('env');
const PORT =  9000 //|| process.env.PORT;
//console.log(NODE_ENV)
const CORS_ORIGINS = ['http://localhost:3000'];
const CORS_MAX_AGE = 3 * 60 * 60;



module.exports = async function createServer() {
    await initializeData();
    const app = new Koa();

    var jwtCheck = jwt({
        secret: jwks.koaJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: 'https://el-jeeveevee.eu.auth0.com/.well-known/jwks.json'
        }),
        audience: 'http://localhost:9000/',
        issuer: 'https://el-jeeveevee.eu.auth0.com/',
        algorithms: ['RS256']
    });
    app.use(jwtCheck)
    console.log("here")



    app.use(
        koaCors({
            origin: (ctx) => {
                if (CORS_ORIGINS.indexOf(ctx.request.header.origin.toString()) !== -1) {
                    return ctx.request.header.origin;
                }
                // Not a valid domain at this point, let's return the first valid as we should return a string
                return CORS_ORIGINS[1];
            },
            allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
            maxAge: CORS_MAX_AGE,
        })
    );
    app.use(bodyParser());

    const spec = swaggerJsdoc(swaggerOptions)
    app.use(
        koaSwagger({
            routePrefix: '/swagger', // host at /swagger instead of default /docs
            specPrefix: '/swagger/spec', // route where the spec is returned
            exposeSpec: true, // expose spec file
            swaggerOptions: {  // passed to SwaggerUi()
                spec,
            },
        }),
    );
    app.use(async (ctx, next) => {
        try {
            await next();
            console.log(ctx)
            if (ctx.status === 404) {
                ctx.body = {
                    code: 'NOT_FOUND',
                    message: `Unknown resource: ${ctx.url}`,
                };
            }
        } catch (error) {
            console.error('Error occured while handling a request', {
                error: (error),
            });

            let statusCode = error.status || 500;
            let errorBody = {
                code: error.code || 'INTERNAL_SERVER_ERROR',
                message: error.message,
                details: error.details || {},
                //stack: NODE_ENV !== 'production' ? error.stack : undefined,
            };

            if (error instanceof ServiceError) {
                if (error.isNotFound) {
                    statusCode = 404;
                }

                if (error.isValidationFailed) {
                    statusCode = 400;
                }

                if (error.isUnauthorized) {
                    statusCode = 401;
                }

                if (error.isForbidden) {
                    statusCode = 403;
                }
            }
            ctx.status = statusCode;
            ctx.body = errorBody;
        }
    });



    await installRest(app);



    return {
        getApp() {
            return app;
        },

        start() {
            return new Promise((resolve) => {
                app.listen(PORT);
                console.info(`🚀 Server listening on http://localhost:9000`);
                resolve()
            })
        },

        async stop() {
            {
                app.removeAllListeners();
                await shutdownData();
                getLogger().info('Goodbye');
            }
        }
    }
}