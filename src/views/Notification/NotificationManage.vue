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
      <el-table-column prop="type" label="已读人数" width="100">
        <template slot-scope="scope">
<!--          <el-tag-->
<!--              :type="getTagType(scope)"-->
<!--              disable-transitions>{{ getTypeName(scope) }}</el-tag>-->
        </template>
      </el-table-column>


      <el-table-column label="操作" width="220" >
        <template slot-scope="scope">
           <el-button type="danger"  size="mini"
                     >禁用 <i class="el-icon-remove-outline"></i></el-button>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        content:''
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