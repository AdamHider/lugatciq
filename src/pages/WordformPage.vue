<template>
  <q-page class="bg-white q-pa-sm">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">{{ wordform.wordform }}</div>
        <div class="text-subtitle2">Origin:
          <router-link :to="`/lemma-${wordform.word_id}`">
            {{ wordform.word }}
          </router-link>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="(omonym, omonymIndex) in wordform.omonyms" :key="omonymIndex">
            <q-item-section>{{ omonym.wordform }}</q-item-section>
            <q-item-section>{{ omonym.word }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator inset />

    </q-card>
  </q-page>
</template>

<script setup >
import { api } from '../services/index'
import { useRoute } from 'vue-router'
import { ref, onActivated, onMounted } from 'vue'

const route = useRoute()
const wordform = ref({})

const load = async function () {
  const wordformResponse = await api.wordform.getItem({ wordform_id: route.params.wordform_id })
  if (wordformResponse.error) {
    wordform.value = {}
    return
  }
  wordform.value = wordformResponse
}
onMounted(async () => {
  await load()
})
onActivated(async () => {
  await load()
})
</script>
