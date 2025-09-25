import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeSettingsSchema } from '../schemes/settings.schema'
import { userService } from '../services'

export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeSettingsSchema) => userService.updateProfile(data),
		onSuccess() {
			toast.success('Профиль успешно обновлён')
		},
		onError(err) {
			toastMessageHandler(err)
		}
	})

	return { update, isLoadingUpdate }
}
