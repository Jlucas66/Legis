<template>
    <q-input
        filled
        v-model="pesquisa"
        label="Pesquisar"
        clearable
        >
            <template v-slot:append>
                <q-icon name="search" />
            </template>
    </q-input>
    <q-table
        title="Normas"
        :rows="normasFiltradas"
        :columns="columns"
        row-key="id"
    >
        <template v-slot:body-cell-acoes="{ rowIndex }">
            <div class="row items-center q-gutter-sm">
                <q-btn 
                    icon="picture_as_pdf"
                    color="red" 
                    round
                    size="sm" 
                   @click="getPosts(rowIndex)"
            />
            </div>
            
        </template>
    </q-table>
    <br/>
    <div class="row items-center q-mt-md">
        <q-btn type="submit" label="Normas Internas" color="black" class="full-width" :to="{ name: 'TelaLogin' }" />
    </div>

</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import axios from 'axios'
const url = import.meta.env.VITE_API_URL

export default defineComponent({
    name: 'TelaAposLoginUser',
    setup() {
        const pesquisa = ref('')
        const normas = ref([])

        const columns = ([
            { name: 'orgao', label: 'Órgão', align: 'left', field: 'orgao', sortable: true },
            { name: 'tipo', label: 'Tipo de Documento', align: 'left', field: 'tipo', sortable: true },
            { name: 'numero', label: 'Número', align: 'left', field: 'numero', sortable: true },
            { name: 'data', label: 'Data', align: 'left', field: 'data', sortable: true },
            { name: 'ementa', label: 'Ementa', align: 'left', field: 'ementa', sortable: true },
            { name: 'acoes', label: 'Ações', align: 'center', field: 'acoes', sortable: true },
        ])

        onMounted( async () => {
            try {
                console.log('URL', `${url}/api/normas`)
                const resposta = await axios.get(`${url}/api/normas`)
                normas.value = resposta.data
            } catch (error) {
                console.error('Erro ao buscar posts:', error)
            }
        })

        const getPosts = async () => {
            try {
                console.log('URL', `${url}/api/normas`)
                const resposta = await axios.get(`${url}/api/normas`)
                normas.value = resposta.data
            } catch (error) {
                console.error('Erro ao buscar posts:', error)
            }
        }

        const normasFiltradas = computed(() => {
            return normas.value.filter((norma) => {
                return (
                    norma.orgao.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    norma.tipo.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    norma.numero.toString().includes(pesquisa.value) ||
                    norma.data.toString().includes(pesquisa.value) ||
                    norma.ementa.toLowerCase().includes(pesquisa.value.toLowerCase())
                )
            })
        })

        return {
            normas,
            columns,
            normasFiltradas,
            getPosts
         }
        }
})


</script>