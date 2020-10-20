import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import OrphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';

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
            relations: ['images', 'user'],
            where: {
                approved: true
            }
        });
        
        return res.json(OrphanageView.renderMany(orphanages));
    },
    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id , {
            relations: ['images', 'user'],
            where: {
                approved: true
            }
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
            whatsapp,
            open_on_weekends
        } = req.body;

        
        const orphanagesRepository = getRepository(Orphanage);

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
            whatsapp,
            approved: false,
            open_on_weekends: open_on_weekends === true,
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
            whatsapp: Yup.number().required(),
            approved: Yup.boolean().required(),
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
    },

    async update(req: Request, res: Response) {
        const {
            id,
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            whatsapp,
            open_on_weekends
        } = req.body;

        const orphanagesRepository = getRepository(Orphanage);

        const data = {
            id: Number(id),
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            whatsapp,
            approved: true,
            open_on_weekends: open_on_weekends === true,
        }

        const schema = Yup.object().shape({
            id: Yup.number().required(),
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            whatsapp: Yup.number().required(),
            approved: Yup.boolean().required(),
        });

        await schema.validate(data, {
            abortEarly: false
        });

        await orphanagesRepository.save(data);

        return res.json(data);
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        await orphanagesRepository.delete({ id: Number(id) });

        return res.json({message: 'Orphanage deleted'});
    }
};