import { Application } from "express";

const routes = (app: Application) => {
    app.get('/', (req, res) => {
        res.send("Hello World");
    });
};

export default routes;
