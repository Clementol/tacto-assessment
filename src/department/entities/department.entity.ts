import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Department {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => [SubDepartment])
  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true, // Allow cascading for related subdepartments
    nullable: true,
  })
  subDepartments?: SubDepartment[];
}

@ObjectType()
@Entity()
export class SubDepartment {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @ManyToOne(() => Department, (department) => department.subDepartments, {
    onDelete: 'CASCADE', // Delete subdepartments when the department is removed
  })
  department!: Department;
}