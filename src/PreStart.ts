import dotenv from "dotenv";
import commandLineArgs from "command-line-args";
import logger from "jet-logger";


// Setup command line options.
const options = commandLineArgs([
    {
        name: "env",
        alias: "e",
        defaultValue: "development",
        type: String
    }
]);

// Load env file.
const loadEnvFile = function (file: string) {
    const { error } = dotenv.config({
        path: file,
        override: true
    });

    if (error) {
        logger.err(error);
    }
};

loadEnvFile(`./env/${options.env as string}.template.env`);
loadEnvFile(`./env/${options.env as string}.env`);


