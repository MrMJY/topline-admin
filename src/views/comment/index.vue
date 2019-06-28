<!-- 评论列表组件 -->
<template>
  <el-card id="comment-list">
    <div class="f14"
         slot="header">
      评论管理
    </div>
    <el-table :data="commentList">
      <el-table-column prop="title"
                       align="center"
                       label="标题"></el-table-column>
      <el-table-column prop="total_comment_count"
                       align="center"
                       label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count"
                       align="center"
                       label="粉丝评论数"></el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.comment_status"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   class="page-list"
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="total_count">
    </el-pagination>
  </el-card>
</template>

<script>

export default {
  name: 'CommentList',
  data () {
    return {
      commentList: [],
      total_count: 1,
      current_page: 1
    };
  },
  created () {
    this.loadCommentLists();
  },
  methods: {
    loadCommentLists (page = 1) {
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          response_type: 'comment'
        }
      }).then(res => {
        console.log(res);
        this.total_count = res.total_count;
        this.commentList = res.results;
      });
    },

    handleCurrentChange (page) {
      this.current_page = page;
      this.loadCommentLists(page);
    }
  }
};
</script>
<style lang="less" scoped>
.page-list {
  text-align: center;
  margin-top: 20px;
}
</style>
