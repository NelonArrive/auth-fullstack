import type { Metadata } from 'next'

import { NewPassword } from '@/features/auth/components'

export const metadata: Metadata = {
	title: 'Новый пароль'
}

export default function NewPasswordPage() {
	return <NewPassword />
}
