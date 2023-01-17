import { UserRoleEnum } from "src/enums/user-role.enum";
import { TimestampEntites } from "src/timestamp/timestamp.entity";
import { userEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { v4 as Id } from 'uuid';
@Entity('recruiters')
export class recruiterEntity extends TimestampEntites
{   @PrimaryGeneratedColumn()
    id = Id();
    @Column({unique:true})
    email:string;
    @Column()
    username: string;
    @Column()
    lastname: string;
    @Column()
    password: string;
    @Column({
        /* type:"enum",
         enum:UserRoleEnum,*/
       default:"Recruiter"
     })
     roles : string ;
    @Column()
    salt:string;

    @OneToMany(
        type =>recruiterEntity,
        (user)=>user.developers
    )
   developers : userEntity[];
}