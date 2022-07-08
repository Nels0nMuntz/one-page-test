export interface PostForm {
    name: string;
    email: string;
    phone: string;
    position_id: number;
    photo: File | null,
};