import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { Product } from './infrastructure/persistence/entities/product.entity';
import { ProductType } from './infrastructure/persistence/entities/product-type.entity';

// Repositories
import { TypeOrmProductRepository } from './infrastructure/persistence/repositories/typeorm-product.repository';
import { TypeOrmProductTypeRepository } from './infrastructure/persistence/repositories/typeorm-product-type.repository';

// Use Cases
import { GetCatalogUseCase } from './application/use-cases/get-catalog.use-case';
import { GetProductDetailUseCase } from './application/use-cases/get-product-detail.use-case';
import { GetProductTypesUseCase } from './application/use-cases/get-product-types.use-case';

// Controllers
import { ProductController } from './presentation/controllers/product.controller';
import { ProductTypeController } from './presentation/controllers/product-type.controller';

@Module({
  imports: [
    // 1. Cargamos el archivo .env para que esté disponible en toda la app
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configuramos TypeORM de manera asíncrona usando el ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD') || '',
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/infrastructure/persistence/entities/**/*.entity{.ts,.js}'],
        synchronize: true, // Automáticamente crea las tablas en XAMPP
      }),
    }),

    // 3. Registramos las entidades para su uso en repositorios
    TypeOrmModule.forFeature([Product, ProductType]),
  ],
  controllers: [ProductController, ProductTypeController],
  providers: [
    GetCatalogUseCase,
    GetProductDetailUseCase,
    GetProductTypesUseCase,
    {
      provide: 'IProductRepository',
      useClass: TypeOrmProductRepository,
    },
    {
      provide: 'IProductTypeRepository',
      useClass: TypeOrmProductTypeRepository,
    },
  ],
})
export class AppModule {}