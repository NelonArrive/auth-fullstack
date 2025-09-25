import type { Metadata } from 'next'

import { NewVerification } from '@/features/auth/components/NewVerification'

export const metadata: Metadata = {
	title: 'Подтверждение почты'
}

export default function NewVerificationPage() {
	return <NewVerification />
}
