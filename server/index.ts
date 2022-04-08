import express, { Request, Response } from 'express'
import getApiRoutes from './api';
import path from "path";
import cors, { CorsOptions } from 'cors';

const app = express();
const http = require('http').Server(app);

const logger = (req: Request, res: Response, next: Function) => {
    console.log(req.method.toUpperCase() + ' ' + req.path);
    next();
};

app.use(express.static(path.join(__dirname, "..", "public")));

// Parse request body
app.use(express.json());

const corsOptions: CorsOptions = {
    origin: ["http://localhost:8080"],
};

app.use(cors(corsOptions));

app.use('/api', logger, getApiRoutes());

app.use((_, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"))
});
const port = process.env.PORT || 3001
http.listen(port, function () {
    console.log(`listening on port ${port}`);
});