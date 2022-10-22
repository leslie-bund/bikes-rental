import User from "../repos/user";
import jwtUtil from "../util/jwt-util";
import pwdUtil from "../util/pwd-util";

class UserService {
    // Login the user and return token + user doc
    async login(input: ILogin): Promise<object | null>{
        const doc = await User.getOne(input);
        let token = '';
        if(doc){
            token = await jwtUtil.sign(doc?.toObject())
        }
        return token ? { doc, token } : null;
    }

    // Create user and return created user for login form auto-fill
    async signUp(input: ISignUp & { role?: string }, role: string){
        const { password } = input;
        input['role'] = role;
        delete input?.confirmPassword;
        input['password'] = await pwdUtil.getHash(password)
        const userAdded = await User.add(input as unknown as Ifilter);
        if(userAdded){
            const doc = await User.getOne(input);
            return doc;
        }
    }

    // Edit the user using input and return newly edited document
    async edit(input: IUserEdit, userId: string){
        return await User.update(userId, input as unknown as Ifilter)
    }

    // Delete the user account
    async delete(id: string){
        return await User._delete({ _id: id })
    }
}

export default UserService