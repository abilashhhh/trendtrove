export interface SignUpUserInterface {
    name : string,
    username ?: string,
    email : string,
    phone ?: string ,
    password : string,
    confirmPassword: string,
}

export interface SignupUserResponse {
    message?: string,
    status: string
}

 

export interface UsernameAvailabilityResponse {
    available: boolean,
    status: string
}

