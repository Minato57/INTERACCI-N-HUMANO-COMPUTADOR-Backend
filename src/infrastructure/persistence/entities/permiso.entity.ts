import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { Rol } from './rol.entity';

@Entity('permisos')
export class Permiso {
  @PrimaryGeneratedColumn({ name: 'id_permiso' })
  idPermiso: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @ManyToMany(() => Rol, (rol) => rol.permisos)
  roles: Rol[];
}
