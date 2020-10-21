import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';

import User from '../models/User';

export default {
    async create(req: Request, res: Response) {
        const userRepository = getRepository(User);

        const { name, email, password } = req.body;

        const userExists = await userRepository.findOne({ email })

        if(userExists) {
            let err = new Yup.ValidationError([], "User creation", "user");
            err.inner = [new Yup.ValidationError("User already exists", null, "email")];
            throw err;
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const data = {
            name,
            email,
            password: hashedPassword
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const user = userRepository.create(data);

        await userRepository.save(user);

        return res.status(201).json('User created');
    }
};