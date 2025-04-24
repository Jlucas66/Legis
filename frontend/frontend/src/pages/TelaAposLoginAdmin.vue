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
                <q-btn 
                    icon="edit"
                    color="yellow" 
                    round
                    size="sm" 
                    @click="getPosts(rowIndex)"
                />
                 <q-btn 
                    icon="toggle_on"
                    color="black" 
                   round
                   size="sm" 
                   @click="getPosts(rowIndex)"
                />
                <q-btn 
                   icon="delete"
                   color="purple" 
                   round
                   size="sm" 
                   @click="getPosts(rowIndex)"
                />       
    </div>
</template>  
    </q-table> <br/>
    
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import axios from 'axios'
const url = import.meta.env.VITE_API_URL

export default defineComponent({
    name: 'TelaAposLoginAdmin',
    setup() {
        const pesquisa = ref('')
        const normasAdmin = ref([])
        
        const columns = [
            { name: 'orgao', label: 'Órgão', align: 'left', field: 'orgao', sortable: true },
            { name: 'tipo', label: 'Tipo de Documento', align: 'left', field: 'tipo', sortable: true },
            { name: 'numero', label: 'Número', align: 'left', field: 'numero', sortable: true },
            { name: 'data', label: 'Data', align: 'left', field: 'data', sortable: true },
            { name: 'ementa', label: 'Ementa', align: 'left', field: 'ementa', sortable: true },
            { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
            { name: 'acoes', label: 'Ações', align: 'left', field: 'acoes', sortable: true },
        ]

        onMounted( async () => {
            try {
                console.log('URL', `${url}/api/normas/admin`)
                const resposta = await axios.get(`${url}/api/normas/admin`)
                normasAdmin.value = resposta.data
            } catch (error) {
                console.error('Erro ao buscar posts:', error)
            }
        })

        const normasFiltradas = computed(() => {
            return normasAdmin.value.filter((normasAdmin) => {
                return (
                    normasAdmin.orgao.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    normasAdmin.tipo.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    normasAdmin.numero.toString().includes(pesquisa.value) ||
                    normasAdmin.data.toString().includes(pesquisa.value) ||
                    normasAdmin.status.toString().includes(pesquisa.value) ||
                    normasAdmin.ementa.toLowerCase().includes(pesquisa.value.toLowerCase())
                )
            })
        })
        return {
            pesquisa,
            normasAdmin,
            columns,
            normasFiltradas
        }
    }
})

</script>