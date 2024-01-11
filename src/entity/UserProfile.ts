import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'user_profiles'})
export class UserProfile {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    location: string

    @Column({
        type: "date"
    })
    birthday: string

}
