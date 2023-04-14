export interface FormErrors {
    email: string | undefined,
    password1: string | undefined,
    password2: string | undefined
}

export interface LoginInputTypes {
    email: string,
    password: string
}

export interface RegisterInputTypes {
    email: string,
    password1: string,
    password2: string
}

export interface PostInputTypes {
    content: string,
    images: File[]
}

export interface CommentInputTypes {
    content: string
}