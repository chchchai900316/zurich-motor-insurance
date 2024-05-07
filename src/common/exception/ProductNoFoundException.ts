import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductNoFoundException extends HttpException {
    constructor(productCode: Number, location: String) {
        super({
            status: HttpStatus.NOT_FOUND,
            error: 'Product not found',
            message: `Product with code '${productCode}'${location ? ` and location '${location}'` : ''} not found`
        }, HttpStatus.NOT_FOUND);
    }
}