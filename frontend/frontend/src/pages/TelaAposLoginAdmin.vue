<template>
      <div class="q-pa-md">
    <q-btn-dropdown color="black" class="full-width" label="Menu de funcionalidades">
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Normas</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Orgãos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section>
            <q-item-label>Tipo de Documento</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
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

        <template v-slot:body-cell-acoes="{ row }">
            <div class="row items-center q-gutter-sm" style="flex-wrap: nowrap;">
                <q-btn 
                    icon="picture_as_pdf"
                    color="red" 
                    round
                    size="sm" 
                    @click="verPDF(row)"
                />
                <q-btn 
                    icon="edit"
                    color="yellow" 
                    round
                    size="sm" 
                    @click="abrirEdicao(row.id)"
                />
                 <q-btn 
                    icon="toggle_on"
                    color="black" 
                   round
                   size="sm" 
                   @click="setStatusNorma(row.id)"
                />
                <q-btn 
                   icon="delete"
                   color="purple" 
                   round
                   size="sm" 
                   @click="deleteNorma(row.id)"
                />       
    </div>
</template>  
    </q-table> <br/>
    <div class="row items-right q-mt-md">
        <q-btn icon="logout" label="Sair" color="black" class="full-width"  :to="{ name: 'home' }" />
    </div>

 <q-dialog v-model="abrirCardEdicao" >
  <q-card class="q-pa-md q-mt-md" style="max-width: 800px; margin: auto;">
  <q-card-section>
    <div class="text-h6">Editar Norma</div>
  </q-card-section>

  <q-card-section class="q-gutter-md">
    <q-input v-model="normaParaEditar.orgao" label="Órgão" filled />
    <q-input v-model="normaParaEditar.tipo" label="Tipo" filled />
    <q-input v-model="normaParaEditar.numero" label="Número" filled />
    <q-input v-model="normaParaEditar.data" label="Data" type="date" filled />
    <q-input v-model="normaParaEditar.ementa" label="Ementa" type="textarea" filled />
    <q-toggle v-model="normaParaEditar.ativo" label="Ativo" />
    <q-toggle v-model="normaParaEditar.statusDisponivel" label="Status Disponível" />
  </q-card-section>

  <q-card-actions>
    <q-btn flat label="Cancelar" color="grey" @click="abrirCardEdicao = false" />
    <q-btn label="Salvar" color="black" @click="salvarEdicao" />
  </q-card-actions>
</q-card>
 </q-dialog>

    
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useQuasar } from 'quasar'
const url = import.meta.env.VITE_API_URL
const urlPDF = import.meta.env.VITE_API_URL_PDF

