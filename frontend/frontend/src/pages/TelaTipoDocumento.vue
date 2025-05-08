<template>
    <q-card class="q-pa-md">

      <q-card-section>
        <q-btn
          icon="add"
          label="Adicionar Novo Documento"
          color="black"
          class="full-width q-mt-md"
          @click="abrirCardAdicaoDocumento = true"
        />
      </q-card-section>
  
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
                @click="abrirCardEdicaoDocumento = true"
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
  
        <q-btn 
          label="Novo Documento"
          color="primary"
          @click="abrirCardAdicaoDocumento = true"
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
  
    <!-- Diálogo de edição -->
    <q-dialog v-model="abrirCardEdicaoDocumento">
      <q-card class="q-pa-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
          <div class="text-h6">Edição de Documento</div>
        </q-card-section>
  
        <q-card-section class="q-gutter-md">
          <q-input v-model="documentosParaEditar.nome" label="Nome" filled/>
        </q-card-section>
  
        <q-card-actions>
          <q-btn label="Salvar" color="black" @click="salvarEdicaoDocumento" />
          <q-btn label="Cancelar" color="grey" @click="abrirCardEdicaoDocumento = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  
    <!-- Diálogo de adição -->
    <q-dialog v-model="abrirCardAdicaoDocumento">
      <q-card class="q-pa-md" style="max-width: 900px; width: 100%;">
        <q-card-section>
          <div class="text-h6">Adicionar Documento</div>
        </q-card-section>
  
        <q-card-section class="q-gutter-md">
          <q-input v-model="documentosParaAdicionar.nome" label="Nome" filled/>
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
    const documentos = ref([]);

    const columns = ([
      { name: 'nome', label: 'Descrição', align: 'left', field: 'descricao' },
      { name: 'categoria', label: 'Órgão Relacionado', align: 'left', field: 'categoria' },
      { name: 'status', label: 'Status', align: 'left', field: 'situacao' },
      { name: 'acoes', label: 'Ações', align: 'center', field: 'acoes' }
    ])

    const documentosParaEditar = ref({
      id: null,
      nome: '',
      categoria: '',
      situacao: ''
    })


    const documentosParaAdicionar = ref({
      nome: '',
      categoria: '',
      situacao: ''
    })

    onMounted(() => {
      fetchDocumento();
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

    const documentosFiltrados = computed(() => {
      return documentos.value.filter((documento) => {
        return (
      documento.nome.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
      documento.categoria.toLowerCase().includes(pesquisa.value.toLowerCase())
      
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

    function salvarEdicaoDocumento() {
      axios.put(`${url}/api/documentos/modificar-Documento${documentosParaEditar.value.id}`, documentosParaEditar.value)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: 'Documento editado com sucesso!'
          });
          abrirCardEdicaoDocumento.value = false;
          fetchDocumento();
        })
        .catch(error => {
          console.error('Erro ao editar documento:', error);
        });
    }

    const salvarAdicaoDocumento = async () => {
        try {
            const response = await fetch(`${url}/api/documentos/adicionar-Documento`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: documentosParaAdicionar.value.nome,
                categoria: documentosParaAdicionar.value.categoria,
                situacao: documentosParaAdicionar.value.situacao,
                orgaoId: documentosParaAdicionar.value.orgaoSelecionado // se estiver usando órgão
            })
            });

            if (!response.ok) {
             throw new Error('Erro ao salvar documento no servidor');
            }

            abrirCardAdicaoDocumento.value = false;
            fetchDocumento();
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
      fetchDocumento,
      excluirDocumento,
      salvarEdicaoDocumento,
      salvarAdicaoDocumento,
      documentosParaEditar,
      documentosParaAdicionar
    };

}
}) 







</script>