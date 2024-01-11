import * as moment from "moment";
import * as mtz from "moment-timezone";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserProfile } from "../entity/UserProfile";
import fetch from "node-fetch";
import { SendEmail } from "../entity/SendEmail";

export class BirthdayMessage {

    static async send() {
        const mailApi = process.env.MAIL_API;
        const timezones = mtz.tz.names();

        timezones.forEach(async (val) => {
            const nineAm = moment("09:00", "HH:mm").tz(val);
            const currTime = moment().tz(val);
            const dateOnly = moment().tz(val).format("YYYY-MM-DD");

            if (currTime === nineAm) {
                const profileRepository = AppDataSource.getRepository(UserProfile);
                const profiles = await profileRepository.find({
                    where: {
                        location: val,
                        birthday: dateOnly
                    }
                });

                profiles.map(async (profile) => {
                    const userRepository = AppDataSource.getRepository(User);
                    const user = await userRepository.findOne({
                        where: {id: profile.user_id}
                    });

                    const resp = await fetch(mailApi, {
                        method: 'POST',
                        body: {
                            email: user.email,
                            message: "Hey, " + user.name +" it's your birthday."
                        }
                    });

                    const email = new SendEmail();
                    email.user_id = user.id;
                    if (resp.status === 200) {
                        email.sent_status = 1;
                    } else {
                        email.sent_status = 0;
                    }
                    const emailRepository = AppDataSource.getRepository(SendEmail);
                    await emailRepository.save(email);
                })
            }
        });
    }

}
