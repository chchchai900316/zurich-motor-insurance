import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @IsNotEmpty()
    @ApiProperty()
    location: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;
}
