import express from 'express';
import cors from 'cors'


import {  captureScreenshot } from './modules/capture.js'

/**
 * Express Config
 */
const app = express();
app.use(express.json());
app.use(cors({
    allRoutes: true,
    origin: '*',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    headers: 'content-type'
}))
app.use(express.urlencoded({ extended: true }))


app.get("/captureUrl", captureScreenshot);

/**
 * Starts App
 */
const start = async () => {
    try {
        app.listen(4000, () => console.log("Server started on port 3000"));        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
