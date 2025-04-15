<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 1000px; max-width: 100%; ">
        
    <q-card-section class="flex flex-left flex-column watermark-container">
      <q-img 
        src="~assets/logoCp.png"
        width="80px"
        height="80px"
        class="q-mb-sm"> 
      </q-img>
      <div class="text-h6 text-center">LEGIS-PCPE</div>
    </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset">
          <q-input
            icon="mail"
            v-model="email"
            label="E-mail"
            type="email"
            lined
            required
            class="q-mb-md"
          />
          <q-input
            icon="lock"
            v-model="password"
            label="Senha"
            type="password"
            lined
            required
            class="q-mb-md"
          />
          <div class="row items-center q-mt-md">
            <q-btn type="submit" label="Entrar" color="black" width="100px" height="120px" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<!-- <style scoped>
.watermark-container {
  position: relative;
  background-image: url('~assets/logoCp.png');
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center;
  width: 100%; 
  height: 100%; 
  opacity: 0.3;
}
.watermark-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('~assets/logoCp.png');
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center;
  opacity: 0.3;
}
</style> -->

<script setup>
import { ref } from 'vue'

// Variáveis reativas para armazenar os dados do formulário
const email = ref('')
const password = ref('')
// const emailDomain = '@policiacivil.pe.gov.br'

// const updateEmail = (value) => {
//   if (!value.inclusdes(emailDomain)) {
//     email.value = value + emailDomain
//   } else {
//     email.value = value
//   }
// }


const onSubmit = () => {
  if (email.value && password.value) {
    console.log('E-mail:', email.value)
    console.log('Senha:', password.value)
    alert('Login realizado com sucesso!')
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