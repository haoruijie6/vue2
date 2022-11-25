<template>
  <el-dialog
      :modal-append-to-body="false"
      title="上传文件"
      :visible.sync="dialogVisible"
      width="45%">
    <el-upload
        ref="upload"
        class="upload-demo"
        drag
        name="file"
        action="/"
        :on-change="changeUpload"
        :auto-upload="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div style="margin-top: 20px">
      <el-button icon="el-icon-upload2" type="success" @click="submit">提交</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import {getToken} from '@/utils/auth'

export default {
  name: 'add',
  data() {
    return {
      rules: {
        fileName: [
          {required: true, message: '请输入文件名称', trigger: "blur"}
        ]
      },
      dialogVisible: false,
      fileList: [],
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    //文件改变调用
    changeUpload(file, fileList) {
      this.fileList = fileList;
    },
    //上传文件
    submit() {
      if (this.fileList.length > 1) {
        this.$message.error('当前目录只能上传一个文件!');
        return
      }
      //将上传的数据传成json
      let formData = new FormData();
      formData.append("multipartFile", this.fileList[0].raw);
      axios.post("http://localhost:18888/file/addOne", formData, {
            headers: {
              'Authorization': 'Bearer ' + getToken(),
              "Content-Type": 'multipart/form-data;'
            }
          }
      ).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: '上传成功',
            type: 'success'
          });
          this.$parent.updateFileName(res.data.data.msg)
          this.dialogVisible = false
        } else {
          this.$message.error('上传失败');
        }
      }).catch((e) => {
        this.$message.error("上传失败,请检查文件类型!(禁止上传文件夹)");
      })
    },
  }
}
</script>

<style scoped>

</style>
