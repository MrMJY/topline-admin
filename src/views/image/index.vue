<!-- 素材组件 -->
<template>
  <el-card>
    <div class="f14"
         slot="header">
      素材管理
    </div>
    <div class="title">
      <el-radio-group v-model="selected"
                      size="mini">
        <el-radio-button label="全部"
                         @click.native="loadImages(false)"></el-radio-button>
        <el-radio-button label="收藏"
                         @click.native="loadImages(true)"></el-radio-button>
      </el-radio-group>
      <el-upload action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                 :headers="{Authorization: `Bearer ${$store.state.user.token}`}"
                 name="image"
                 :show-file-list="false"
                 :on-success="handleSuccess">
        <el-button size="small"
                   type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-row>
      <el-col :span="4"
              class="box-image"
              v-for="item in images"
              :key="item.id">
        <el-card class="box-image">
          <img :src="item.url">
          <div>
            <el-button :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
                       circle
                       @click="handleCollect(item)"></el-button>
            <el-button icon="el-icon-delete"
                       @click="handleDlete(item)"
                       circle></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'ImagesList',
  data () {
    return {
      images: [],
      selected: '全部',
      total_count: null
    };
  },
  created () {
    this.loadImages();
  },
  methods: {
    loadImages (collect = false) {
      this.$http({
        method: 'GET',
        url: '/user/images',
        params: {
          collect
        }
      }).then(res => {
        this.total_count = res.total_count;
        this.images = res.results;
      });
    },

    handleCollect (item) {
      item.is_collected = !item.is_collected;
      this.$http({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect: item.is_collected
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: `${item.is_collected ? '' : '取消'}收藏成功`
        });
      }).catch(err => {
        console.log(err);
        this.$message.error(`${item.is_collected ? '' : '取消'}收藏失败`);
        item.is_collected = !item.is_collected;
      }); ;
    },

    handleDlete (item) {
      this.$http({
        method: 'DELETE',
        url: `/user/images/${item.id}`
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        if (this.selected === '全部') {
          this.loadImages();
        } else {
          this.loadImages(true);
        }
      });
    },

    handleSuccess () {
      this.$message({
        type: 'success',
        message: '上传成功'
      });
      this.loadImages();
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
}
.box-image {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  img {
    border-radius: 6px;
    width: 100px;
    height: 100px;
    padding-bottom: 20px;
  }
}
</style>
