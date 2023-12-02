import chalk from "chalk";
import mongoose from "mongoose";
import { dbUrl } from "./config.js";

const connectToDatabase = async() => {
    try{
        mongoose.connect(dbUrl);
        console.log(`${chalk.yellow.italic.bold("'Succeeded To Connect ✔✔'")}`)
    }catch(err){
        console.log(`${chalk.red.bold('ERROR At Database Connection')}, ${err}`)
    }
}

export default connectToDatabase;