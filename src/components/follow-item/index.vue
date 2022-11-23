<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div>
    <van-button
      v-if="!artList.is_followed"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="onFollow"
      :loading="loading"
    >关注</van-button>
    <van-button
      v-else
      class="follow-btn"
      round
      size="small"
      @click="onFollow"
      :loading="loading"
    >已关注</van-button>
  </div>
</template>

<script>
import { userFollow, userDelFollow } from '@/api/User'

export default {
  props: ['artList'],
  data () {
    return {
      loading: false
    }
  },
  model: {
    prop: 'artList',
    event: 'changeIsFollowed'

  },
  methods: {
    async onFollow () {
      try {
        this.loading = true
        if (this.artList.is_followed) {
          await userDelFollow(this.artList.aut_id)
        // 取消关注
        } else {
          // 添加关注
          await userFollow(this.artList.aut_id)
        }
        this.$emit('changeIsFollowed')
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 401) {
          this.$toast(err.response.data.message)
        }
      }
      this.loading = false
    }
  }

}
</script>

<style>
</style>
