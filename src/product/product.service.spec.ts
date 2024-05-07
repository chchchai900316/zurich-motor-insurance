import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductNoFoundException } from '../common/exception/ProductNoFoundException';

describe('ProductService', () => {
    let service: ProductService;

    const mockProductRepository = {
        save: jest.fn().mockImplementation(dto => Promise.resolve({ ...dto })),
        findOne: jest.fn().mockImplementation(({ where: [{ productCode, location }] }) => Promise.resolve({
            productCode,
            location: location || 'West Malaysia',
            productDescription: 'Sedan',
            price: 100
        })),
        delete: jest.fn().mockImplementation(productCode => Promise.resolve({ raw: [], affected: 1 }))
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService, {
                provide: getRepositoryToken(Product),
                useValue: mockProductRepository
            }],
        }).compile();

        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new product and return it', async () => {
        const dto = {
            productCode: 1,
            location: 'West Malaysia',
            productDescription: 'Sedan',
            price: 100
        }
        expect(await service.create(dto)).toEqual({ ...dto });
        expect(mockProductRepository.save).toHaveBeenCalledWith(dto);
    })

    it('should return ProductNoFoundException when product is not found', async () => {
        const dto = {
            productCode: 1,
            location: 'West Malaysia'
        }

        mockProductRepository.findOne.mockReturnValueOnce(null);
        try {
            await service.find(dto.productCode, dto.location);
        } catch (e) {
            expect(e).toBeInstanceOf(ProductNoFoundException);
        }
        expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: [{ ...dto }] });
    })

    it('should find a product by product code and location', async () => {
        const dto = {
            productCode: 1,
            location: 'West Malaysia'
        }
        expect(await service.find(dto.productCode, dto.location)).toEqual({
            ...dto,
            productDescription: expect.any(String),
            price: expect.any(Number)
        });
        expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: [{ ...dto }] });
    })

    it('should update a product and return it', async () => {
        const dto = {
            productCode: 1
        }
        const updateDto = {
            location: 'East Malaysia',
            price: 200
        }
        expect(await service.update(dto.productCode, updateDto)).toEqual({
            ...dto,
            ...updateDto,
            productDescription: expect.any(String)
        });
        expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: [{ ...dto }] });
        expect(mockProductRepository.save).toHaveBeenCalledWith({ ...dto, ...updateDto, productDescription: expect.any(String) });
    })

    it('should remove a product and return it', async () => {
        const dto = {
            productCode: 1
        }
        expect(await service.remove(dto.productCode)).toEqual({
            ...dto,
            productDescription: expect.any(String),
            location: expect.any(String),
            price: expect.any(Number)
        });
        expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: [{ ...dto }] });
        expect(mockProductRepository.delete).toHaveBeenCalledWith(dto.productCode);
    })

    it('should return ProductNoFoundException when no product affected', async () => {
        const dto = {
            productCode: 1
        }

        mockProductRepository.delete.mockReturnValueOnce({ raw: [], affected: 0 });
        try {
            await service.remove(dto.productCode);
        } catch (e) {
            expect(e).toBeInstanceOf(ProductNoFoundException);
        }
        expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: [{ ...dto }] });
        expect(mockProductRepository.delete).toHaveBeenCalledWith(dto.productCode);
    })
});
