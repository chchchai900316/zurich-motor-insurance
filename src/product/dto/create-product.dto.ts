import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    productCode: number;

    @ApiProperty({
        required: false,
    })
    productDescription: string;

    @IsNotEmpty()
    @ApiProperty()
    location: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;
}
