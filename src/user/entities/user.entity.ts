import { UserRoleEnum } from "src/enums/user-role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as Id } from 'uuid';
@Entity('user')
export class userEntity 
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
        type:"enum",
        enum:UserRoleEnum,
       default:UserRoleEnum.developer
    })
    roles : string;
    @Column()
    salt:string;
}