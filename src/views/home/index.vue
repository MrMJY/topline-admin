<!-- 首页组件 -->
<template>
  <div class="">
    <el-row class="home-header">
      <el-col :span="4">
        <el-row :gutter="10">
          <el-col :span="6">
            <img class="avatar"
                 :src="$store.state.user.photo">
          </el-col>
          <el-col :span="18">
            <p class="f14">头条管理员账号</p>
            <p class="f14"
               style="color: #999">{{ $store.state.user.name }}</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :offset="10"
              :span="10">
        <el-row class="msg">
          <el-col :span="8">
            <p>222</p>
            <p class="f14">粉丝数</p>
          </el-col>
          <el-col :span="8">
            <p>333</p>
            <p class="f14">累计阅读数</p>
          </el-col>
          <el-col :span="8">
            <p>444</p>
            <p class="f14">累计评论数</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="10"
            class="home-body">
      <el-col :span="16">
        <el-card class="news">
          <div slot="header"
               class="f14">
            最新图文
          </div>
        </el-card>
        <el-card class="active">
          <div slot="header"
               class="f14">
            动态
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="fans">
          <div slot="header"
               class="f14">
            粉丝数据
          </div>
          <div class="fans-charts"
               ref="charts"
               style="width: 300px; height:250px">

          </div>
        </el-card>
        <el-card class="graphic">
          <div slot="header"
               class="f14">
            图文数据
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'HomeModel',
  data () {
    return {
      charts: null
    };
  },
  mounted () {
    this.initEcahrs();
    setTimeout(() => {
      this.createCharts();
    }, 3000);
  },
  methods: {
    initEcahrs () {
      this.charts = echarts.init(this.$refs.charts);
    },
    createCharts () {
      this.charts.setOption({
        radar: [{
          indicator: [
            { text: '引用', max: 100 },
            { text: '产量', max: 100 },
            { text: '贡献', max: 100 },
            { text: '热度', max: 100 },
            { text: '口碑', max: 100 }
          ],
          radius: 80,
          center: ['50%', '60%']
        }],
        series: [{
          type: 'radar',
          radarIndex: 0,
          data: [
            {
              value: [85, 72, 65, 70, 85]
            },
            {
              value: [55, 80, 55, 48, 93]
            },
            {
              value: [45, 90, 55, 48, 63]
            }
          ]
        }]
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home-header {
  background-color: #fff;
  padding: 10px;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .f14 {
    margin-top: 2px;
  }
  .msg {
    text-align: center;
    .el-col {
      border-right: 1px solid #ccc;
    }
    .el-col:last-child {
      border-right: 0;
    }
  }
}
.home-body,
.active,
.graphic {
  margin-top: 10px;
  .fans-charts {
    position: relative;
    top: -40px;
  }
}
.news,
.active,
.fans,
.graphic {
  border-radius: 0;
}
</style>
