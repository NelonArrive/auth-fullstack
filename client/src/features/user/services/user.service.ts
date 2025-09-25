import { IUser } from '@/features/auth/types'

import { api } from '@/shared/api'

import { TypeSettingsSchema } from '../schemes/settings.schema'

class UserService {
	public async findProfile() {
		const res = await api.get<IUser>('users/profile')
		return res
	}

	public async updateProfile(body: TypeSettingsSchema) {
		const res = await api.patch<IUser>('users/profile', body)
		return res
	}

	public async deleteProfile() {
		const res = await api.delete<IUser>('users/profile')
		return res
	}
}

export const userService = new UserService()
