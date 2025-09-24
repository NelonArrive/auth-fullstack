import { api } from '@/shared/api'

import { TypeLoginSchema, TypeRegisterSchema } from '../schemes'

class AuthService {
	public async register(body: TypeRegisterSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined
	}

	public async login(body: TypeLoginSchema, recaptcha?: string) {}

	public async logout() {
		const response = await api.post('auth/logout')
	}
}

export const authService = new AuthService()
