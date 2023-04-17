export interface User {
    id: number,
    username: string,
    email: string,
    is_superuser: boolean
}

export interface Comment {
    id: number,
    user: User,
    content: string,
    post: number,
    date: string
}

export interface Image {
    id: number,
    post: number,
    image: string,
    isBlob?: boolean
}

export interface Post {
    id: number,
    user: User,
    content: string,
    images: Image[],
    likes: number[],
    comments: number,
    date: string,
}

export interface PostDataTypes {
    count: string,
    next: string | null,
    previous: string | null,
    results: Post[]
}