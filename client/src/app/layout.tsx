import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'

import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: {
		absolute: 'Авторизация',
		template: '%s | Авторизация'
	},
	description:
		'Полноценная, профессиональная авторизация реализованная на данном проекте'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={geistMono.className}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
