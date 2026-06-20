import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SaleOrder } from './sale-order.entity';
import { Product } from './product.entity';

@Entity('sale_order_items')
export class SaleOrderItem {
  @PrimaryGeneratedColumn({ name: 'id_sale_order_item' })
  idSaleOrderItem: number;

  @Column({ name: 'id_sale_order', type: 'integer' })
  idSaleOrder: number;

  @ManyToOne(() => SaleOrder, (so) => so.items)
  @JoinColumn({ name: 'id_sale_order' })
  saleOrder: SaleOrder;

  @Column({ name: 'product_id_almacen', type: 'integer' })
  productIdAlmacen: number;

  @Column({ name: 'product_id_fabrica', type: 'varchar', length: 255 })
  productIdFabrica: string;

  @ManyToOne(() => Product, (p) => p.saleOrderItems)
  @JoinColumn([
    { name: 'product_id_almacen', referencedColumnName: 'productIdAlmacen' },
    { name: 'product_id_fabrica', referencedColumnName: 'productIdFabrica' }
  ])
  product: Product;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ name: 'unit_price', type: 'numeric', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  subtotal: number;
}
