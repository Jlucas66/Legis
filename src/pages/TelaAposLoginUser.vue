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
  <q-table
    title="Normas"
    :rows="normasFiltradasUser"
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
      </div>
    </template>
  </q-table>
</q-card-section>

<q-separator />

<q-card-section>
  <div class="row items-center q-mt-md">
    <q-btn
      type="submit"
      label="Normas Internas"
      color="black"
      class="full-width"
      :to="{ name: 'TelaLogin' }"
    />
  </div>
</q-card-section>

</q-card>


</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import axios from 'axios'
const url = import.meta.env.VITE_API_URL
const urlPDF = import.meta.env.VITE_API_URL_PDF

export default defineComponent({
    name: 'TelaAposLoginUser',
    setup() {
        const pesquisa = ref('')
        const normas = ref([])

        const columns = ([
            { name: 'categoria', label: 'Órgão', align: 'left', field: 'categoria', sortable: true },
            { name: 'tipo', label: 'Tipo de Documento', align: 'left', field: 'tipo', sortable: true },
            { name: 'numero', label: 'Número', align: 'left', field: 'numero', sortable: true },
            { name: 'data', label: 'Data', align: 'left', field: 'data', sortable: true },
            { name: 'ementa', label: 'Ementa', align: 'left', field: 'ementa', sortable: true, style: 'max-width: 750px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;' },
            { name: 'acoes', label: 'Ações', align: 'center', field: 'acoes', sortable: true, style: 'max-width: 150px' },
        ])

        onMounted( async () => {
            try {
                console.log('URL', `${url}/api/normas`)
                const resposta = await axios.get(`${url}/api/normas`)
                console.log('Resposta da API:', resposta.data)
                normas.value = resposta.data
            } catch (error) {
                console.error('Erro ao buscar posts:', error)
            }
        })

        const getPosts = async () => {
            try {
                const resposta = await axios.get(`${url}/api/normas`)
                normas.value = resposta.data
            } catch (error) {
                console.error('Erro ao buscar posts:', error)
            }
        }

        const normasFiltradasUser = computed(() => {
            return normas.value.filter((norma) => {
                return (
                    norma.categoria.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    norma.tipo.toLowerCase().includes(pesquisa.value.toLowerCase()) ||
                    norma.numero.toString().includes(pesquisa.value) ||
                    norma.data.toString().includes(pesquisa.value) ||
                    norma.ementa.toLowerCase().includes(pesquisa.value.toLowerCase())
                );
            });
        });


        const verPDF = async (norma) => {
            try {
                const pdfURL = `${urlPDF}${norma.link}`;
                window.open(pdfURL, '_blank')
                
            } catch (error) {
                console.error('Erro ao buscar PDF:', error)
            }
        }

        return {
            normas,
            columns,
            normasFiltradasUser,
            verPDF,
            getPosts,
            pesquisa
         }
        }
})


</script>