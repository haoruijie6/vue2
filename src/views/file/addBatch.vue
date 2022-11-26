<template>
  <el-dialog
      append-to-body
      :close-on-click-modal="false"
      title="上传文件"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="40%">
    <div style="text-align: center">
      <el-upload
          ref="upload"
          class="upload-demo"
          drag
          name="multipartFile"
          :limit="10"
          :headers="headers"
          :action="url"
          :data="data"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :on-exceed="handleExceed"
          :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传,一次最多上传10个文件</em></div>
      </el-upload>
      <div style="margin-top: 20px">
        <el-button icon="el-icon-upload2" type="success" @click="submit">提交</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {getToken} from '@/utils/auth'

export default {
  name: 'addBatch',
  data() {
    return {
      dialogVisible: false,
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      url: 'http://localhost:18888/file/addBatch',
      data: {
        id: null
      }
    }
  },
  methods: {
    open(id) {
      this.data.id = id
      this.dialogVisible = true
    },
    //文件改变调用
    handleExceed() {
      this.$message.error('一次最多上传10个文件,且不能上传文件夹!');
    },
    //上传成功
    uploadSuccess(res) {
      this.$message({
        type: 'success',
        message: '上传成功!'
      });
      this.$parent.$parent.getList()
    },
    //上传失败
    uploadError() {
      this.$message.error('服务器异常请重试!');
    },
    //上传文件
    submit() {
      this.$refs.upload.submit();
    },
    close() {

      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
