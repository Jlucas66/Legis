<template>
    <q-layout view="lHh Lpr lFf" >
      <q-header elevated class="bg-black text-white">
        <q-toolbar>  
         <q-img 
            src="~assets/logoCpT.png"
            width="80px"
            height="80px"
            class="q-mr-sm"
            fit="contain"> 
  
          </q-img>
  
          <q-toolbar-title>
            LEGIS-PCPE <br/>
            Polícia Civil de Pernambuco
          </q-toolbar-title>
  
        
        </q-toolbar>
      </q-header>
  
      <q-drawer
        v-model="leftDrawerOpen"
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
  </script>
  