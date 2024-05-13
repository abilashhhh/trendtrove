"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (app) => {
    app.get('/', (req, res) => {
        res.send("Hello World");
    });
};
exports.default = routes;
