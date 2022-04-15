<template>
  <div>
    <div style="margin: 20px 20px 20px 20px">
      <el-input style="width: 200px;" suffix-icon="el-icon-search" placeholder="姓名" ></el-input>
      <el-input style="width: 200px;" suffix-icon="el-icon-message" placeholder="邮箱" class="ml-5"></el-input>
      <el-input style="width: 200px;" suffix-icon="el-icon-phone" placeholder="手机号" class="ml-5"></el-input>
      <el-button class="ml-5" type="primary">搜索</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button class="ml-5" type="primary">新增
        <i class="el-icon-circle-plus-outline"></i>
      </el-button>
      <el-button class="ml-5" type="danger">批量删除
        <i class="el-icon-remove-outline"></i>
      </el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
      <el-table-column prop="id" label="ID" width="40">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>

      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="phone" width="180" label="手机号">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"  width="180">
      </el-table-column>
      <el-table-column prop="type" label="权限" width="100">
        <template slot-scope="scope">
          <el-tag
              :type="getTagType(scope)"
              disable-transitions>{{ getTypeName(scope) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="createdAt" label="注册日期" width="240">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createdAt) }}
        </template>
      </el-table-column>

      <el-table-column prop="type" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.status === 1?'success':'danger'"
              disable-transitions>{{ scope.row.status === 1?'正常':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" >
        <template slot-scope="scope">
          <el-button type="warning" size="mini"
                     @click.native.prevent="deleteRow(scope.$index, tableData,scope)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-button type="danger"  size="mini" v-if="scope.row.status === 1"
                     @click.native.prevent="changeStatus(scope.$index, tableData)">禁用 <i class="el-icon-remove-outline"></i></el-button>
          <el-button type="success"  size="mini" v-if="scope.row.status === 0"
                     @click.native.prevent="changeStatus(scope.$index, tableData)">启用 <i class="el-icon-circle-plus-outline"></i></el-button>
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
  </div>
</template>

<script>
import common from "@/common/common";
import moment from 'moment';
export default {
  name: "UserControl",
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      userDt:{},
      pageInfo:{
        current:1,
        size:10,
        total:0
      },
      tableData:  [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      isCollapse:false,
      sideWidth: 200,
      logoTextShow:true,
      collapseBtnClass:'el-icon-s-fold',
      headerBg: 'headerBg'
    }
  },


  created() {
    this.userDt = JSON.parse(localStorage.getItem("userInfo"))
    console.log(this.userDt)
    this.getUserList()
  },
  methods:{
    deleteRow(index,data,s){
      console.log(index)
      console.log(data)
      console.log(s)
    },

    changeStatus(index,data){
      // console.log(data[index].id)
      let that = this
      this.$confirm((data[index].status === 0 ? '确认激活该用户吗?' : '确认禁用该用户吗?'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
            data[index].status = (data[index].status === 0 ? 1 : 0)
            that.$axios({
              method: "POST",//指定请求方式
              url: common.commonLocalServer + "/users/update",//请求接口（相对接口，后面会介绍到）
              headers:{token:this.userDt.token},
              data:data[index]
            }).then(function (res){
              console.log(res)
              that.$message({
                type: 'success',
                message: '成功!'
              });
            })
      }).catch(() => {
      });
    },




    getUserList(){
      let that = this
      that.$axios({
        method: "POST",//指定请求方式
        url: common.commonLocalServer + "/users/getAllByPage",//请求接口（相对接口，后面会介绍到）
        headers:{token:this.userDt.token},
        data:that.pageInfo
      }).then(function(res){
        console.log(res.data)
        if (res.data.flag === "T" ){
          console.log('鉴权成功')
          // console.log( res.data)
          that.tableData = res.data.data.records
          that.pageInfo.total = res.data.data.total
          console.log(that.tableData )
        } else {
          that.$message({
            message: '权限不足',
            center: true
          });
        }
      })
    },


    pageSizeChange(e){
      console.log(e)
      this.pageInfo.size = e
      this.getUserList()

    },
    currentChange(e){
      this.pageInfo.current = e
      this.getUserList()

      console.log(e)
    },

    getTagType(scope){
      if (scope.row.type === 1){
        return 'primary'
      } else if(scope.row.type === 0) {
        return 'success'
      } else if (scope.row.type === 2) {
        return 'danger'
      }
    },
    getTypeName(scope){
      if (scope.row.type === 1){
        return '教师'
      } else if(scope.row.type === 0) {
        return '学生'
      } else if (scope.row.type === 2) {
        return '管理员'
      }
    },

    formatDate (value) {
      return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
    }
  }
}
</script>

<style scoped>
.bgImg{
  background: #ffffff;
}

.headerBg{
  background: #eeeeee;
}

.el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>