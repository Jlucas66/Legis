<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-img 
          src="~assets/CpLogo.png"
          width="80px"
          height="80px"
          class="q-mr-sm"> 

        </q-img>

        <q-toolbar-title>
          LEGIS-PCPE <br/>
          Polícia Civil de Pernambuco
        </q-toolbar-title>

      
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Unisa',
    caption: '',
    icon: 'home',
    link: ''
  },
  {
    title: 'Normas',
    caption: '',
    icon: 'code',
    link: ''
  },
  {
    title: 'Órgãos',
    caption: '',
    icon: 'chat',
    link: ''
  },
  {
    title: 'Tipo de Documento',
    caption: '',
    icon: 'drive_file_move',
    link: ''
  },
  {
    title: 'Sair',
    caption: '',
    icon: 'exit',
    link: ''
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
