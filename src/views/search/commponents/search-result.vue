<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="load"
    :error.sync="error"
  >
    <van-cell v-for="(item,index) in list" :key="item.id + index" :title="item.title" />
  </van-list>
</template>

<script>
import { getSearch } from '@/api/Search.js'
export default {
  data () {
    return {
      list: [],
      page: 1,
      per_page: 20,
      loading: false,
      finished: false,
      error: false
    }
  },
  props: ['searchTest'],
  methods: {
    async load () {
      try {
        const { data: { data: { results, total_count } } } = await getSearch({
          page: this.page,
          per_page: this.per_page,
          q: this.searchTest
        })
        console.log(results, total_count)
        this.loading = false
        this.page += 1
        this.list = [...this.list, ...results]
        if (this.list.length >= total_count) {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style>
</style>
