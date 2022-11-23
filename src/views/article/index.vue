<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left="onClickLeft"></van-nav-bar>

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="artList.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{artList.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="artList.aut_photo" />
          <div slot="title" class="user-name">{{ artList.aut_name }}</div>
          <div slot="label" class="publish-date">{{ artList.pubdate | relativeTime }}</div>
          <followItem
            :artList="artList"
            :changeIsFollowed="artList.is_followed = artList.is_followed"
          ></followItem>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="artList.content">这是文章内容</div>
        <van-divider>正文结束</van-divider>

        <!-- 文章的评论 -->
        <article-pinlun></article-pinlun>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
          <van-icon name="comment-o" info="123" color="#777" />
          <collect-item v-model="artList.is_collected" :articleId="articleId" />
          <like-article v-model="artList.attitude" :articleId="articleId"></like-article>

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticlesByIdFn">点击重试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticlesById } from '@/api/Articles.js'
import { ImagePreview } from 'vant' // 图片预览
import './styles/github-markdown.css'
import followItem from '@/components/follow-item/index.vue'
import collectItem from '@/components/collect-item/index.vue'
import likeArticle from '@/components/like-article/index.vue'
import articlePinlun from '@/components/article-pinlun'

export default {
  data () {
    return {
      isLoading: true,
      artList: {},
      errStatus: false,
      loading: false
    }
  },
  components: {
    followItem,
    collectItem,
    likeArticle,
    articlePinlun
  },
  props: ['articleId'], // 通过路由传参的方式
  created () {
    this.getArticlesByIdFn()
  },
  methods: {
    async getArticlesByIdFn () {
      try {
        // 模拟错误
        // if (Math.random() > 0.5) {
        //   throw new Error()
        // }
        const { data: { data } } = await getArticlesById(this.articleId)

        data.content = `
        <h1>标题一</h1>
        <img class="img-item" src="https://img01.yzcdn.cn/vant/apple-1.jpg"/> 
        <h1>标题二</h1>
        <img class="img-item" src="https://img01.yzcdn.cn/vant/apple-2.jpg"/>
        <h1>标题三</h1>
        <img class="img-item" src="https://img01.yzcdn.cn/vant/apple-3.jpg"/>
        ${data.content} `
        this.artList = data

        setTimeout(() => {
          this.perImg()
        })
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = true
        }
      }
      this.isLoading = false
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    perImg () {
      const img = document.querySelectorAll('.img-item')
      const images = []
      img.forEach((item, startPosition) => {
        images.push(item.src)
        item.onclick = function () {
          ImagePreview(
            {
              images,
              startPosition,
              closeable: true

            }
          )
        }
      })
    }

  }
}
</script>

<style scoped lang="less">
.article-container {
  .page-nav-bar {
    /deep/ .van-icon-arrow-left {
      color: #fff !important;
    }
  }

  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
