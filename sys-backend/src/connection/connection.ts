import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/product";
import { Employee } from "../models/employee";
import { Branch } from "../models/branch";
import { Admin } from "../models/admin";

export const connection = new Sequelize({
database: 'sisweb_db',
dialect: "mysql",
username: 'root',
password: '1234',
storage: ':memory:',
models: [
Product, 
Employee, 
Branch, 
Admin
]
});

async function connectionDB(){
try{
await connection.sync();
}catch(e){
console.log(e);
}
} 

export default connectionDB;
