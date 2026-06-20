import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ProductType } from './product-type.entity';
import { SaleOrderItem } from './sale-order-item.entity';

@Entity('products')
export class Product {
  @PrimaryColumn({ name: 'product_id_almacen', type: 'integer' })
  productIdAlmacen: number;

  @PrimaryColumn({ name: 'product_id_fabrica', type: 'varchar', length: 255 })
  productIdFabrica: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'producttype_id', type: 'integer' })
  productTypeId: number;

  @ManyToOne(() => ProductType, (pt) => pt.products)
  @JoinColumn({ name: 'producttype_id' })
  productType: ProductType;

  @Column({ name: 'producttype_name', type: 'varchar', length: 255 })
  productTypeName: string;

  @Column({ name: 'price_per_mayor', type: 'numeric', precision: 10, scale: 2 })
  pricePerMayor: number;

  @Column({ name: 'price_per_minor', type: 'numeric', precision: 10, scale: 2 })
  pricePerMinor: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  ubicacion: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @Column({ name: 'is_active', type: 'tinyint', default: true })
  isActive: boolean;

  @Column({ name: 'image_url', type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @Column({ name: 'stock_minimo', type: 'integer', default: 0 })
  stockMinimo: number;

  @Column({ name: 'stock_vencido', type: 'integer', default: 0 })
  stockVencido: number;

  @Column({ name: 'stock_malogrado', type: 'integer', default: 0 })
  stockMalogrado: number;

  @Column({ name: 'stock_roto', type: 'integer', default: 0 })
  stockRoto: number;

  @OneToMany(() => SaleOrderItem, (item) => item.product)
  saleOrderItems: SaleOrderItem[];
}
