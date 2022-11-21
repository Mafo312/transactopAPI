import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'src/transaction/entities/transaction.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'toor',
        database: 'transaction',
      });
      sequelize.addModels([Transaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
