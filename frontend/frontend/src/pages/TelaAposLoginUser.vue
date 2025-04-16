<template>
    <q-btn icon="add" color="green" dense size="md" @click="adicionarNovaNorma">Adicione uma nova Norma</q-btn>
    <q-table>
        title="Normas"
        :rows="rows"
        :columns="columns"
        row-key="id"
    </q-table>

</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import postService from 'src/services/posts'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'TelaAposLoginUser',
    setup() {
        const posts = ref([])
        const { list, remove} = postService()
        const $q = useQuasar()
        const router = useRouter()

        const columns = ([
            { name: 'orgao', label: 'Órgão', align: 'left', field: 'orgao', sortable: true },
            { name: 'ipo', label: 'Tipo de Documento', align: 'left', field: 'tipo', sortable: true },
            { name: 'numero', label: 'Número', align: 'left', field: 'numero', sortable: true },
            { name: 'data', label: 'Data', align: 'left', field: 'data', sortable: true },
            { name: 'ementa', label: 'Ementa', align: 'left', field: 'ementa', sortable: true },
        ])

        onMounted(() => {
            getPosts()
        })

        const getPosts = async () => {
            try {
                const data = await list(`${url}/posts`)
                posts.value = data
            } catch (error) {
                console.error('Erro ao buscar posts:', error)
            }
        }
    }
})


</script>