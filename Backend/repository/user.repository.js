import { UserModel } from "../schema/user.schema.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

export default class UserRepository{

    async register(user){
        try {
            // const {name, email, password} = user;
            const existingUser = await this.findByEmail(user.email)
            if(existingUser){
                throw new Error("User with this email already exists");
            }
            const hashPassword = await this.hashPassword(user.password);

            const newUser = await UserModel.create({
                name: user.name,
                email: user.email,
                password: hashPassword
            });
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async login(userInfo){
        const {email, password} = userInfo;
        try {
            const existingUser = await UserModel.findOne({email: email});
            if(existingUser){
                const passwordCheck = await this.authenticatePassword(password, existingUser.password)
                if(passwordCheck){
                    return existingUser;
                }
                else{
                    throw new Error('Password not matched')  
                }
            }else{
                throw new Error('User not found')
            }
            
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }

    async findByEmail(email) {
        try{
            return await UserModel.findOne({email: email});
        }catch(err){
            console.error("Error finding user by email:", err);
            throw err;
        }
    }

    async hashPassword(plainPassword) {
        const saltRounds = 12;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        return hash;
    }

    async authenticatePassword(plainPassword, storedHash) {
        const passwordsMatch = await bcrypt.compare(plainPassword,storedHash);
        return passwordsMatch; // Returns true if passwords match
    }
        
}