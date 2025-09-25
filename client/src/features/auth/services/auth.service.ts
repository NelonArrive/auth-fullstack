import { api } from '@/shared/api'

import { TypeLoginSchema, TypeRegisterSchema } from '../schemes'
import { IUser } from '../types'

class AuthService {
	public async register(body: TypeRegisterSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const res = await api.post<IUser>('auth/register', body, {
			headers
		})

		return res
	}

	public async login(body: TypeLoginSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const res = await api.post<IUser>('auth/login', body, {
			headers
		})

		return res
	}

	public async oauthByProvider(provider: 'google' | 'yandex') {
		const res = await api.get<{ url: string }>(
			`auth/oauth/connect/${provider}`
		)

		return res
	}

	public async logout() {
		const res = await api.post('auth/logout')
		return res
	}
}

export const authService = new AuthService()
