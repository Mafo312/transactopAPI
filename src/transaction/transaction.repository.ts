import { Repository } from 'typeorm';
import { EntityRepository } from "typeorm/decorator/EntityRepository";
import { Transaction } from "./entities/transaction.entity";


@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction>{}
