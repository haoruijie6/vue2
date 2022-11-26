<template>
  <el-dialog
      v-if="dialogVisible"
      :modal-append-to-body="false"
      title="文件属性"
      :visible.sync="dialogVisible"
      width="30%">
    <div v-loading="loading">
      <el-descriptions border :labelStyle="{width:'90px'}" :column="1">
        <el-descriptions-item label="文件名">{{data.folderName}}</el-descriptions-item>
        <el-descriptions-item label="上传时间">{{data.createTime}}</el-descriptions-item>
        <el-descriptions-item label="文件大小">{{data.size}}</el-descriptions-item>
        <el-descriptions-item label="文件数量" v-if="type == 0">{{data.num + ' 个'}}</el-descriptions-item>
        <el-descriptions-item label="文件类型" v-if="type == 1">{{data.type}}</el-descriptions-item>
      </el-descriptions>
    </div>
  </el-dialog>
</template>

<script>
import {getData} from "@/api/common";

export default {
  name: "fileAttribute",
  data(){
    return{
      dialogVisible:false,
      type:0,
      data:{},
      loading:false
    }
  },
  created() {

  },
  methods:{
    open(type,id){
      this.type = type
      this.dialogVisible = true
      this.loading = true
      getData('/folder/queryById/'+id+'/'+type).then(res=>{
        this.data = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
