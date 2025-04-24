import { Table, Model, Column, CreatedAt, UpdatedAt, HasMany, ForeignKey } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Product } from "./product";
import { Employee } from "./employee";



interface BranchAtributes {
    id: number;
    location: string;
}

interface BranchCreationAtributes extends Optional<BranchAtributes, 'id'>{}
@Table({
    tableName: "Branches"
})
export class Branch extends Model<BranchAtributes, BranchCreationAtributes>{
    @Column
    location!: string; 

    @HasMany(() => Product)
    products?:Product[]; 

    @HasMany(() => Employee)
    employees?: Employee[];

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}


