import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductNoFoundException } from '../common/exception/ProductNoFoundException';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>
    ) { }

    create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.save(createProductDto);
    }

    async find(productCode: number, location: string): Promise<Product> {
        const productFilter: FilterProductDto = new FilterProductDto();
        if (productCode) productFilter.productCode = productCode
        if (location) productFilter.location = location

        const product = await this.productRepository.findOne({
            where: [productFilter]
        });
        if (!product) throw new ProductNoFoundException(productCode, location)
        return product;
    }

    async update(productCode: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.find(productCode, null);
        Object.assign(product, updateProductDto);

        return this.productRepository.save(product);
    }

    async remove(productCode: number): Promise<Product> {
        const product = await this.find(productCode, null);
        const deleteResult = await this.productRepository.delete(productCode);
        if (deleteResult.affected === 0) throw new ProductNoFoundException(productCode, null)

        return product
    }
}
