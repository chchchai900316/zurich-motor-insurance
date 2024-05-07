import { Controller, Get, Post, Body, Delete, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MandatoryPipe } from './pipes/mandatory.pipe';
import { Product } from './entities/product.entity';
import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
    name: 'role',
    required: true,
    description: 'User role'
})
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Get()
    find(
        @Query('productCode', MandatoryPipe) productCode: number,
        @Query('location', MandatoryPipe) location: string,
    ): Promise<Product> {
        return this.productService.find(productCode, location);
    }

    @Put()
    update(
        @Query('productCode', MandatoryPipe) productCode: number,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        return this.productService.update(productCode, updateProductDto);
    }

    @Delete()
    remove(@Query('productCode', MandatoryPipe) productCode: number): Promise<Product> {
        return this.productService.remove(productCode);
    }
}
