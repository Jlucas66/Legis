import { api } from '@/boot/axios'

export function useApi(url) {
    const list = async (url) => {
        try {
            const { data } = await api.get(url)
            return data
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message || 'An error occurred')
        }
    }
    const post = async (form) => {
        try {
            const { data } = await api.post(url, form)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
    const update = async (form) => {
        try {
            const { data } = await api.put(url, form)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
    const remove = async (url, id) => {
        try {
            const { data } = await api.delete(`${url}/${id}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
    const getById = async (url, id) => {
        try {
            const { data } = await api.get(`${url}/${id}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }




return {
    list,
    post,
    update,
    remove,
    getById
}

}