import { Application } from "express";
import configurationKeys from "../../config";

const serverConfigurations = (app :Application) => {
    app.listen(configurationKeys.PORT ,() => {
        console.log(`Server listening on Port ${configurationKeys.PORT}`)
    }) 
} 

export default serverConfigurations;