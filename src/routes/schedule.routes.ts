import * as express from "express";
import { hourlySchedule, minutelySchedule } from "../job/scheduler";

const Router = express.Router();

Router.get("/start-scheduler", async (req, res) => {
    minutelySchedule.start();
    hourlySchedule.start();

    return res.json({ message: 'OK' });
});

Router.get("/stop-scheduler", async (req, res) => {
    minutelySchedule.stop();
    hourlySchedule.stop();

    return res.json({ message: 'OK' });
});

export { Router as scheduleRoute };
