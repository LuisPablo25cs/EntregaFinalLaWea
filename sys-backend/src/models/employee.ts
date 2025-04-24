import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, PrimaryKey, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { table } from 'console';
import { Branch } from './branch';

interface EmployeeAtributes {
    id: number; 
    firstName: string; 
    lastName: string; 
    rol: string; 
    sucursal: string; 
}

interface EmployeeCreationAtributes extends  Optional<EmployeeAtributes, 'id'>{}
@Table({
    tableName: "Employees"    
})
export class Employee extends Model<EmployeeAtributes, EmployeeCreationAtributes>{

    @Column
    firstName!: string; 

    @Column
    lastName!: string; 

    @Column
    rol!: string;

    @Column
    sucursal!: string; 

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @ForeignKey(()=> Branch)
    @Column
    branchId!: number; 

    @BelongsTo(() => Branch)
    branch!: Branch; 


}