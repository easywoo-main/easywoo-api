import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionsType } from '../questionsType.enum';

@Entity({ name: 'questionnaires' })
export class Questionnaire extends BaseEntity {
  @ApiProperty({ description: 'The unique identifier of the quiz', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The step number in the quiz', example: 1 })
  @Column({ type: 'int' })
  step: number;

  @ApiProperty({ description: 'The question text', example: 'What is the capital of France?' })
  @Column({ type: 'text' })
  question: string;

  @ApiProperty({ description: 'Possible answers to the question', example: '["Paris", "Berlin", "Madrid"]' })
  @Column({ type: 'text', array: true })
  answers: string[];

  @ApiProperty({ description: 'The type of the question', enum: QuestionsType, example: QuestionsType.single })
  @Column({ type: 'enum', enum: QuestionsType })
  type: QuestionsType;

  @ApiProperty({ description: 'The date when the entity was created', example: '2025-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'The date when the entity was last updated', example: '2025-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'The date when the entity was deleted (if applicable)', example: '2025-01-01T00:00:00.000Z', nullable: true, required: false })
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
