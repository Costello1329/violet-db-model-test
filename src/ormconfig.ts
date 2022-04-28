import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";


const config: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'db',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
}

export default config;
