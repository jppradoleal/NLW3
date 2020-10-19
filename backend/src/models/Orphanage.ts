import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import Image from './Image';
import User from './User';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;
    
    @Column()
    whatsapp: number;
    
    @Column()
    approved: boolean;

    @OneToMany(() => Image, image => image.orphanage, { 
        cascade: ['remove', 'update'] 
    })
    @JoinColumn({ name : 'orphanage_id' })
    images: Image[];


    @ManyToOne(() => User, user => user.orphanages)
    @JoinColumn({ name: 'user_id' })
    user: User;
}