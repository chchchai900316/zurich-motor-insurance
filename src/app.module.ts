import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RoleMiddleware } from './middleware/role.middleware';

@Module({
    imports: [ProductModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RoleMiddleware).forRoutes('product');
    }
}