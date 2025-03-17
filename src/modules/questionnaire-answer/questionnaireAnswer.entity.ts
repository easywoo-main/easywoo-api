import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {Questionnaire} from "../questionnaire/questionnaire.entity";
import {User} from "../user/user.entity";

@Entity({ name: 'questionnaire_answers' })
export class QuestionnaireAnswer {
  @ApiProperty({ description: 'The unique identifier of the quiz answer', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The answer(s) to the quiz question', example: ['Answer 1', 'Answer 2'] })
  @Column({ type: 'text', array: true })
  answer: string[];

  @ApiProperty({ description: 'The quiz question', type: () => Questionnaire })
  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.userAnswers)
  @JoinColumn({ name: 'question_id' })
  question: Questionnaire;

  @ApiProperty({ description: 'The user', type: () => User })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

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
