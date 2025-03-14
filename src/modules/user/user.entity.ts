import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Unique(['email'])
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  picture: string;
}
