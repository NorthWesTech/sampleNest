import { Injectable } from '@nestjs/common';
import { UserModel } from 'tools/models/user.model';
import { UserCreateDto } from 'tools/dtos/user.dto';

const result: UserModel[] = [];

@Injectable() //Diger servislerin erisimi icin inject olabilmeli
export class UserService {
    getAllUsers() : UserModel[]{
        if(result.length === 0){
            this.createMockUser({
                birthDay: new Date(),
                email:"northwestechcompany@gmail.com",
                name:"Rick",
                surname:"GreenWood",
                password:"qwe123"
            });
        }
        return result;
    }
    getUserById(id) : any {
        const user = result.find(s => s.id == id);

        if(!user) {
            return 'user does not exist';
        } else {
            return user;
        }
    }

    createUser(body:UserCreateDto){
        const isExit = result.find(res => {
            res.email === body.email;
        });
        if(isExit) {
            return isExit;
        } else {
            this.createMockUser(body);
            return result.slice(result.length - 1, result.length)
        }
    }

    private createMockUser(data:any){
        const user: UserModel = new UserModel();
        user.birthDay = data.birthDay;
        user.email = data.email;
        user.name = data.name;
        user.surname = data.surname;
        user.password = data.password;
        user.id = (Math.floor(Math.random() * 60) + 1).toString();
        
        result.push(user);
    }
}
