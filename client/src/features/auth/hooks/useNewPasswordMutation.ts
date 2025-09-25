import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeNewPasswordSchema, TypeResetPasswordSchema } from '../schemes'
import { authService, passwordRecoveryService } from '../services'

interface ILoginMutation {
	values: TypeNewPasswordSchema
	recaptcha: string
}

export function useNewPasswordMutation() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
		mutationKey: ['new password'],
		mutationFn: ({ values, recaptcha }: ILoginMutation) =>
			passwordRecoveryService.new(values, token, recaptcha),
		onSuccess() {
			toast.success('Пароли успешно изменён', {
				description: 'Теперь вы можете войти в свой аккаунт.'
			})
			router.push('/dashboard/settings')
		},
		onError(err) {
			toastMessageHandler(err)
		}
	})

	return { newPassword, isLoadingNew }
}
