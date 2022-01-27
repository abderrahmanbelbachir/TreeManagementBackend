import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeModule } from './node/node.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './node/entities/node.entity';


@Module({
  imports: [NodeModule , TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "nest_test",
    "entities": [Node],
    "synchronize": true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
