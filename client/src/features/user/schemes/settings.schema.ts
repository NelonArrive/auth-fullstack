import { z } from 'zod'

export const SettingsSchema = z.object({
	name: z.string().min(1, {
		message: 'Имя обязательно для заполнения'
	}),
	email: z.string().email({
		message: 'Неверный формат e-mail'
	}),
	isToFactorEnabled: z.boolean()
})

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>
