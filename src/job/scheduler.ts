import { schedule, ScheduleOptions } from "node-cron";
import { BirthdayMessage } from "./BirthdayMessage";
import { ResendMessage } from "./ResendMessage";

const scheduleOptions: ScheduleOptions = {
    scheduled: false,
    timezone: process.env.MAIN_TZ,
    name: 'send-email',
    recoverMissedExecutions: true,
};

const birthdayAct = async () => {
    await BirthdayMessage.send();
}

const resendAct = async () => {
    await ResendMessage.send();
}

const minutelySchedule = schedule('* * * * *', birthdayAct, scheduleOptions);
const hourlySchedule = schedule('0 * * * *', resendAct, scheduleOptions);

export { minutelySchedule, hourlySchedule };