export default defineComponent({
    name: 'TelaAposLoginAdmin',
    setup() {
        const pesquisa = ref('')
        const normasAdmin = ref([])
        const $q = useQuasar()
        const abrirCardEdicao = ref(false);
        // const normaParaEditar = ref()
        
        const columns = [
            { name: 'orgao', label: 'Órgão', align: 'left', field: 'orgao', sortable: true },
            { name: 'tipo', label: 'Tipo de Documento', align: 'left', field: 'tipo', sortable: true },
            { name: 'numero', label: 'Número', align: 'left', field: 'numero', sortable: true },
            { name: 'data', label: 'Data', align: 'left', field: 'data', sortable: true },
            { name: 'ementa', label: 'Ementa', align: 'left', field: 'ementa', sortable: true, style: 'max-width: 750px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' },
            { name: 'statusDisponivel', label: 'Status', align: 'left', field: 'statusDisponivel', sortable: true },
            { name: 'acoes', label: 'Ações', align: 'center', field: 'acoes', sortable: true, style: 'min-width: 120px' },
        ]

        const normaParaEditar = ref({
          id: null,
          orgao: '',
          tipo: '',
          numero: '',
          data: '',
          ementa: '',
          ativo: false,
          statusDisponivel: false
        });
        

        onMounted( async () => {
          await fetchNormas();
        })

        const normasFiltradas = computed(() => {
            return normasAdmin.value.filter((normasAdmin) => {
              if (!normasAdmin || !normasAdmin.orgao) return false;
                return (
                    normasAdmin.orgao.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    normasAdmin.tipo.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    normasAdmin.numero.toString().includes(pesquisa.value) ||
                    normasAdmin.data.toString().includes(pesquisa.value) ||
                    normasAdmin.statusDisponivel.toString().includes(pesquisa.value) ||
                    normasAdmin.ementa.toLowerCase().includes(pesquisa.value.toLowerCase())
                )
            })
        })
        

        const verPDF = async (norma) => {
            try {
              const pdfURL = `${urlPDF}${norma.link}`;

              window.open(pdfURL, '_blank')
                
            } catch (error) {
                console.error('Erro ao buscar PDF:', error)
            }
        }

        const fetchNormas = async () => {
          try {
                const resposta = await axios.get(`${url}/api/normas/admin`)
                normasAdmin.value = resposta.data || [];
            } catch (error) {
                console.error('Erro ao buscar posts:', error)
                normasAdmin.value = [];
            }
        }

        const abrirEdicao = async (id) => {
          try {
            const response = await axios.get(`${url}/api/normas/listar-para-edicao/${id}`)
            if (response.data) {
              normaParaEditar.value = {...response.data };
              abrirCardEdicao.value = true;
            }  
          } catch (error) {
            console.error('Erro ao buscar norma para edição:', error)
            $q.notify({ message: 'Erro ao buscar norma para edição.', icon: 'times', color: 'red' });
          }
        }

        const deleteNorma = async (id) => {
            try{
              $q.dialog({
                title: 'Atenção',
                message: 'Você tem certeza que deseja apagar?',
                cancel: true,
                persistent: true
             }).onOk(async () => {
                const response = await fetch(`${url}/api/normas/excluir/${id}`, {
                  method: 'DELETE',
                  headers: {
                   'Content-Type': 'application/json'
                    }, 
                });
                if (response.ok) {
                 $q.notify({ message: 'Apagado com sucesso', icon: 'check', color:'green' });
                 await fetchNormas()
                 } else {
                  $q.notify({ message: 'Erro ao apagar.', icon: 'times', color: 'red' });
                 }
              });
            } catch (error) {
              console.error(error);
              $q.notify({ message: 'Erro ao apagar.', icon: 'times', color: 'red' });
           }
        }       

      const setStatusNorma = async (id) => {
        try{
              $q.dialog({
                title: 'Atenção',
                message: 'Você tem certeza que deseja mudar o status da norma?',
                cancel: true,
                persistent: true
             }).onOk(async () => {
                const response = await fetch(`${url}/api/normas/modificar-status/${id}`, {
                  method: 'DELETE',
                  headers: {
                   'Content-Type': 'application/json'
                    },      
                });
                const result = await response.json();
                if (response.ok) {
                 $q.notify({ message: result.message , icon: 'check', color:'green' });
                 await fetchNormas()
                 } else {
                  $q.notify({ message: result.message || "Erro ao modificar o status da norma.", icon: 'times', color: 'red' });
                 }
              });
            } catch (error) {
              console.error(error);
              $q.notify({ message: 'Erro ao apagar.', icon: 'times', color: 'red' });
           }
      }

      const editarNorma = (async (id) =>{
        try {
          const response = await fetch(`${url}/api/normas/modificar/${id}`, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(normaParaEditar.value)
        });
        console.log(response);

        if (response.ok) {
          $q.notify({ message: 'Norma atualizada com sucesso.', color: 'green', icon: 'check' });
          abrirCardEdicao.value = false;
          await fetchNormas(); // Atualiza a tabela após edição
        } else {
         $q.notify({ message: 'Erro ao atualizar norma.', color: 'red', icon: 'error' });
        }
      } catch (error) {
        console.error(error);
        $q.notify({ message: 'Erro ao atualizar norma.', color: 'red', icon: 'error' });
      }
    })

    const salvarEdicao = async () => {
      try {
        const response = await axios.put(`${url}/api/normas/modificar/${normaParaEditar.value.id}`, normaParaEditar.value);
        if (response.status === 200) {
          $q.notify({ message: 'Norma atualizada com sucesso.', color: 'green', icon: 'check' });
          abrirCardEdicao.value = false;
          await fetchNormas();
        } else {
          throw new Error('Erro na resposta');
        }
      } catch (error) {
          console.error(error);
          $q.notify({ message: 'Erro ao atualizar norma.', color: 'red', icon: 'error' });
      }
};

        return {
            pesquisa,
            normasAdmin,
            normaParaEditar,
            columns,
            normasFiltradas,
            abrirCardEdicao,
            editarNorma,
            abrirEdicao,
            fetchNormas,
            setStatusNorma,
            salvarEdicao,
            verPDF,
            deleteNorma
        }
    }
})

</script>