import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { SaleOrderItem } from './sale-order-item.entity';

@Entity('sale_orders')
export class SaleOrder {
  @PrimaryGeneratedColumn({ name: 'id_sale_order' })
  idSaleOrder: number;

  @Column({ name: 'customer_name', type: 'varchar', length: 255 })
  customerName: string;

  @Column({ name: 'customer_document', type: 'varchar', length: 255, nullable: true })
  customerDocument: string;

  @Column({ name: 'id_user_seller', type: 'integer' })
  idUserSeller: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.saleOrders)
  @JoinColumn({ name: 'id_user_seller' })
  usuarioVendedor: Usuario;

  @Column({ type: 'varchar', length: 50, default: 'PENDIENTE' })
  status: string;

  @Column({ name: 'total_amount', type: 'numeric', precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => SaleOrderItem, (item) => item.saleOrder)
  items: SaleOrderItem[];
}
