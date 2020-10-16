import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import OrphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';
import User from '../models/User';

declare module 'express-serve-static-core' {
    interface Request {
      user: {
        name:string;
        email: string;
      }
    }
}

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images', 'user']
        });
        
        return res.json(OrphanageView.renderMany(orphanages));
    },
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images', 'user']
        });
        
        return res.json(OrphanageView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;

        
        const orphanagesRepository = getRepository(Orphanage);
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ email: req.user.email });

        const user_id = user?.id;

        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === true,
            user_id: Number(user_id),
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            user_id: Yup.number().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
        
        return res.status(201).json(orphanage);
    }
};