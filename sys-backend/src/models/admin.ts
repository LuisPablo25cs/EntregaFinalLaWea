import { Table, Model, Column, CreatedAt, UpdatedAt, Unique } from "sequelize-typescript";
import { Optional } from "sequelize";
import { table } from "console";
import { Col } from "sequelize/types/utils";

interface AdminAtributes {
    id: number;
    username: string;  
    email: string;
    password: string; 
}

interface AdminsCreationAtributes extends Optional<AdminAtributes, 'id'>{}
@Table({
    tableName: "Admins"
})
export class Admin extends Model<AdminAtributes, AdminsCreationAtributes>{

    @Column 
    username!: string;
    
    @Column
    email!: string; 
    
    @Column
    password!: string;
    
}