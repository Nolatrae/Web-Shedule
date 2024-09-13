import { axiosClassic, instance } from '@/api/axios'
import { IFormData, IUser } from '@/types/types'
import { removeFromStorage, saveTokenStorage } from './auth.helper'

interface IAuthResponse {
	accessToken: string
	user: IUser
}

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

class AuthService {
	async main(type: 'login' | 'register', data: IFormData) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}

	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token',
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`,
				},
			}
		)

		return response.data
	}

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}

	async profile() {
		return instance.get<IUser>(`/auth/profile`)
	}

	async users() {
		return instance.get<IUser[]>(`/auth/users`)
	}
}

export default new AuthService()
