import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { SendEmail } from "../entity/SendEmail";
import { Not } from "typeorm";
import fetch from "node-fetch";

export class ResendMessage {

    static async send() {
        const mailApi = process.env.MAIL_API;
        const emailRepository = AppDataSource.getRepository(SendEmail);
        const unsentEmails = await emailRepository.find({
            where: {
                sent_status: Not(1)
            }
        });

        unsentEmails.map(async (unsent) => {
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: {id: unsent.user_id}
            });

            const resp = await fetch(mailApi, {
                method: 'POST',
                body: {
                    email: user.email,
                    message: "Hey, " + user.name +" it's your birthday."
                }
            });

            if (resp.status === 200) {
                const email = await emailRepository.findOne({
                    where: {id: unsent.id}
                });

                email.sent_status = 1;
                emailRepository.save(email);
            }
        });

        return 'ok';
    }

}
