import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import { Department, SubDepartment } from './entities/department.entity';
import { Repository } from 'typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment]), Repository],
  providers: [DepartmentResolver, DepartmentService],
})
export class DepartmentModule {}
