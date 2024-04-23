import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConnectionConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  host: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  database: string;
}
