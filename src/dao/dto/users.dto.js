export class UserDTO {
    constructor(user){
        this.name = user.name;
        this.lastName = user.lastName;
        this.fullName = `${this.name} ${this.lastName}`;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role||"user";
    }
}
