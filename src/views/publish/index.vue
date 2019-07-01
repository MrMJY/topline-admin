<!-- 发布组件 -->
<template>
  <el-card>
    <div class="f14"
         slot="header">
      <span>{{ clear }}文章</span>
    </div>
    <el-form label-width="40px"
             v-loading="publishLoading">
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
        <el-radio-group v-model="publishData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <template v-if="publishData.cover.type > 0">
          <el-row>
            <el-col :span="6"
                    v-for="n in publishData.cover.type"
                    :key="n"
                    gutter="20">
              <over-list v-model="publishData.cover.images[n - 1]"></over-list>
            </el-col>
          </el-row>
        </template>
      </el-form-item>
      <el-form-item size="small"
                    label="频道">
        <channels v-model="publishData.channel_id"></channels>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click.native="handlePublish(false)">{{ clear }}</el-button>
        <el-button type="primary"
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

import OverList from './component';

import { quillEditor } from 'vue-quill-editor';

import Channels from '@/components/channels';
export default {
  name: 'Publish',
  components: {
    Channels,
    quillEditor,
    OverList
  },
  data () {
    return {
      publishData: {
        title: '',
        content: '',
        cover: {
          type: 1,
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
    // console.log('this is current quill instance object', this.editor);
  },
  created () {
    this.isEdit && this.loadArticles(this.isEdit);
  },
  methods: {
    async handlePublish (draft) {
      try {
        this.publishLoading = true;
        if (this.isEdit) {
          await this.$http({
            method: 'PUT',
            url: `/articles/${this.$route.params.id + ''}`,
            params: {
              draft
            },
            data: this.publishData
          });
          this.$message({
            type: 'success',
            message: '更新成功'
          });
        } else {
          await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              draft
            },
            data: this.publishData
          });
          this.$message({
            type: 'success',
            message: '发布成功'
          });
          this.editing = true;
        }
        this.publishLoading = false;
      } catch (err) {
        console.log(err);
        if (this.isEdit) {
          this.$message.error('更新失败');
        } else {
          this.$message.error('发布失败');
        }
        this.publishLoading = false;
      }
    },

    async loadArticles (id) {
      const res = await this.$http({
        method: 'GET',
        url: `/articles/${id + ''}`
      });
      this.publishData = res;
    },

    clearForm () {
      this.editing = false;
      const publish = this.publishData;
      for (let key in publish) {
        if (key === 'id') {
          continue;
        }
        if (typeof publish[key] === 'object') {
          publish[key].type = 1;
          publish[key].images[0] = '';
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
