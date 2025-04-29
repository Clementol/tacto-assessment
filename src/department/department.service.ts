import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentInput, CreateSubDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput, UpdateSubDepartmentInput } from './dto/update-department.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department, SubDepartment } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department) private readonly departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment) private readonly subDepartmentRepository: Repository<SubDepartment>
  ) {}

  async create(createDepartmentInput: CreateDepartmentInput) {
    try {
      const { name, subDepartments } = createDepartmentInput;
      const department  = this.departmentRepository.create({ name, subDepartments });
       return this.departmentRepository.save(department);
    } catch (error) {
     return Promise.reject(error) 
    }
  }

  async findAll() {
    try {
      const departments = await this.departmentRepository.find();
      return departments;
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async findSubDepartment(id: number) {
    try {
      // const subDepartments = await this.subDepartmentRepository.find({ where: { department: { id } } })
      const sub = await this.subDepartmentRepository.createQueryBuilder('subDepartment')
      .innerJoin('subDepartment.department', 'department')
      .where('department.id = :id', { id })
      .getMany()

      return sub
    } catch (error) {
      return Promise.reject(error)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  async update(id: number, updateDepartmentInput: UpdateDepartmentInput) {
    try {
      const { name } = updateDepartmentInput;
      await this.departmentRepository.update(id, { name: name })
      const updateDepartment = await this.departmentRepository.findOne({ where: { id }})
      return updateDepartment;
    } catch (error) {
     return Promise.reject(error) 
    }
  }

  async remove(id: number) {
    try {
      await this.departmentRepository.delete(id);
      return { message: 'deleted' }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async createSubDepartment(id: number, createsubDepartmentInput: CreateSubDepartmentInput) {
    try {
      const departmentExist = await this.departmentRepository.findOne({ where: { id }})
      if (!departmentExist) return Promise.reject(new BadRequestException('department not found'));
      const sub = this.subDepartmentRepository.create({ department: { id }, ...createsubDepartmentInput})
      return this.subDepartmentRepository.save(sub)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async findSubDepartments() {
    try {
      const subs = await this.subDepartmentRepository.find()
      return subs;
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateSubDepartments(id: number, input: UpdateSubDepartmentInput) {
    try {
      await this.subDepartmentRepository.update(id, input)
      const updatesubDepartment = await this.subDepartmentRepository.findOne({ where: { id }})
      return updatesubDepartment;
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async removeSubDepartments(id: number) {
    try {
      await this.subDepartmentRepository.delete(id)
      return { message: 'deleted' };
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
