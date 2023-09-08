<style>
.text-underline:hover{
  text-decoration: underline;
}
</style>
<template>
    <q-table
      dense
      flat bordered
      ref="tableRef"
      title="Wordforms"
      separator="cell"
      :rows="rows"
      :columns="columns"
      row-key="wordform_id"
      :loading="loading"
      v-model:pagination="pagination"
      hide-pagination
      binary-state-sort
    >
      <template v-slot:body-selection="scope">
        <q-toggle v-model="scope.selected" />
      </template>
      <template v-slot:top-row>
        <q-tr>
          <q-td>
            <q-input borderless dense v-model="filterSet.wordform" label="Enter wordform...">
              <template v-slot:append>
                <q-icon v-if="filterSet.wordform !== ''" name="close" @click="filterSet.wordform = ''" class="cursor-pointer" />
                <q-icon name="search" />
              </template>
            </q-input>
          </q-td>
          <q-td>
            <q-input borderless  dense v-model="filterSet.word" label="Enter word..." >
              <template v-slot:append>
                <q-icon v-if="filterSet.word !== ''" name="close" @click="filterSet.word = ''" class="cursor-pointer" />
                <q-icon name="search" />
              </template>
            </q-input>
          </q-td>
          <q-td>
            <q-input borderless dense v-model="filterSet.template" label="Enter set...">
              <template v-slot:append>
                <q-icon v-if="filterSet.template !== ''" name="close" @click="filterSet.template = ''" class="cursor-pointer" />
                <q-icon name="search" />
              </template>
            </q-input>
          </q-td>
          <q-td>
            <q-btn
              @click="loadData()"
              label="Search"
            />
          </q-td>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" >
          <q-td class="q-pa-sm" key="wordform" :props="props">
            <a class="cursor-pointer text-underline" @click="router.push(`/wordform-${props.row.wordform_id}`)">{{ props.row.wordform }}</a>
          </q-td>
          <q-td key="word" :props="props">
            <a class="cursor-pointer text-underline" @click="router.push(`/lemma-${props.row.word_id}`)">{{ props.row.word }}</a>
          </q-td>
          <q-td key="template" :props="props">
            <a class="cursor-pointer text-underline" @click="router.push(`/set-${props.row.set_id}`)">{{ props.row.template }}</a>
          </q-td>
          <q-td key="is_disabled" :props="props">
            <q-toggle
              dense
              v-model="props.row.is_disabled"
              :true-value="null"
              false-value="1"
              />
          </q-td>
        </q-tr>
      </template>

    </q-table>
    <div class="q-pa-lg flex flex-center">
      <q-select dense v-model="pagination.rowsPerPage" @update:model-value="loadData()"  :options="[10, 20, 50]"  />
      <q-pagination
        v-model="pagination.page"  @update:model-value="loadData()"
        :max="totalPages"
        :max-pages="6"
        :boundary-numbers="false"
        direction-links
      />
      <b>{{ totalsPagination }}</b>
    </div>
</template>

<script setup>
import { api } from '../services/index'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const error = ref({})
const tableRef = ref()
const rows = ref([])
const loading = ref(false)
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  rowsNumber: 0
})

const totalPages = computed(() => pagination.value.rowsNumber ? pagination.value.rowsNumber / pagination.value.rowsPerPage : 5000)
const totalsPagination = computed(() => `${rows.value.length * (pagination.value.page - 1)}-${rows.value.length * pagination.value.page}/${pagination.value.rowsNumber}`)
const filterSet = ref({
  language_id: 1,
  wordform: '',
  word: '',
  template: ''
})

const columns = [
  { name: 'wordform', align: 'left', label: 'Wordform', field: 'wordform', sortable: true },
  { name: 'word', align: 'left', label: 'Word', field: 'word', sortable: true },
  { name: 'template', align: 'left', label: 'Set', field: 'template', sortable: true },
  { name: 'is_disabled', label: 'Active', field: 'is_disabled', sortable: true }
]

async function getTotalRows () {
  const wordformTotalRowsResponse = await api.wordform.getTotalRows({ fields: filterSet.value })
  if (wordformTotalRowsResponse.error) {
    error.value = wordformTotalRowsResponse
    return []
  }
  pagination.value.rowsNumber = wordformTotalRowsResponse.total
}

async function loadData () {
  loading.value = true
  const offset = (pagination.value.page - 1) * pagination.value.rowsPerPage
  // fetch data from "server"
  const returnedData = await getWordforms({
    offset,
    limit: pagination.value.rowsPerPage,
    fields: filterSet.value
  })

  if (returnedData.length > 0) {
    for (const i in returnedData) {
      returnedData[i].templateSplitted = returnedData[i].template.split('|')
    }
    // clear out existing data and add new
    rows.value = returnedData
  }
  loading.value = false
  getTotalRows()
}

const getWordforms = async function (filter) {
  const wordformListResponse = await api.wordform.getList(filter)
  if (wordformListResponse.error) {
    error.value = wordformListResponse
    return []
  }
  return wordformListResponse
}
onMounted(async () => {
  // get initial data from server (1st page)
  await loadData()
})
</script>
