import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';


@Table
export class Transaction extends Model {
  @Column
  value: number;

  @Column
  timestamp: number;

  @Column
  receiver: string;

  @Column({defaultValue: false})
  confirmed: boolean; 

  @Column
  sender: string 

  @Column PrimaryKey: true
  id: string 
}