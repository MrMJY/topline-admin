<!-- 发布组件 -->
<template>
  <el-card>
    <div class="f14"
         slot="header">
      <span>{{ clear }}文章</span>
    </div>
    <el-form label-width="40px">
      <el-form-item size="small"
                    label="标题">
        <el-input v-model="publishData.title"></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="内容">
        <quill-editor v-model="publishData.content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item size="small"
                    label="封面">
        <el-input></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="频道">
        <channels v-model="publishData.channel_id"></channels>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   :loading="publishLoading"
                   @click.native="handlePublish(false)">{{ clear }}</el-button>
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
      publishLoading: false,
      editing: true
    };
  },
  computed: {
    editor () {
      // if (!this.isEdit) {
      //   this.clearForm();
      // }
      return this.$refs.myQuillEditor.quill;
    },
    isEdit () {
      return this.$route.params.id;
    },
    clear () {
      if (this.isEdit) {
        return '更新';
      } else {
        if (this.editing) {
          this.clearForm();
        }
        return '发布';
      }
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
      if (this.isEdit) {
        this.$http({
          method: 'PUT',
          url: `/articles/${this.$route.params.id + ''}`,
          params: {
            draft
          },
          data: this.publishData
        }).then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          });
          this.publishLoading = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error('更新失败');
          this.publishLoading = false;
        });
      } else {
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
          this.clearForm();
          this.editing = true;
          this.publishLoading = false;
        }).catch(err => {
          console.log(err);
          this.$message.error('发布失败');
          this.publishLoading = false;
        });
      }
    },

    loadArticles (id) {
      this.$http({
        method: 'GET',
        url: `/articles/${id + ''}`
      }).then(res => {
        this.publishData = res;
      });
    },

    clearForm () {
      this.editing = false;
      const publish = this.publishData;
      for (let key in publish) {
        if (typeof publish[key] === 'object') {
          publish[key].type = 0;
          publish[key].images = [];
        } else {
          publish[key] = '';
        }
      }
    },

    onEditorBlur () { },
    onEditorFocus () { },
    onEditorReady () { }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  width: 40%;
}
</style>
