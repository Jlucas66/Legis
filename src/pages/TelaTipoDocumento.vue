<template>
    <q-card class="q-pa-md">
  
      <q-card-section>
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
      </q-card-section>
  
      <q-separator />
  
      <q-card-section>
        <q-card-section>
          <div class="row justify-end">
            <q-btn
              icon="add"
              label=""
              color="black"
              class="q-mt-md"
              size="md"
              style="width: 80px; height: 50px;"
              @click="abrirCardAdicaoDocumento = true"
            />
          </div>
      </q-card-section>
        <q-table
          title="Documentos"
          :rows="documentosFiltrados"
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
                @click="abrirEdicaoDocumento(row.id)"
              />
              <q-btn 
                icon="toggle_on"
                color="black" 
                round
                size="sm" 
                @click="excluirDocumento(row.id)"
              />    
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  
    <q-dialog 
    v-model="abrirCardEdicaoDocumento">
      <q-card class="q-pa-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
          <div class="text-h6">Edição de Documento</div>
        </q-card-section>
  
        <q-card-section class="q-gutter-md">
          <q-input v-model="documentosParaEditar.nome" label="Nome" filled/>

          <q-select
          v-model="documentosParaEditar.categoria"
          :options="orgaosDisponiveis"
          option-value="id"
          option-label="nome"
          label="Órgão"
          filled
          />
        </q-card-section>
  
        <q-card-actions>
          <q-btn label="Cancelar" color="grey" @click="abrirCardEdicaoDocumento = false" />
          <q-btn label="Salvar" color="black" @click="salvarEdicaoDocumento" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  

    <q-dialog v-model="abrirCardAdicaoDocumento">
      <q-card class="q-pa-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
          <div class="text-h6">Adicionar Documento</div>
        </q-card-section>
  
        <q-card-section class="q-gutter-md">
          <q-input v-model="documentosParaAdicionar.nome" label="Nome" filled/>
                    <q-select
          v-model="documentosParaAdicionar.categoria"
          :options="orgaosDisponiveis"
          option-value="id"
          option-label="nome"
          label="Órgão"
          filled
          />
        </q-card-section>
        <q-card-actions>
          <q-btn label="Cancelar" color="grey" @click="abrirCardAdicaoDocumento = false" />
          <q-btn label="Salvar" color="black" @click="salvarAdicaoDocumento" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  

<script>
import { ref, computed, defineComponent, onMounted } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
const url = import.meta.env.VITE_API_URL;

export default defineComponent({
  name: 'TelaTipoDocumento',
  setup() {
    const $q = useQuasar();
    const abrirCardAdicaoDocumento = ref(false);
    const abrirCardEdicaoDocumento = ref(false);
    const pesquisa = ref('');
    const orgaos = ref([]);
    const documentos = ref([]);
    const orgaosDisponiveis = ref([]);

    const columns = ([
      { name: 'nome', label: 'Descrição', align: 'left', field: 'nome' },
      { name: 'categoria', label: 'Órgão Relacionado', align: 'left', field: 'categoria' },
      { name: 'ativo', label: 'Status', align: 'left', field: 'ativo' },
      { name: 'acoes', label: 'Ações', align: 'center', field: 'acoes' }
    ])

    const documentosParaEditar = ref({
      id: null,
      nome: '',
      ativo: true,
      categoria: {
        id: null,
        nome: ''
      }
    })


    const documentosParaAdicionar = ref({
      id: null,
      nome: '',
      ativo: true,
      categoria: {
        id: null,
        nome: ''
      }    
    })

    onMounted(() => {
      fetchDocumento();
      fetchTiposCategorias();
    });

    const fetchDocumento = async () => {
      try {
        const response = await axios.get(`${url}/api/documentos/`);
        documentos.value = response.data || [];
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
        documentos.value = [];
      }
    }

    const fetchTiposCategorias = async () => {
      try {
        const response = await axios.get(`${url}/api/categorias/`);
        orgaosDisponiveis.value = response.data || [];
        console.log('Tipos de categorias:', orgaosDisponiveis.value);
      } catch (error) {
        console.error('Erro ao buscar tipos de categorias:', error);
        orgaosDisponiveis.value = [];
      }
    }

    const orgaosFiltrados = computed(() => {
      return orgaos.value.filter((orgao) => {
        return (
          (orgao.nome && orgao.nome.toLowerCase().includes(pesquisa.value.toLowerCase()))
        );
      });
    });

    const documentosFiltrados = computed(() => {
      return documentos.value.filter((documento) => {
        return (
      documento.nome.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
      documento.categoria.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
      documento.ativo.toLowerCase().includes(pesquisa.value.toLowerCase())
      
        );
      });
    });

    const excluirDocumento = async (id) => {
      try {
        $q.dialog({
        title: 'Atenção',
        message: 'Você tem certeza que deseja excluir este documento?',
        cancel: true,
        persistent: true
        }).onOk(async () => {
            const response= await fetch(`${url}/api/documentos/excluir-Documento/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await response.json();
            if (response.ok) {
                $q.notify({ message: result.message, color: 'positive' })
                fetchDocumento();
            } else {
                $q.notify({ message: result.message ,color: 'negative' })
            }
          })
    } catch (error) {
        console.error('Erro ao excluir documento:', error);
      }
    }

    const abrirEdicaoDocumento = async (id) => {
      try{
        const response = await axios.get(`${url}/api/documentos/listar-para-edicao/${id}`)
        if (response.status === 200) {
          documentosParaEditar.value = {...response.data };
          abrirCardEdicaoDocumento.value = true;
        }
      } catch (error) {
        console.error('Erro ao abrir edição de documento:', error);
        $q.notify({ type: 'negative', message: 'Erro ao abrir edição de documento.' });
      }
    }

    const salvarEdicaoDocumento = async () => {
      try{
        const response = await axios.put(`${url}/api/documentos/modificar-Documento/${documentosParaEditar.value.id}`, documentosParaEditar.value);
        if ( response.status === 200) {
          $q.notify({ message: 'Documento editado com sucesso!', color: 'positive'})
          abrirCardEdicaoDocumento.value = false;
          await fetchDocumento();
          await fetchTiposCategorias();
        } else { 
          throw new Error('Erro ao editar documento no servidor'); 
        }
      } catch (error) {
        console.error('Erro ao editar documento:', error);
        $q.notify({ type: 'negative', message: 'Erro ao editar documento.' });
      }
    }

    const salvarAdicaoDocumento = async () => {
        try {
            const response = await fetch(`${url}/api/documentos/adicionar-Documento`, {
            nome: documentosParaAdicionar.value.nome,
            categoria: documentosParaAdicionar.value.categoria,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(documentosParaAdicionar.value)
            });
            console.log(response);
            abrirCardAdicaoDocumento.value = false;
            fetchDocumento();
            fetchTiposCategorias();
             $q.notify({ type: 'positive', message: 'Documento adicionado com sucesso.' });
    
        } catch (error) {
            console.error('Erro ao adicionar documento:', error);
            $q.notify({ type: 'negative', message: 'Erro ao adicionar documento.' });
        }
    }



    return {
      abrirCardAdicaoDocumento,
      abrirCardEdicaoDocumento,
      columns,
      pesquisa,
      documentos,
      documentosFiltrados,
      abrirEdicaoDocumento,
      fetchDocumento,
      fetchTiposCategorias,
      excluirDocumento,
      salvarEdicaoDocumento,
      salvarAdicaoDocumento,
      orgaosFiltrados,
      orgaosDisponiveis,
      documentosParaEditar,
      documentosParaAdicionar
    };

}
}) 







</script>