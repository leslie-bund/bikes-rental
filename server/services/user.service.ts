import User from "../repos/user";
import jwtUtil from "../util/jwt-util";
import pwdUtil from "../util/pwd-util";

interface Ifilter {
    [k: string]: string | Date | Ifilter | number | unknown;
}

interface ILogin {
    email: string;
    password: string;
}

interface ISignUp {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

interface IUserEdit {
    password?: string;
    confirmPassword?: string;
    name?: string;
    email?: string;
    role?: string;
}

interface IUser {
    password?: string;
    name?: string;
    email?: string;
    role?: string;
    _id?: string;
}

class UserService {
  // Login the user and return token + user doc
  static async login(input: ILogin): Promise<object | null> {
    const doc = await User.getOne<IUser>({ email: input["email"] });
    let token = "";
    const result = doc as unknown as IUser;
    if (result && result.password !== undefined) {
      const { email, role, _id, name } = result;
      const passwordMatch = await pwdUtil.compare(
        input["password"],
        result?.password
        );
        if (passwordMatch) {
          token = await jwtUtil.sign({ email, _id, role, name });
          
      }
    }
    return token ? { result, token } : null;
  }

  // Persist user
  static async viewUser(userId: string) {
    const doc = await User.getOne<IUser>({ _id: userId });
    if(!doc){
      return null;
    }
    return doc;
  }

  // Create user and return created user for login form auto-fill
  static async signUp(input: ISignUp & { role?: string }, role: string) {
    const { password } = input;
    input["role"] = role;
    delete input?.confirmPassword;
    input["password"] = await pwdUtil.getHash(password);
    const userAdded = await User.add(input as unknown as Ifilter);
    if (userAdded) {
      const doc = await User.getOne<IUser>(input);
      return doc;
    }
  }

  // Edit the user using input and return newly edited document
  static async edit(input: IUserEdit, userId: string) {
    const { password, confirmPassword } = input;
    if(password && confirmPassword){
    delete input?.confirmPassword;
    input["password"] = await pwdUtil.getHash(password);
    }

    return await User.update<IUserEdit>(userId, input);
  }

  // Delete the user account
  static async delete(id: string) {
    return await User._delete({ _id: id });
  }
}

export default UserService;
