import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { appConfig } from 'src/shared/src';
import { Repository } from 'typeorm';
import { CreateAuthInput, LoginInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { User } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  
  async create(createAuthInput: CreateAuthInput) {
    try {
      const { username, password } = createAuthInput;
      const userExist = await this.userRepository.findOne({ where: { username }})
      if (userExist) return Promise.reject(new BadRequestException('Username already exist!'))
      const user = this.userRepository.create({ 
        ...createAuthInput, password: await bcrypt.hash(password, 10)
      });
      return this.userRepository.save(user);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async login(loginInput: LoginInput) {
    try {
      const { username, password } = loginInput;
      const userExist = await this.userRepository.findOne({ where: { username} });
      if (!userExist) return Promise.reject(new BadRequestException('invalid credentials'))
        const passwordMatches = bcrypt.compare(password, userExist.password);
      if (!passwordMatches) return Promise.reject(new BadRequestException('Invalid Credentials.'));

      const accessToken = await this.jwtService.signAsync({ username }, { secret: appConfig().auth.jwtsecretkey});
      return { accessToken } ;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
