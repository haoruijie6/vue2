<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryParams" size="small" :inline="true">
      <el-form-item label="文件夹名称" prop="folderName">
        <el-input placeholder="文件名称" v-model="queryParams.folderName"></el-input>
      </el-form-item>
      <el-form-item label="成品名称" prop="consumablesName">
        <el-input placeholder="成品名称" v-model="queryParams.consumablesName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="list">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px" @click="addFolderShow = false;folderShow = false" @contextmenu.prevent.stop="rightClick($event)">
      <el-card class="drawing_card" v-loading="cardLoading" style="height: 600px">
        <template v-if="folderList.length === 0">
          <el-empty description="暂无文件，请右键创建一个文件夹吧" style="height: 600px"></el-empty>
        </template>
        <div v-for="(item,index) in folderList">
          <div class="folderContainer">
            <div  v-if="item.type == 0" class="folderWrapper" @dblclick="ondblclickFile(item.folderName)"
                 @contextmenu.prevent.stop="rightClickFolder(index,item,$event)">
              <div class="folder">
                <div class="front"></div>
                <div class="center"></div>
                <div class="back"></div>
              </div>
              <div class="folderName">
                <span>{{ item.folderName.length > 10 ? item.folderName.substring(0,7)+'...' : item.folderName }}</span>
              </div>
              <div class="folderTime">
                <span>{{ item.createTime }}</span>
              </div>
            </div>
            <div v-else style="margin-top: 4px">
              <img src="@/assets/image/fileImg.png" style="width: 120px;height: 107px" @contextmenu.prevent.stop="rightClickFolder(index,item,$event)"/>
              <div class="folderName" style="margin-top: -4px">
                <span>{{ item.folderName.length > 10 ? item.folderName.substring(0,7)+'...' : item.folderName }}</span>
              </div>
              <div class="folderTime">
                <span>{{ item.createTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <add ref="add"></add>

    <div class="add-folder" :style="addFolderStyle" v-show="addFolderShow">
      <div class="add-folder-1">
        <div class="add-folder-2" style="margin-bottom: 5px" @click="addFolder">
          新建文件夹
        </div>
        <div style="border: 2px solid rgba(18,17,42,.07)"></div>
        <div class="add-folder-2"  @click="addFile" style="margin-bottom: 5px">
          上传文件
        </div>
        <div style="border: 2px solid rgba(18,17,42,.07)"></div>
        <div class="add-folder-2" @click="list">
          刷 新
        </div>
      </div>
    </div>

    <div class="add-folder-9" :style="folderStyle" v-show="folderShow">
      <div class="add-folder-1">
        <div class="add-folder-2" style="margin-bottom: 5px" @click="addFolder">
          查看文件
        </div>
        <div style="border: 2px solid rgba(18,17,42,.07)"></div>
        <div class="add-folder-2" @click="updateFloder" style="margin-bottom: 5px">
          重命名
        </div>
        <div style="border: 2px solid rgba(18,17,42,.07)"></div>
        <div class="add-folder-2" @click="delFloder" style="margin-bottom: 5px">
          属 性
        </div>
        <div style="border: 2px solid rgba(18,17,42,.07)"></div>
        <div class="add-folder-6" @click="delFloder">
          删 除
        </div>
      </div>
    </div>
    <add ref="addOne"/>
    <!--    <file-list ref="fileList" :bucket-name="folderName"></file-list>-->
  </div>
</template>

<script>
import {getData, postData} from '@/api/common'
import add from './addOne'
import fileList from './index'

export default {
  components: {
    add, fileList
  },
  name: 'CompleteMachineDrawing',
  data() {
    return {
      addFolderShow: false,
      addFolderStyle: {
        left: '0px',
        top: '0px'
      },
      folderStyle: {
        left: '0px',
        top: '0px'
      },
      folderShow: false,
      queryParams: {
        folderName: null,
        consumablesName: null
      },
      folderList: [],
      cardLoading: false,
      folderName: null,
      folderId: null,
      type:null,
      dataIndex:null,
    }
  },
  created() {
    this.list()
  },
  methods: {
    //查询文件列表
    list() {
      this.cardLoading = true
      getData('/folder/list', this.queryParams).then(res => {
        this.folderList = res.data
        this.cardLoading = false
      }).catch(() => {
        this.cardLoading = false
      })
      this.addFolderShow = false
    },
    //创建文件夹
    addFolder() {
      this.addFolderShow = false
      let o = {
        folderName: '',
        type: 0,
        createTime:new Date().format('yyyy/MM/dd hh:mm:ss')
      }
      this.folderList.push(o);
      this.$prompt('请输入文件夹名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        this.folderList[this.folderList.length - 1].folderName = value;
        postData("/folder/add", {folderName: value,type:0}).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '创建成功 '
            });
          } else {
            this.$message({
              type: 'error',
              message: '创建失败 '
            });
            this.folderList.splice(this.folderList.length - 1, 1);
          }
        })
      }).catch(() => {
        this.folderList.splice(this.folderList.length - 1, 1);
      });
    },
    //上传文件
    addFile(){
      this.addFolderShow = false
      let o = {
        folderName: '',
        type: 1,
        createTime:new Date().format('yyyy/MM/dd hh:mm:ss')
      }
      this.folderList.push(o);
      this.$refs.addOne.open();
    },
    //重命名
    updateFloder(){
      this.folderShow = false
      this.$prompt('请输入文件夹名称', '提示', {
        inputValue:this.folderName,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        this.folderList[this.dataIndex].folderName = value
        getData("/folder/rename/"+this.folderId+'/'+value+'/'+this.type).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '重命名成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '修改失败请重试!'
            });
            this.folderList[this.dataIndex].folderName = this.folderName
          }
        })
      }).catch(() => {
        this.folderList[this.dataIndex].folderName = this.folderName
      });
    },
    //删除文件
    delFloder(){
      this.folderShow = false
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        getData("/folder/del/"+this.folderId+'/'+this.type).then(res => {
          this.folderList.splice(this.dataIndex,1)
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败请重试!'
            });
          }
        })
      }).catch(() => {});
    },
    //重置
    resetQuery() {
      this.queryParams = {
        folderName: null,
        consumablesName: null
      }
      this.list()
    },
    //文件夹右键
    rightClickFolder(index,item,e) {
      this.folderName = item.folderName
      this.folderId = item.id
      this.type = item.type
      this.dataIndex = index
      this.folderStyle.left = e.pageX + 'px'
      this.folderStyle.top = e.pageY + 'px'
      this.folderShow = true
      this.addFolderShow = false
    },
    //文件列表右键
    rightClick(e) {
      this.addFolderStyle.left = e.pageX + 'px'
      this.addFolderStyle.top = e.pageY + 'px'
      this.addFolderShow = true
      this.folderShow = false
    },
    //双击打卡文件夹
    ondblclickFile(folderName) {
      this.folderName = folderName
    },
    updateFileName(name){
      this.folderList[this.folderList.length - 1].folderName = name
    }
  }
}
Date.prototype.format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
</script>

<style scoped>
@import "@/assets/css/file_icon.css";

</style>
