import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeLoginSchema } from '../schemes'
import { authService } from '../services'

interface ILoginMutation {
	values: TypeLoginSchema
	recaptcha: string
}

export function useLoginMutation(
	setIsShowToFactor: Dispatch<SetStateAction<boolean>>
) {
	const router = useRouter()

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login user'],
		mutationFn: ({ values, recaptcha }: ILoginMutation) =>
			authService.login(values, recaptcha),
		onSuccess(data: any) {
			if (data.message) {
				toastMessageHandler(data)
				setIsShowToFactor(true)
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
