<script setup>

</script>

<template>
  <div class="link-content">
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="link shop-link">
          <a href="http://shop.xduyg.top" target="_blank">
            <img src="@/assets/images/shop-logo.png" alt="">
            <div class="title">电商项目跳转 <i class="iconfont icon-direction-right"></i></div>
          </a>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="link shop-code-github">
          <a href="https://github.com/yagaoyg/vue3-xtx" target="_blank">
            <i class="iconfont icon-GitHub"></i>电商项目源码链接(GitHub)
          </a>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="link shop-code-gitee">
          <a href="https://gitee.com/ya_gao_jun/vue3--e-commerce-project---xtx" target="_blank">
            <i class="iconfont icon-gitee"></i>电商项目源码链接(Gitee)
          </a>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="link code-github">
          <a href="https://github.com/yagaoyg/yagao" target="_blank">
            <i class="iconfont icon-GitHub"></i>本网站源码链接(GitHub)
          </a>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="link code-gitee">
          <a href="https://gitee.com/ya_gao_jun/vue3-personal-homepage" target="_blank">
            <i class="iconfont icon-gitee"></i>本网站源码链接(Gitee)
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.link-content {
  margin-top: 30px;

  .link {
    margin-top: 15px;
    height: 80px;

    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);

    color: @btext;
    font-size: 22px;
    // text-align: center;
    line-height: 80px;

    a {
      width: 100%;
      height: 100%;

      text-decoration: none;
      color: @btext;

      img {
        margin-left: 2%;
        height: 100%;
      }

      .title {
        font-size: 24px;

        .iconfont {
          font-size: 24px;
        }
      }
    }
  }

  .shop-link {
    background: linear-gradient(to right, rgba(255, 255, 255, 0.8), #42b1d5);

    a {
      display: flex;
      color: @wtext;

      .title {
        margin-left: 25%;
      }
    }
  }

  .shop-code-github {
    background-color: #0D1117;

    a {
      display: block;
      color: @wtext;
      text-align: center;

      .iconfont {
        font-size: 30px;
      }
    }
  }

  .shop-code-gitee {
    background-color: #303643;

    a {
      display: block;
      color: @wtext;
      text-align: center;

      .iconfont {
        font-size: 30px;
        color: #C71D23;
      }
    }
  }

  .code-github {
    background-color: #0D1117;
    font-size: 24px;

    a {
      display: block;
      color: @wtext;
      text-align: center;

      .iconfont {
        font-size: 40px;
      }
    }
  }

  .code-gitee {
    background-color: #303643;
    font-size: 24px;

    a {
      display: block;
      color: @wtext;
      text-align: center;

      .iconfont {
        font-size: 40px;
        color: #C71D23;
      }
    }
  }
}
</style>