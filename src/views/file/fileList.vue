<template>
  <el-dialog
      v-if="dialogVisible"
      :modal-append-to-body="false"
      :title="title"
      :visible.sync="dialogVisible"
      width="60%">
    <div>
      <el-form style="margin-top: 20px" :model="queryParams" ref="queryParams" size="small" :inline="true">
        <el-form-item label="文件名称">
          <el-input placeholder="文件名称" v-model="queryParams.fileName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button style="margin-bottom: 10px;float: right" @click="upload" type="primary" size="mini">上传文件</el-button>
      <el-table :data="dataList" style="height: 400px;" border v-loading="loading">
        <el-table-column align="center" prop="fileName" label="文件名称"/>
        <el-table-column align="center" prop="size" label="文件大小">
          <template slot-scope="scope">
            <div>{{ scope.row.size + 'MB' }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="文件类型"/>
        <el-table-column align="center" prop="createTime" label="创建时间"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="updateFloder(scope.row.id,scope.row.fileName)">重命名</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
            <el-button type="text" @click="down(scope.row.fileUrl)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--      <pagination-->
      <!--          :total="total"-->
      <!--          :page.sync="queryParams.pageNum"-->
      <!--          :limit.sync="queryParams.pageSize"-->
      <!--          @pagination="getList"-->
      <!--      />-->
    </div>
    <addBatch ref="addBatch"/>
  </el-dialog>
</template>

<script>
import {getData} from "@/api/common";
import addBatch from "./addBatch"

export default {
  name: "fileList",
  components: {
    addBatch
  },
  data() {
    return {
      total: 10,
      dialogVisible: false,
      loading: false,
      queryParams:{
        fileName:null,
        folderId:null,
        pageSize:10,
        pageNum:1,
      },
      dataList: [],
      title: null,
      folderId: null,
    }
  },
  methods: {
    //重命名
    updateFloder(id, name) {
      this.folderShow = false
      this.$prompt('请输入文件名称', {
        inputValue: name,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        getData("/file/rename/" + id + '/' + value).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '重命名成功!'
            });
            this.getList();
          } else {
            this.$message({
              type: 'error',
              message: '修改失败请重试!'
            });
          }
        })
      }).catch(() => {
      });
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getData("/file/del/" + id).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败请重试!'
            });
          }
        })
      }).catch(() => {
      });
    },
    open(id, folderName) {
      this.title = folderName
      this.folderId = id
      this.queryParams.folderId = id
      this.dialogVisible = true
      this.getList()
    },
    getList() {
      this.loading = true
      getData("/file/list", this.queryParams).then(res => {
        this.dataList = res.data
        this.loading = false
      })
    },
    upload() {
      this.$refs.addBatch.open(this.folderId);
    },
    down(fileUrl) {
      window.open(fileUrl, '_blank')
    },
    resetQuery(){
      this.queryParams = {
        fileName:null,
        folderId:this.queryParams.folderId,
        pageSize:10,
        pageNum:1
      }
      this.getList()
    }
  }

}
</script>

<style scoped>

</style>
