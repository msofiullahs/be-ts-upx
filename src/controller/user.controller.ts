import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserProfile } from "../entity/UserProfile";

export class UserController {

    static async index(req: Request, res: Response) {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        return res.status(200).json({
            data: users,
        }); 
    }

    static async store(req: Request, res: Response) {
        const validations = [];
        const reqBody = req.body;

        if (reqBody.first_name === undefined || (reqBody.first_name !== undefined && reqBody.first_name === '')) {
            validations.push({'first_name': 'this field is required and can\'t be empty'});
        }

        if (reqBody.last_name === undefined || (reqBody.last_name !== undefined && reqBody.last_name === '')) {
            validations.push({'last_name': 'this field is required and can\'t be empty'});
        }

        if (reqBody.email === undefined || (reqBody.email !== undefined && reqBody.email === '')) {
            validations.push({'email': 'this field is required and can\'t be empty'});
        }

        if (reqBody.birthday === undefined || (reqBody.birthday !== undefined && reqBody.birthday === '')) {
            validations.push({'birthday': 'this field is required and can\'t be empty'});
        }

        if (reqBody.location === undefined || (reqBody.location !== undefined && reqBody.location === '')) {
            validations.push({'location': 'this field is required and can\'t be empty'});
        }

        if (validations.length > 0) {
            return res.status(401).json(validations);
        }

        const userRepository = AppDataSource.getRepository(User);
        
        const findByEmail = await userRepository.findOne({
            where: {
                'email': reqBody.email
            }
        });

        if (findByEmail) {
            validations.push({'email': 'inputted email is existing'});
            return res.status(401).json(validations);
        }

        const user = new User();
        user.name = reqBody.first_name + ' ' + reqBody.last_name;
        user.email = reqBody.email;

        await userRepository.save(user);

        const profile = new UserProfile();
        profile.user_id = user.id;
        profile.first_name = reqBody.first_name;
        profile.last_name = reqBody.last_name;
        profile.location = reqBody.location;
        profile.birthday = reqBody.birthday;

        const profileRepository = AppDataSource.getRepository(UserProfile);
        await profileRepository.save(profile);

        return res
            .status(201)
            .json({ message: "User stored successfully", user, profile });
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: Number(id) }
        });

        const profileRepository = AppDataSource.getRepository(UserProfile);
        const profile = await profileRepository.findOne({
            where: { user_id: Number(id) }
        });

        return res
            .status(200)
            .json({ user, profile });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;

        const validations = [];
        const reqBody = req.body;

        if (reqBody.first_name === undefined || (reqBody.first_name !== undefined && reqBody.first_name === '')) {
            validations.push({'first_name': 'this field is required and can\'t be empty'});
        }

        if (reqBody.last_name === undefined || (reqBody.last_name !== undefined && reqBody.last_name === '')) {
            validations.push({'last_name': 'this field is required and can\'t be empty'});
        }

        if (reqBody.email === undefined || (reqBody.email !== undefined && reqBody.email === '')) {
            validations.push({'email': 'this field is required and can\'t be empty'});
        }

        if (reqBody.birthday === undefined || (reqBody.birthday !== undefined && reqBody.birthday === '')) {
            validations.push({'birthday': 'this field is required and can\'t be empty'});
        }

        if (reqBody.location === undefined || (reqBody.location !== undefined && reqBody.location === '')) {
            validations.push({'location': 'this field is required and can\'t be empty'});
        }

        if (validations.length > 0) {
            return res.status(401).json(validations);
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: Number(id) }
        });
        user.name = reqBody.first_name + ' ' + reqBody.last_name;
        user.email = reqBody.email;
        await userRepository.save(user);

        const profileRepository = AppDataSource.getRepository(UserProfile);
        const profile = await profileRepository.findOne({
            where: { user_id: Number(id) }
        });
        profile.first_name = reqBody.first_name;
        profile.last_name = reqBody.last_name;
        profile.location = reqBody.location;
        profile.birthday = reqBody.birthday;
        await profileRepository.save(profile);

        return res
            .status(201)
            .json({ message: "User updated successfully", user, profile });
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: Number(id) }
        });
        await userRepository.remove(user);

        const profileRepository = AppDataSource.getRepository(UserProfile);
        const profile = await profileRepository.findOne({
            where: { user_id: Number(id) }
        });
        await profileRepository.remove(profile);

        return res
            .status(201)
            .json({ message: "User removed successfully" });
    }

}