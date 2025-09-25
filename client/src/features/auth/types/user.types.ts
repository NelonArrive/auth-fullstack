export enum UserRole {
	Regular = 'REGULAR',
	Admin = 'ADMIN'
}
export enum EnumAuthMethod {
	Credentials = 'CREDENTIALS',
	Google = 'GOOGLE',
	Yandex = 'YANDEX'
}

export interface IAccount {
	id: string
	createdAt: string
	updatedAt: string
	type: string
	provider: string
	refreshToken: string
	accessToken: string
	expiresAt: number
	userId: string
}

export interface IUser {
	lid: string
	createdAt: string
	updatedAt: string
	email: string
	password: string
	displayName: string
	picture: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: EnumAuthMethod
	accounts: IAccount[]
}
