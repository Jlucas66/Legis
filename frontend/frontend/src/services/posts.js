import useApi from 'src/composables/useApi'

export default function postService () {
    const { list, get, update, remove, getById } = useApi('normas')

    return {
        list,
        get,
        update,
        remove,
        getById
    }
}