import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sport } from './sport.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sport]),
    // Bonus: In-memory cache for GET /sports. Caches for 60s.
    CacheModule.register({ ttl: 60 * 1000 }),
  ],
  controllers: [SportsController],
  providers: [SportsService],
  exports: [SportsService], // Export so other modules can use it
})
export class SportsModule {}