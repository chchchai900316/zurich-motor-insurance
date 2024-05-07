import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
    let controller: ProductController;

    const mockProductService = {
        create: jest.fn(dto => dto),
        find: jest.fn((productCode, location) => {
            return {
                productCode: productCode,
                location: location,
                productDescription: 'Sedan',
                price: 100
            }
        }),
        update: jest.fn((productCode, dto) => {
            return {
                productCode: productCode,
                location: dto.location,
                productDescription: 'Sedan',
                price: dto.price
            }
        }),
        remove: jest.fn(productCode => {
            return {
                productCode: productCode,
                location: 'West Malaysia',
                productDescription: 'Sedan',
                price: 100
            }
        })
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService, {
                provide: ProductService,
                useValue: mockProductService
            }],
        }).compile();

        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a product', () => {
        const dto = {
            productCode: 1,
            location: 'West Malaysia',
            productDescription: 'Sedan',
            price: 100
        }
        expect(controller.create(dto)).toEqual({ ...dto });
        expect(mockProductService.create).toHaveBeenCalledWith(dto)
    })

    it('should find a product', () => {
        const dto = {
            productCode: 1,
            location: 'West Malaysia'
        }
        expect(controller.find(dto.productCode, dto.location)).toEqual({
            ...dto,
            productDescription: expect.any(String),
            price: expect.any(Number)
        });
        expect(mockProductService.find).toHaveBeenCalledWith(dto.productCode, dto.location)
    })

    it('should update a product', () => {
        const dto = {
            productCode: 1,
            location: 'West Malaysia',
            price: 200
        }
        expect(controller.update(dto.productCode, {
            location: dto.location,
            price: dto.price
        })).toEqual({
            ...dto,
            productDescription: expect.any(String)
        });
        expect(mockProductService.update).toHaveBeenCalledWith(dto.productCode, {
            location: dto.location,
            price: dto.price
        })
    })

    it('should remove a product', () => {
        const dto = {
            productCode: 1
        }
        expect(controller.remove(dto.productCode)).toEqual({
            productCode: dto.productCode,
            location: expect.any(String),
            productDescription: expect.any(String),
            price: expect.any(Number)
        });
        expect(mockProductService.remove).toHaveBeenCalledWith(dto.productCode)
    })
});
