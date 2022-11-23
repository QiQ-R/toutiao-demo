<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <van-cell v-for="item,index in list" :key="index" :title="item.aut_name">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="item.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
      <div slot="label">
        <p style="color: #363636;">{{ item.content }}</p>
        <p>
          <span style="margin-right: 10px;">{{item.pubdate | relativeTime}}</span>
          <van-button size="mini" type="default">回复{{ item.reply_count }}</van-button>
        </p>
      </div>

      <template v-slot:right>
        <div>
          <van-icon name="like-o" />
          <span>{{ item.like_count || '赞'}}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  components: {},
  props: ['list'],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
