'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/shared/components/ui'

import { useRegisterMutation } from '../hooks'
import { RegisterSchema, TypeRegisterSchema } from '../schemes'

import { AuthWrapper } from './AuthWrapper'

export function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const { theme } = useTheme()

	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const { isLoadingRegister, register } = useRegisterMutation()

	const onSubmit = (values: TypeRegisterSchema) => {
		if (recaptchaValue) {
			register({ values, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Регистрация'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input
										placeholder='Ваше имя'
										disabled={isLoadingRegister}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input
										placeholder='example@email.com'
										disabled={isLoadingRegister}
										type='email'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='********'
											disabled={isLoadingRegister}
											type={showPassword ? 'text' : 'password'}
											{...field}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='absolute top-0 right-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent'
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff className='h-4 w-4' />
											) : (
												<Eye className='h-4 w-4' />
											)}
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Повторите пароль</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='********'
											disabled={isLoadingRegister}
											type={showPasswordRepeat ? 'text' : 'password'}
											{...field}
										/>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											className='absolute top-0 right-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent'
											onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
										>
											{showPasswordRepeat ? (
												<EyeOff className='h-4 w-4' />
											) : (
												<Eye className='h-4 w-4' />
											)}
										</Button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
							onChange={setRecaptchaValue}
							theme={theme === 'light' ? 'light' : 'dark'}
						/>
					</div>
					<Button disabled={isLoadingRegister} type='submit'>
						Создать аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
