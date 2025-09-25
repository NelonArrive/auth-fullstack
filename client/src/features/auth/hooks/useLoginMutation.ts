import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeLoginSchema } from '../schemes'
import { authService } from '../services'
import { useRouter } from 'next/navigation'

interface ILoginMutation {
	values: TypeLoginSchema
	recaptcha: string
}

export function useLoginMutation() {
	const router = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['Login user'],
		mutationFn: ({ values, recaptcha }: ILoginMutation) =>
			authService.login(values, recaptcha),
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
			} else {
				toast.success('Успешная авторизация!')
				router.push('dashboard/settings')
			}
		},
		onError(err) {
			toastMessageHandler(err)
		}
	})

	return { login, isLoadingLogin }
}
