import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/database.config';
import { DatabaseModule } from './database/database.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig], envFilePath: ['.env.local', '.env'] }),
    DatabaseModule,
    CatalogModule,
  ],
})
export class AppModule {}
