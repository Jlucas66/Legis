<template>
    <q-table>
        title="Normas"
        :rows="normas""
        :columns="columns"
        row-key="id"
    </q-table>

</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import postService from 'src/services/posts'
const url = import.meta.env.VITE_API_URL

export default defineComponent({
    name: 'TelaAposLoginUser',
    setup() {
        const normas = ref([])
        const { list } = postService()

        const columns = ([
            { name: 'orgao', label: 'Órgão', align: 'left', field: 'orgao', sortable: true },
            { name: 'tipo', label: 'Tipo de Documento', align: 'left', field: 'tipo', sortable: true },
            { name: 'numero', label: 'Número', align: 'left', field: 'numero', sortable: true },
            { name: 'data', label: 'Data', align: 'left', field: 'data', sortable: true },
            { name: 'ementa', label: 'Ementa', align: 'left', field: 'ementa', sortable: true },
        ])

        onMounted( async () => {
            getPosts()
        })

        const getPosts = async () => {
            try {
                console.log('URL', `${url}/api/normas`)
                const resposta = await axios.get(`${url}/api/normas`)
                const data = await list(`${url}/normas`)
                console.log('Data', data)
                normas.value = resposta.data
                normas.value = data
            } catch (error) {
                console.error('Erro ao buscar posts:', error)
            }
        }

        return {
            normas,
            columns,
            onMounted,
            getPosts
         }
        }
})


</script>