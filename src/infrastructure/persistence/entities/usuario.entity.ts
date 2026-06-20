import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Rol } from './rol.entity';
import { SaleOrder } from './sale-order.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  idUsuario: number;

  @Column({ name: 'id_rol', type: 'integer' })
  idRol: number;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @Column({ type: 'tinyint', default: true })
  estado: boolean;

  @Column({ name: 'ultimo_login', type: 'datetime', nullable: true })
  ultimoLogin: Date;

  @Column({ name: 'intentos_fallidos', type: 'integer', default: 0 })
  intentosFallidos: number;

  @Column({ name: 'bloqueado_hasta', type: 'datetime', nullable: true })
  bloqueadoHasta: Date;

  @Column({ name: 'usa_2fa', type: 'tinyint', default: false })
  usa2fa: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255 })
  nombres: string;

  @Column({ type: 'varchar', length: 255 })
  apellidos: string;

  @Column({ type: 'varchar', length: 255 })
  correo: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefono: string;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  fechaNacimiento: Date;

  @Column({ name: 'totp_secret', type: 'varchar', length: 255, nullable: true })
  totpSecret: string;

  @Column({ type: 'integer', nullable: true })
  edad: number;

  @Column({ name: 'refresh_token', type: 'varchar', length: 255, nullable: true })
  refreshToken: string;

  @OneToMany(() => SaleOrder, (saleOrder) => saleOrder.usuarioVendedor)
  saleOrders: SaleOrder[];
}
