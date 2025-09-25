import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeRegisterSchema } from '../schemes'
import { authService } from '../services'

interface IRegisterMutation {
	values: TypeRegisterSchema
	recaptcha: string
}

export function useRegisterMutation() {
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register user'],
		mutationFn: ({ values, recaptcha }: IRegisterMutation) =>
			authService.register(values),
		onSuccess() {
			toast.success('Успешная регистрация', {
				description:
					'Подтвердите почту. Сообщение было отправлено на ваш почтовый адрес.'
			})
		},
		onError(err) {
			toastMessageHandler(err)
		}
	})

	return { register, isLoadingRegister }
}
