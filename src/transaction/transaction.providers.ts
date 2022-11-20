import { Transaction } from "./entities/transaction.entity";

export const transactiobProviders = [
    {
        provide: 'TRANSACTION_REPOSITORY',
        useValue: Transaction,
    }
]