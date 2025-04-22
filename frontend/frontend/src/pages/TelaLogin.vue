<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 1000px; max-width: 100%;">
      <q-card-section class="flex flex-center">
        <q-img 
          src="~assets/logoCp.png"
          width="80px"
          height="80px"
          class="q-mr-sm" 
          fit="contain">
        </q-img>
        <q-toolbar-title>
          LEGIS-PCPE <br/>
          Polícia Civil de Pernambuco
        </q-toolbar-title>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset">
          <q-input
            icon="mail"
            v-model="email"
            class="q-mb-md"
            suffix="@policiacivil.pe.gov.br"
            hint="Email"
            @input="updateEmail">
          </q-input>


          <q-input
            icon="lock"
            v-model="password"
            hint="Senha"
            type="password"
            lined
            required
            class="q-mb-md"
          />
          <!-- <q-btn
            label="Verificar"
            color="primary"
            @click="executeCaptcha"
            class="q-mb-md"
          /> -->
          <div class="row items-center q-mt-md">
            <q-btn type="submit" label="Entrar" color="black" width="100px" height="120px" />
          </div> <br/>
          <div>
            <q-btn label="Não sou Administrador" color="black" width="100px" height="120px" :to="{ name: 'TelaAposLoginUser' }" />
          </div>
        </q-form> 
      </q-card-section>
    </q-card>
  </q-page>
</template>


<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const emailDomain = '@policiacivil.pe.gov.br'

const updateEmail = (value) => {
  email.value = value.trim()
}


const onSubmit = () => {
  const fullEmail = email.value + emailDomain
  if (email.value && password.value) {
    console.log('E-mail:', fullEmail)
    console.log('Senha:', password.value)
    alert(`Login realizado com sucesso com o email: ${fullEmail}`)
    onReset()
  } else {
    alert('Por favor, preencha todos os campos.')
  }
}

// Função chamada ao resetar o formulário
const onReset = () => {
  email.value = ''
  password.value = ''
}
</script>

