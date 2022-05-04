<template>
  <div>
<!--    <div style="margin: 20px 20px 20px 20px">-->
<!--      <el-input style="width: 200px;" suffix-icon="el-icon-search" placeholder="标题" ></el-input>-->
<!--      <el-input style="width: 200px;" suffix-icon="el-icon-message" placeholder="内容" class="ml-5"></el-input>-->
<!--      <el-input style="width: 200px;" suffix-icon="el-icon-phone" placeholder="发布时间" class="ml-5"></el-input>-->
<!--      <el-button class="ml-5" type="primary">搜索</el-button>-->
<!--    </div>-->
    <div style="margin: 10px 0">
      <el-button class="ml-5" type="primary" @click="dialogFormVisible = true">新增
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
    </div>

    <el-table :data="tableData" border stripe >
      <el-table-column prop="id" label="id" width="40">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>

      <el-table-column prop="content" label="内容">
      </el-table-column>
      <el-table-column prop="createAt" width="180" label="发布时间">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createAt) }}
        </template>
      </el-table-column>
<!--      <el-table-column prop="senderName" label="发布者"  width="">-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="type" label="已读人数" width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag-->
<!--              :type="getTagType(scope)"-->
<!--              disable-transitions>{{ getTypeName(scope) }}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->


      <el-table-column label="操作" width="220" >
        <template slot-scope="scope">
           <el-button type="danger"  size="mini" @click="deleteClick(scope.row)">
                     删除 <i class="el-icon-remove-outline"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChange"
          @current-change = "currentChange"
          :total="pageInfo.total">
      </el-pagination>
    </div>

    <el-dialog title="新增通知" :visible.sync="dialogFormVisible" :before-close="doClose" >
      <el-form :model="addForm" style="width: 880px;">
        <el-form-item label="通知标题" label-width="120px">
          <el-input v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="通知内容" label-width="120px">
          <el-input
              type="textarea"
              :rows="9"
              placeholder="请输入内容"
              v-model="addForm.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="doClose">取 消</el-button>
        <el-button type="primary" @click="submitClick">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import common from "@/common/common";
import moment from "moment";
export default {
  name: "NotificationManage",
  data () {
    return {
      dialogFormVisible: false,
      addForm:{
        title:'',
        content:'',
        receiverId:'-1'
      },
      userDt:{},
      tableData: [],
      pageInfo: {
        total: 0,
        size: 10,
        current: 1
      }
    }
  },
  created() {
    this.userDt = JSON.parse(localStorage.getItem("userInfo"))
    this.getTableData()
  },

  methods:{
    deleteClick(row){
      console.log(row)
      this.$confirm('是否删除?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
        console.log('confirm')
        this.doDelete(row)
      }).catch(() => {
      });
    },
    doDelete(row){
      console.log('startDelete')
      console.log(row)
      var that = this
      let uploadData = {}
      uploadData.messageId = row.id
      uploadData.method = 'deleteNotification'
      console.log("upload:")
      console.log(uploadData)
      that.$axios({
        method:'POST',
        url: common.commonLocalServer + "/message/postChangeMessage",
        data:uploadData,
        headers:{
          'token': that.userDt.token
        },
      }).then(function (res) {
        console.log(res)
        if(res.data.flag === 'T'){
          that.$message({
            message: '删除成功',
            type: 'success'
          });
          that.getTableData()
        }else{
          that.$message({
            message: '删除失败',
            type: 'error'
          });
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    submitClick(){
      let that = this
      that.addForm.senderId = that.userDt.id
      that.addForm.parentMessageId = -1
      that.$axios({
        method: "post",
        url: common.commonLocalServer + "/message/addMessage",
        headers:{
          'token': that.userDt.token
        },
        data: that.addForm
      }).then(function (res) {
        console.log(res)
        if (res.data.flag === 'T') {
          that.$message({
            message: '新增成功',
            type: 'success'
          });
          that.dialogFormVisible = false
        } else {
          that.$message({
            message: 'error',
            type: 'error'
          });
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    getTableData() {
      var that = this
      that.$axios({
        method: 'get',
        url: common.commonLocalServer + '/message/getMyMessageByPage/'+ that.userDt.id,
        headers:{token:that.userDt.token},
        params: {
          current: that.pageInfo.current,
          size: that.pageInfo.size
        }
      }).then(function (res) {
        console.log(res)
        that.tableData = res.data.data.records
        that.pageInfo.total = res.data.data.total
      })
    },
    pageSizeChange(e){
      console.log(e)
      this.pageInfo.size = e
      this.getTableData()

    },
    currentChange(e){
      this.pageInfo.current = e
      this.getTableData()

      console.log(e)
    },
    formatDate(date) {
      console.log(date)
      if(date){
        return moment(date).format('YYYY年MM月DD日 HH:mm:ss')
      }
    },
    doClose(){
      console.log('close')
      this.addForm.title = ''
      this.addForm.content = ''
      this.dialogFormVisible = false
    },
  }
}
</script>

<style scoped>

</style>