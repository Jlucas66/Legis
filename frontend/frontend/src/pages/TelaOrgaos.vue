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
        title="Órgãos"
        :rows="orgaosFiltrados"
        :columns="columns"
        row-key="id"
    >
    <template v-slot:body-cell-acoes="{ row }">
        <div class="row items-center q-gutter-sm" style="flex-wrap: nowrap">
            <q-btn 
                icon="edit"
                color="yellow" 
                round
                size="sm" 
                @click="abrirEdicaoCategorias(row.id)"
            />

            <q-btn 
                icon="toggle_on"
                color="black" 
                round
                size="sm" 
                @click="excluirOrgao(row.id)"
            />    
        </div>
    </template>
    </q-table>    


<q-dialog v-model="abrirCardEdicaoOrgaos">
    <q-card class="q-pa-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
            <div class="text-h6">Edição de Órgão</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
            <q-input v-model="orgaosParaEditar.nome" label="Nome" filled/>
        </q-card-section>

        <q-card-actions>
            <q-btn flat label="Cancelar" color="grey" @click="abrirCardEdicaoOrgaos = false" />
            <q-btn label="Salvar" color="black" @click="salvarEdicaoOrgao" />
        </q-card-actions>
    </q-card>    
</q-dialog>    


<q-dialog v-model="abrirCardAdicaoOrgaos">
    <q-card class="q-pa-md q-mt-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
            <div class="text-h6">Adicionar Órgão</div>
        </q-card-section>

        <q-card-section class="q-gutter-mds">
            <q-input v-model="novoOrgao.nome" label="Nome" filled/>
            <q-select v-model="novoOrgao.situacao" label="Status" :options="['Ativo', 'Inativo']" />
        </q-card-section>
    </q-card>
</q-dialog>

</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import axios from 'axios'
const url = import.meta.env.VITE_API_URL
import { useQuasar } from 'quasar'

export default defineComponent({
    name: 'TelaOrgaos',
    setup() {
        const $q = useQuasar()
        const pesquisa = ref('')
        const orgaos = ref([])
        const abrirCardEdicaoOrgaos = ref(false);
        const abrirCardAdicaoOrgaos = ref(false);

        const columns = ([
            { name: 'nome', label: 'Nome', align: 'left', field: 'nome', sortable: true },
            { name: 'ativo', label: 'Status', align: 'left', field: 'ativo', sortable: true },
            { name: 'acoes', label: 'Ações', align: 'center', field: 'acoes', sortable: true, style: 'max-width: 150px' },
        ])

        const orgaosParaEditar = ref({
            id: null,
            nome: '',
            status: '',
        })

        const novoOrgao = ref({
            nome: '',
            status: '',
        })

        onMounted( async () => {
            await fetchOrgaos();
        })

        const fetchOrgaos = async () => {
            try {
                const response = await axios.get(`${url}/api/categorias/`)
                orgaos.value = response.data || [];
            } catch (error) {
                console.error('Erro ao buscar órgãos:', error)
                orgaos.value = []
            }
        }

        const orgaosFiltrados = computed(() => {
            return orgaos.value.filter((orgaos) => {
                return orgaos.nome.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    orgaos.status.toLowerCase().includes(pesquisa.value.toLowerCase())
            })
        })

        const excluirOrgao = async (id) => {
            try {
                $q.dialog({
                    title: 'Atenção',
                    message: 'Você tem certeza que deseja excluir este órgão?',
                    cancel: true,
                    persistent: true
                }).onOk(async () => {
                    const response = await fetch(`${url}/api/categorias/excluir/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const result = await response.json();
                    if (response.ok) {
                        $q.notify({ message: result.message, color: 'positive' })
                        await fetchOrgaos()
                    } else {
                        $q.notify({ message: result.message ,color: 'negative' })
                    }
                })
            } catch (error) {
                console.error('Erro ao excluir órgão:', error)
                $q.notify({ message: 'Erro ao excluir órgão', color: 'negative' })
            }
        }

        const abrirEdicaoCategorias = async (id) => {
            try {
                const response = await axios.get(`${url}/api/categorias/listar-para-edicao/${id}`)
                if (response.data) {
                    orgaosParaEditar.value = {...response.data };
                    abrirCardEdicaoOrgaos.value = true;
                }
            } catch (error) {
                console.error('Erro ao buscar órgão:', error)
                $q.notify({ message: 'Erro ao buscar orgão para edição.', icon: 'times', color: 'red' });

            }
        }

        const salvarEdicaoOrgao = async () => {
            try {
                const response = await axios.put(`${url}/api/categorias/modificar/${orgaosParaEditar.value.id}`, orgaosParaEditar.value);
                if (response.status === 200) {
                    $q.notify({ message: 'Órgão editado com sucesso', color: 'positive' })
                    abrirCardEdicaoOrgaos.value = false;
                    await fetchOrgaos()
                } else {
                    throw new Error('Erro ao editar órgão')
                }
            } catch (error) {
                console.error('Erro ao salvar novo órgão:', error)
                $q.notify({ message: 'Erro ao salvar novo órgão', color: 'negative' })
            }
        }

        const salvarNovoOrgao = async () => {
            try {
                const response = await fetch(`${url}/api/categorias/adicionarOrgao`, {
                    nome: novoOrgao.value.nome,
                    status : novoOrgao.value.status,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoOrgao.value)
                });
                console.log(response)
                abrirCardAdicaoOrgaos.value = false;
                await fetchOrgaos()
            } catch (error) {
                console.error('Erro ao salvar novo órgão:', error)
                $q.notify({ message: 'Erro ao salvar novo órgão', color: 'negative' })
            }
        }







        return {
            pesquisa,
            orgaos,
            columns,
            fetchOrgaos,
            orgaosFiltrados,
            orgaosParaEditar,
            novoOrgao,
            excluirOrgao,
            salvarEdicaoOrgao,
            salvarNovoOrgao,
            abrirCardEdicaoOrgaos,
            abrirEdicaoCategorias
        }
    }
})    



</script>