import { z } from 'zod'

export const LoginSchema = z.object({
	name: z.string().min(1, {
		message: 'Имя обязательно для заполнения'
	}),
	email: z.string().email({
		message: 'Неверный формат e-mail'
	}),
	password: z.string().min(6, {
		message: 'Минимальная длина пароля — 6 символов'
	})
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
