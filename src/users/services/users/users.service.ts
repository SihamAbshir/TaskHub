import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { getUsersByRoleDTO } from 'src/users/dtos/GetUsersByRole.dto';
import { updateUserDTO } from 'src/users/dtos/UpdateUser.dto';
import { encodePassword } from 'src/utilities/bcrypt';
import { CreateUserType, UpdateUserType } from 'src/utilities/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ){}

    async createUser(userDetails: CreateUserType){
        try{
            console.log("From services", userDetails);
            const pass = encodePassword(userDetails.password)
            console.log("pass",pass)
            const newUser = this.userRepository.create({
                ...userDetails, 
                password: pass
            })
            console.log("newUser",newUser)
            let res = await this.userRepository.save(newUser);
            return res;
        }catch (error) {
            throw new HttpException(
              error.message,
              error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async fetchUsers(){
        try {
            const users = await this.userRepository.find();
            return users;
        } catch (error) {
            throw new HttpException(
              error.message,
              error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getUsersByRole(userRequest: getUsersByRoleDTO){
        try {
            const { role } = userRequest;
            const usersByRole = await this.userRepository.find({
                where : { role }
            });
            return usersByRole;
        } catch (error) {
            throw new HttpException(
              error.message,
              error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getUserById(userId : number){
        try {
            const usersById = await this.userRepository.findOne({
                where:
                { id: userId }
            });
            if(!usersById){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return usersById;
        } catch (error) {
            throw new HttpException(
              error.message,
              error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }
    async updateUser(id : number, userRequest : UpdateUserType){
        try{
            const user = await this.userRepository.findOne({
                where: { id }
            })
            console.log(user);
            if(!user){
                throw new HttpException('User not found at that Id', HttpStatus.NOT_FOUND);
            }
            const updateUser = userRequest;
            await this.userRepository.update({ id }, updateUser);
            return {
                message: 'User Updated Sucessfully',
            }
        }catch (error) {
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }

    }

    async deleteUser(id: number){
        try{
            const user = await this.userRepository.findOne({
                where: { id }
            })
            console.log(user);
            if(!user){
                throw new HttpException('User not found at that Id', HttpStatus.NOT_FOUND);
            }
            await this.userRepository.delete({id})
            return {
                message: `User having id: ${id} is deleted successfully...`
            }
        }catch(error){
            throw new HttpException(
                error.message,
                error.status || HttpStatus.BAD_REQUEST,
            );
        }
    }
    
}
