import * as core from "express-serve-static-core";
import session from "express-session";
import { createClient } from "redis";
import logger from "jet-logger";
import assert from "assert";
import connectRedis from "connect-redis";


declare module "express-session" {
    interface SessionData {
        identifier: string,
        timestamp: number
    }
}


const Session = (app: core.Express) => {

    assert(process.env.REDIS_PORT);
    assert(process.env.REDIS_URL);
    assert(process.env.REDIS_SECRET);

    assert(process.env.SESSION_COOKIE_NAME);
    assert(process.env.SESSION_COOKIE_AGE);
    assert(process.env.SESSION_SECRET_A);
    assert(process.env.SESSION_SECRET_B);

    if (app.get("env") === "production") {
        app.set("trust proxy", 1); // trust proxy
    }

    const RedisStore = connectRedis(session);
    const redisClient = createClient({
        socket: {
            host: process.env.REDIS_URL,
            port: parseInt(process.env.REDIS_PORT) || 6379
        },
        password: process.env.REDIS_SECRET,
        legacyMode: true
    });

    redisClient.connect().catch(console.error);
    redisClient.on("ready", () => {
        logger.info("Connected to Redis Store!");
    });

    app.use(session({
        secret: [
            process.env.SESSION_SECRET_A,
            process.env.SESSION_SECRET_B
        ],
        name: process.env.SESSION_COOKIE_NAME,

        saveUninitialized: false,
        resave: false,
        proxy: true,
        cookie: {
            //httpOnly: true, // see https://www.npmjs.com/package/express-session
            //sameSite: false, // see https://www.npmjs.com/package/express-session
            maxAge: parseInt(process.env.SESSION_COOKIE_AGE),
            secure: app.get("env") === "production"
        },
        store: new RedisStore({
            client: redisClient
        })
    }));

}
export default Session;