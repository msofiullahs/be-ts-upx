import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'send_emails'})
export class SendEmail {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    sent_status: number

}
