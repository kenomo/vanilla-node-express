import fs from "fs-extra";
import logger from "jet-logger";


try {
    // Remove current build
    fs.removeSync("./build/");

    //...

} catch (err) {
    logger.err(err);
}
