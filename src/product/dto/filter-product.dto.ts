import { IsNotEmpty, IsNumber } from "class-validator";

export class FilterProductDto {

    @IsNotEmpty()
    @IsNumber()
    productCode: number;

    location?: string;
}
