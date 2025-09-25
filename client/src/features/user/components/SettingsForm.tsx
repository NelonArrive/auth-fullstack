import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Loader,
	Switch
} from '@/shared/components/ui'
import { useProfile } from '@/shared/hook'

import { useUpdateProfileMutation } from '../hooks/useUpdateProfileMutation'
import { SettingsSchema, TypeSettingsSchema } from '../schemes/settings.schema'

import { UserButton, UserButtonLoading } from './UserButton'

export function SettingsForm() {
	const { user, isLoading } = useProfile()

	const form = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		values: {
			name: user?.displayName || '',
			email: user?.email || '',
			isToFactorEnabled: user?.isTwoFactorEnabled || false
		}
	})

	const { isLoadingUpdate, update } = useUpdateProfileMutation()

	const onSubmit = (values: TypeSettingsSchema) => {
		update(values)
	}

	if (!user) return null

	return (
		<Card className='w-[400px]'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<CardTitle>Настройка профиля</CardTitle>
				{isLoading ? <UserButtonLoading /> : <UserButton user={user} />}
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<Loader />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-2 space-x-2'
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
												disabled={isLoadingUpdate}
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
												disabled={isLoadingUpdate}
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
								name='isToFactorEnabled'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div>
											<FormLabel>Двухфакторная аутентификация</FormLabel>
											<FormDescription>
												Включите двухфакторную аутентификацию для вашей учётной
												записи
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button disabled={isLoadingUpdate} type='submit'>
								Сохранить
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	)
}
