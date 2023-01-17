import { UserRoleEnum } from "src/enums/user-role.enum";
import { recruiterEntity } from "src/recruiter/entities/recruiter.entity";
import { TimestampEntites } from "src/timestamp/timestamp.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { v4 as Id } from 'uuid';
@Entity('developers')
export class userEntity extends TimestampEntites
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
      default:"Developer"
    })
    roles : string ;
    @Column()
    salt:string;
    @ManyToOne(
        type => recruiterEntity,
        (recruiter)=>recruiter.developers
    )
    recruiter : recruiterEntity;

}