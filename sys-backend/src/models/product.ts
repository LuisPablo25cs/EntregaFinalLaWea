import {Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Optional} from 'sequelize';
import { Branch } from './branch';
interface ProductAttributes{
  id: number;
  title: string;
  description: string;
  price: number ;
  discountPercentage: number ;
  rating: number ;
  stock: number ;
  imageURL: string; 
  category: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'>{}

@Table ({
  tableName: "Products"
})
export class Product extends Model<ProductAttributes, ProductCreationAttributes>{


   @Column
   title!: string;

   @Column({
      type: DataType.STRING
   })
   description?: string;

   @Column
   price!: number;

   @Column
   discountPercentage!: number;

   @Column
   rating!: number;

   @Column
   stock!: number;

   @Column
   imageURL?: string; 

   @Column
   category?: string; 

   @CreatedAt
   @Column
   createdAt!: Date;

   @UpdatedAt
   @Column
   updatedAt!: Date;

   @ForeignKey(() => Branch)
   @Column
   branchId!: number; 

   @BelongsTo(() => Branch)
   branch!: Branch; 
  }
