import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('PRODUCT')
export class Product extends BaseEntity {
    @PrimaryColumn({
        type: 'integer',
    })
    productCode: number;

    @Column({
        type: 'varchar',
    })
    location: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    productDescription: string;

    @Column({
        type: 'integer',
    })
    price: number;
}