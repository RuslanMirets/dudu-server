import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { SearchUserDto } from './dto/searchg-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  findById(id: number) {
    return this.repository.findOne(id);
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOne(cond);
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }

  async search(dto: SearchUserDto) {
    const qb = this.repository.createQueryBuilder('u');
    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);
    if (dto.firstName) {
      qb.andWhere(`u.firstName ILIKE :firstName`);
    }
    if (dto.lastName) {
      qb.andWhere(`u.lastName ILIKE :lastName`);
    }
    if (dto.email) {
      qb.andWhere(`u.email ILIKE :email`);
    }
    qb.setParameters({
      firstName: `%${dto.firstName}%`,
      lastName: `%${dto.lastName}%`,
      email: `%${dto.email}%`,
    });
    const [items, total] = await qb.getManyAndCount();
    return { items, total };
  }
}
