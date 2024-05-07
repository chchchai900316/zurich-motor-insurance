import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
        super({
            status: HttpStatus.FORBIDDEN,
            error: 'Forbidden',
            message: 'Forbidden Access'
        }, HttpStatus.FORBIDDEN);
    }
}