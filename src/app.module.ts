// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SportsModule } from './sports/sports.module';
import { MembersModule } from './members/members.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:rmahbR2hhMBoafym@db.ftlicwygiqvptdktuomf.supabase.co:5432/postgres',
      autoLoadEntities: true, 
      synchronize: false, // We created the tables manually
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    SportsModule,
    MembersModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}