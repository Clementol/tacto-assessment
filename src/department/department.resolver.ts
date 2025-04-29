import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department, SubDepartment } from './entities/department.entity';
import { CreateDepartmentInput, CreateSubDepartmentInput } from './dto/create-department.input';
import { DeleteMessage, UpdateDepartmentInput, UpdateSubDepartmentInput } from './dto/update-department.input';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

  @UseGuards(JwtGuard)
@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}


  @Mutation(() => Department)
  createDepartment(@Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput) {
    return this.departmentService.create(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'getDepartments' })
  findAll() {
    return this.departmentService.findAll();
  }

  // @Query(() => Department, { name: 'department' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.departmentService.findOne(id);
  // }

  @Mutation(() => Department)
  updateDepartment(@Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput) {
    return this.departmentService.update(updateDepartmentInput.id, updateDepartmentInput);
  }

  @Mutation(() => DeleteMessage, { name: 'deleteDepartment' })
  removeDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.remove(id);
  }

  @ResolveField(() => [SubDepartment], { nullable: true } )
  async subDepartments(
    @Parent() department: Department) {
    return this.departmentService.findSubDepartment(department.id)
  }
 // CRUD Sub
  @Mutation(() => SubDepartment)
  createSubDepartment(
    @Args('id', { type: () => Int}) id: number,
    @Args('createSubDepartmentInput') createDepartmentInput: CreateSubDepartmentInput) {
    return this.departmentService.createSubDepartment(id, createDepartmentInput);
  }

  @Query(() => [SubDepartment], { name: 'getSubDepartments' })
  findAllSubDepartments() {
    return this.departmentService.findSubDepartments();
  }


  @Mutation(() => SubDepartment)
  updateSubDepartment(
    @Args('id', { type: () => Int}) id: number,
    @Args('updateSubDepartmentInput') updateDepartmentInput: UpdateSubDepartmentInput) {
    return this.departmentService.updateSubDepartments(id, updateDepartmentInput);
  }

  @Mutation(() => DeleteMessage, { name: 'deleteSubDepartment' })
  removeSubDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.removeSubDepartments(id);
  }

}
