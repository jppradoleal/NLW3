import Orphanage from '../models/Orphanage';
import User from '../models/User';
import ImagesView from './images_view';

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            whatsapp: orphanage.whatsapp,
            user: {
                id: orphanage.user?.id,
                name: orphanage.user?.name,
                email: orphanage.user?.email,
            },
            images: ImagesView.renderMany(orphanage.images),
        }
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}