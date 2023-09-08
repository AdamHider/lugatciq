<template>
  <q-infinite-list
    :loadMore="loadMore"
    @onLoaded="onLoaded"
  >
        <template v-slot:loading>
            <div class="row justify-center q-my-md">
            <q-spinner color="primary" name="dots" size="40px" />
            </div>
        </template>
        <q-card  v-for="(achievementItem, index) in achievements" :key="index" class="q-ma-sm">
            <q-card-section >
            <q-item class="q-pa-none bg-white">
                <q-item-section avatar>
                    <q-avatar size="80px">
                        <q-img
                          :src="achievementItem.image"
                          loading="lazy"
                          spinner-color="white"/>
                    </q-avatar>
                </q-item-section>
                <q-item-section class="text-left">
                    <div class="text-bold">{{achievementItem.title}}</div>
                    <div class="text-grey">{{achievementItem.description}}</div>
                    <div class="row q-ma-sm">
                        <div class="col text-left"></div>
                        <div class="col text-right">
                            <b>{{achievementItem.progress.current}}/{{achievementItem.progress.target}}</b>
                        </div>
                    </div>
                    <q-linear-progress
                        :color="(achievementItem.progress.percentage/100) >= 1 ? 'positive' : 'primary'"
                        :value="(achievementItem.progress.percentage/100)"
                        size="12px"
                        rounded
                    ></q-linear-progress>
                </q-item-section>
            </q-item>
            </q-card-section >
        </q-card >
    </q-infinite-list>
</template>

<script setup>
import { api } from '../services/index'
import { ref } from 'vue'

const achievements = ref([])
const error = ref({})

const loadMore = async function (filter) {
  const achievementListResponse = await api.achievement.getList(filter)
  if (achievementListResponse.error) {
    error.value = achievementListResponse
    return []
  }
  return achievementListResponse
}
const onLoaded = function (response) {
  achievements.value = response
}

</script>
