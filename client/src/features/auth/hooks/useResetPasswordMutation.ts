import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeResetPasswordSchema } from '../schemes'
import { authService, passwordRecoveryService } from '../services'

interface ILoginMutation {
	values: TypeResetPasswordSchema
	recaptcha: string
}

export function useResetPasswordMutation() {
	const router = useRouter()

	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset password'],
		mutationFn: ({ values, recaptcha }: ILoginMutation) =>
			passwordRecoveryService.reset(values, recaptcha),
		onSuccess() {
			toast.success('Проверьте почту', {
				description: 'На вашу почту была отправлена ссылка для подтверждения.'
			})
		},
		onError(err) {
			toastMessageHandler(err)
		}
	})

	return { reset, isLoadingReset }
}
