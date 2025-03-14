import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { SALT_ROUND } from '../../utils/constants.utils';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Unique(['email'])
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ description: 'The unique identifier of the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
  @Column()
  @Index()
  email: string;

  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'The password of the user (hashed)', example: 'password123', writeOnly: true })
  @Column({ select: false })
  password: string;

  @ApiProperty({ description: 'The picture URL of the user', example: 'http://example.com/profile.jpg', nullable: true, required: false })
  @Column({ nullable: true })
  picture: string;

  @ApiProperty({ description: 'The date when the user was created', example: '2025-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the user was last updated', example: '2025-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'The date when the user was deleted (if applicable)', example: '2025-01-01T00:00:00.000Z', nullable: true, required: false })
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  private async hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, SALT_ROUND);
    }
  }
}
