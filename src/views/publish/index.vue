<!-- 发布组件 -->
<template>
  <el-card>
    <div class="f14"
         slot="header">
      <span>{{ isEdit ? '更新文章' : '发布文章' }}</span>
    </div>
    <el-form label-width="40px">
      <el-form-item size="small"
                    label="标题">
        <el-input v-model="publishData.title"></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="内容">
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor v-model="publishData.content"
                      ref="myQuillEditor"
                      :options="editorOption">
          <!-- @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)" -->
        </quill-editor>
      </el-form-item>
      <el-form-item size="small"
                    label="封面">
        <el-input>{{ isEdit }}</el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="频道">
        <channels v-model="publishData.channel_id"></channels>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   :loading="publishLoading"
                   @click.native="handlePublish(false)">{{ isEdit ? '更新' : '发布' }}</el-button>
        <el-button type="primary"
                   :loading="publishLoading"
                   @click.native="handlePublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor';

import Channels from '@/components/channels';
export default {
  name: 'Publish',
  components: {
    Channels,
    quillEditor
  },
  data () {
    return {
      publishData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      editorOption: {
        // some quill options
      },
      publishLoading: false
    };
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill;
    },
    isEdit () {
      return this.$route.params.id + '';
    }
  },
  mounted () {
    console.log('this is current quill instance object', this.editor);
  },
  created () {
    this.isEdit && this.loadArticles(this.isEdit);
  },
  methods: {
    handlePublish (draft) {
      this.publishLoading = true;
      this.$http({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.publishData
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发布成功'
        });
        this.publishLoading = false;
      }).catch(err => {
        console.log(err);
        this.$message.error('发布失败');
        this.publishLoading = false;
      });
    },

    loadArticles (id) {
      this.$http({
        method: 'GET',
        url: `/articles/${id}`
      }).then(res => {
        // const {title, content, }
        this.publishData = res;
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 40%;
}
</style>
