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
    newPassword?: string;
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
}


interface IReservation {
    user_id?: string;
    bike_id?: string;
    startDate?: Date | string;
    endDate?: Date | string;
}

interface IRating {
    id: string;
    rating: number | string;
}
