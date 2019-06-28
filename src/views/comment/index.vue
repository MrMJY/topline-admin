<!-- 评论列表组件 -->
<template>
  <el-card id="comment-list">
    <div class="f14"
         slot="header">
      评论管理
    </div>
    <el-table :data="commentList"
              v-loading="load_comments">
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
          <el-switch :disabled="scope.row.chang_status"
                     v-model="scope.row.comment_status"
                     @change="handleChangeStatus(scope.row)"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   class="page-list"
                   :disabled="load_comments"
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
      current_page: 1,
      load_comments: false
    };
  },
  created () {
    this.loadCommentLists();
  },
  methods: {
    loadCommentLists (page = 1) {
      this.load_comments = true;
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          response_type: 'comment'
        }
      }).then(res => {
        // console.log(res);
        res.results.forEach(item => {
          item.chang_status = false;
        });
        this.total_count = res.total_count;
        this.commentList = res.results;
        this.load_comments = false;
      }).catch(err => {
        console.log(err);
        this.$message.error('获取失败');
      });
    },

    handleCurrentChange (page) {
      this.current_page = page;
      this.loadCommentLists(page);
    },

    handleChangeStatus (item) {
      item.chang_status = true;
      // console.log(item);
      this.$http({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: item.id + ''
        },
        data: {
          allow_comment: item.comment_status
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: item.comment_status ? '开启评论' : '关闭评论'
        });
        item.chang_status = false;
      }).catch(err => {
        console.log(err);
        item.comment_status = !item.comment_status;
        item.$message.error('操作失败');
        item.chang_status = false;
      });
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
