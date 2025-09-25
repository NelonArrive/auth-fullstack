import { api } from '@/shared/api'

class VerificationService {
	public async newVerification(token: string | null) {
		const res = await api.post('auth/email-confirmation', { token })
		return res
	}
}

export const verificationService = new VerificationService()
