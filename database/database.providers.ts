import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'src/transaction/entities/transaction.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'database',
        port: 3306,
        username: 'db_user',
        password: 'db_password',
        database: 'transac_db',
      });
      sequelize.addModels([Transaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];