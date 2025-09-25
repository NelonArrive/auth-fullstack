import { type Metadata } from 'next'

import { SettingsForm } from '@/features/user/components'

export const metadata: Metadata = {
	title: 'Настройки профиля'
}

export function SettingsPage() {
	return <SettingsForm />
}
