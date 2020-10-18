import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import OrphanageView from '../views/orphanages_view';

import Orphanage from '../models/Orphanage';
import User from '../models/User';

export default {
    async approveOrphanage(req: Request, res: Response) {
        const { orphanage_id } = req.body;

        const orphanageRepository = getRepository(Orphanage);
        const userRepository = getRepository(User);

        const orphanage = await orphanageRepository.findOneOrFail({ id: orphanage_id });
        const user = await userRepository.findOneOrFail({ email: req.user.email });

        await orphanageRepository.update(orphanage, { approved: true, user: user });

        return res.status(200).json({...orphanage, approved: true, });
    },

    async index(req: Request, res: Response) {
      const orphanagesRepository = getRepository(Orphanage);

      const orphanages = await orphanagesRepository.find({
          relations: ['images', 'user'],
          where: {
              approved: false
          }
      },);
      
      return res.json(OrphanageView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images', 'user'],
            where: {
                approved: false
            }
        });
        
        return res.json(OrphanageView.render(orphanage));
    },
}