// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'TB_USER' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  id_card: string;

  @Column({ length: 100, nullable: true })
  first_name: string;

  @Column({ length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'datetime', nullable: true })
  date_of_birth: Date;

  @Column({ length: 100, nullable: true })
  phone: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 20 })
  role: string;

  @Column({ length: 150 })
  password: string;

  @Column({ length: 200, nullable: true })
  otp: string;

  @Column({ length: 200, nullable: true })
  recover_token: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'tinyint', default: false })
  terms_and_conditions: number;

  @Column({ type: 'tinyint', default: false })
  verified: number;

  @Column({ type: 'tinyint', default: false })
  state: number;

  @Column({ type: 'datetime' })
  created_at: Date;

  @Column({ type: 'datetime' })
  updated_at: Date;
}
