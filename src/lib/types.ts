import { bookmark, BookmarkTag } from "@prisma/client";
import { Tags } from "lucide-react";
import z from "zod";
export const SignUpSchema = z.object({
    firstName : z.string().min(2),
    lastName : z.string().min(2),
    email :z.string().email({message: "Invalid email"}),
    password : z.string().min(8),
    confirmPassword : z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const SignInSchema = z.object({
    email :z.string().email({message: "Invalid email"}),
    password : z.string().min(8),
})

export const CreateBookmarkSchema = z.object({
    url : z.string().url({message: "Invalid url"}),
    spaceId : z.string().optional(),
    tags : z.array(z.string()).max(2,{message:"Max 2 tags are allowes"}).optional()
})

export type CreateBookmark = z.infer<typeof CreateBookmarkSchema>;

export interface ExtendedBookmark extends bookmark {
  tags: string[];
}

export interface BookmarkType {
  initialData: ExtendedBookmark[];
}

export interface metadata {
  title: string |null
  description: string |null
  image: string|null
  icon: string|null
}