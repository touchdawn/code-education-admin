<template>
  <div>
    <div style="margin: 20px 20px 20px 20px">
      <el-input style="width: 200px;" suffix-icon="el-icon-search"
                placeholder="课程名" v-model="searchForm.lessonName"></el-input>
      <!--      <el-input style="width: 200px;" suffix-icon="el-icon-search"-->
      <!--                placeholder="教师名" class="ml-5" v-model="searchForm.teacherName"></el-input>-->
      <el-input style="width: 200px;" suffix-icon="el-icon-search"
                placeholder="教师ID" class="ml-5" v-model="searchForm.teacherId"></el-input>
      <!--      <el-input style="width: 200px;" suffix-icon="el-icon-phone" placeholder="状态" class="ml-5"></el-input>-->
      <el-select class="ml-5" v-model="searchForm.status" clearable placeholder="课程状态">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button class="ml-5" type="primary" @click="searchClicked">搜索</el-button>
    </div>
    <!--    <div style="margin: 10px 0">-->
    <!--      <el-button class="ml-5" type="primary">新增-->
    <!--        <i class="el-icon-circle-plus-outline"></i>-->
    <!--      </el-button>-->
    <!--      <el-button class="ml-5" type="danger">批量删除-->
    <!--        <i class="el-icon-remove-outline"></i>-->
    <!--      </el-button>-->
    <!--    </div>-->

    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
      <el-table-column prop="ID" label="ID" width="40">
      </el-table-column>
      <el-table-column prop="LESSON_NAME" label="课程名" width="360">
      </el-table-column>
      <el-table-column prop="TITLE" label="标题"  width="360">
      </el-table-column>
      <el-table-column prop="TYPE" label="类型">
      </el-table-column>
      <el-table-column prop="NAME" label="发布人">
      </el-table-column>
<!--      <el-table-column prop="score" width="100" label="轮播推荐">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag-->
<!--              :type="getTagType(scope)"-->
<!--              disable-transitions>{{ getTypeName(scope) }}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->

<!--      <el-table-column prop="courseType" label="标签" width="100">-->
<!--        &lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
<!--        &lt;!&ndash;          <el-tag&ndash;&gt;-->
<!--        &lt;!&ndash;              :type="getTagType(scope)"&ndash;&gt;-->
<!--        &lt;!&ndash;              disable-transitions>{{ getTypeName(scope) }}</el-tag>&ndash;&gt;-->
<!--        &lt;!&ndash;        </template>&ndash;&gt;-->
<!--      </el-table-column>-->

      <el-table-column prop="CREATE_AT" label="注册日期" width="180">
        <template slot-scope="scope">
          {{ formatDate(scope.row.createdAt) }}
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.status === 1?'success':'danger'"
              disable-transitions>{{ scope.row.status === 1?'正常':'待审' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220" >
        <template slot-scope="scope">
          <!--          <el-button type="warning" size="mini"-->
          <!--                     @click.native.prevent="deleteRow(scope.$index, tableData,scope)">编辑 <i class="el-icon-edit"></i></el-button>-->
          <el-button type="warning" size="mini"
                     @click.native.prevent="detailClicked(scope.$index, tableData,scope)">详情 <i class="el-icon-edit"></i></el-button>
<!--          <el-button type="danger"  size="mini" v-if="scope.row.status === 1"-->
<!--                     @click.native.prevent="changeStatus(scope.$index, tableData)">禁用 <i class="el-icon-remove-outline"></i></el-button>-->
<!--          <el-button type="success"  size="mini" v-if="scope.row.status === 0"-->
<!--                     @click.native.prevent="changeStatus(scope.$index, tableData)">过审 <i class="el-icon-circle-plus-outline"></i></el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="pageSizeChange"
          :page-sizes="[1, 2, 5, 10, 20, 50, 100]"
          @current-change = "currentChange"
          :total="pageInfo.total">
      </el-pagination>
    </div>
    <el-dialog title="课程详情"
               center
               :visible.sync="detailShow"
               v-if="detailShow">
      <video-audit-detail
          :father-data="detailProp"
          @changeStatus = "changeStatusEmit($event)"
          @changeRecommend="changeRecommendEmit($event)"
          @doRefresh = "backFromAuditDetail($event)"
      ></video-audit-detail>
    </el-dialog>

<!--    <el-dialog-->
<!--        title="提示"-->
<!--        :visible.sync="dialogVisible"-->
<!--        v-if="dialogVisible"-->
<!--        width="30%"-->
<!--        >-->
<!--      <span>这是一段信息</span>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--      </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import common from "@/common/common";
import videoAuditDetail from "@/views/VideoControl/VideoAuditDetail";
import moment from 'moment';
import utils from "@/common/mislist";

export default {
  components:{videoAuditDetail},
  name: "VideoAudit",
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      dialogVisible: false,
      userDt:{},
      detailProp:{},
      searchForm:{
        status:'',
        lessonName:'',
        teacherName:'',
        teacherId:'',
      },

      options: [{
        value: '1',
        label: '正常'
      }, {
        value: '0',
        label: '待审核'
      }],
      detailShow:false,
      currentIndex:-1,
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
    this.getCourseList()
  },
  methods:{

    searchClicked(){
      console.log(this.getFormData())
      var that = this
      var searchForm={}
      searchForm.searchData = this.getFormData()
      console.log(searchForm.searchData)
      searchForm.current=that.pageInfo.current
      searchForm.size=that.pageInfo.size
      that.$axios({
        method: "POST",//指定请求方式
        url: common.commonLocalServer + "/admin/searchCourse",//请求接口（相对接口，后面会介绍到）
        headers:{token:this.userDt.token},
        data:searchForm
      }).then(function (res){
        console.log(res)
        that.tableData = res.data.data.records
        that.pageInfo.total = res.data.data.total
        that.pageInfo.current = res.data.data.current
        that.pageInfo.size = res.data.data.size
        that.$message({
          type: 'success',
          message: '成功!'
        });
      })
    },

    deleteRow(index,data,s){
      console.log(index)
      console.log(data)
      console.log(s)
    },

    detailClicked(index,data,s){
      // console.log(index)
      // console.log(data)
      console.log(s)
      this.detailProp = s.row
      console.log('赋值成功')
      console.log(this.detailProp)
      // this.currentIndex = index
      this.detailShow = true
      // this.dialogVisible = true
    },

    changeStatus(index,data){
      // console.log(data[index].id)
      let that = this
      this.$confirm((data[index].status === 0 ? '确认过审吗?' : '确认禁用吗?'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        data[index].status = (data[index].status === 0 ? 1 : 0)
        that.$axios({
          method: "POST",//指定请求方式
          url: common.commonLocalServer + "/admin/updateCourse",//请求接口（相对接口，后面会介绍到）
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

    changeStatusEmit(msg){
      console.log(msg)
      this.tableData[msg].status = ( this.tableData[msg].status === 0 ? 1 : 0)
    },
    changeRecommendEmit(msg){
      this.tableData[msg].score = ( this.tableData[msg].score === 0 ? 5 : 0)

    },

    backFromAuditDetail(msg){
      console.log('backFromAuditDetail')
      this.detailShow = false
      this.tableData = []
      this.pageInfo = {
        current: 1,
        size: 10,
        total: 0
      }
      this.getCourseList()
      console.log(msg)
    },

    getCourseList(){
      let that = this
      that.$axios({
        method: "POST",//指定请求方式
        url: common.commonLocalServer + "/admin/getCourseByQueryPage",//请求接口（相对接口，后面会介绍到）
        headers:{token:this.userDt.token},
        data:that.pageInfo
      }).then(function(res){
        console.log(res.data)
        if (res.data.flag === "T" ){
          console.log('鉴权成功')
          // console.log( res.data)
          that.tableData = res.data.data.data
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
      this.getCourseList()

    },
    currentChange(e){
      this.pageInfo.current = e
      this.getCourseList()

      console.log(e)
    },

    getTagType(scope){
      if (scope.row.score === 0){
        return 'primary'
      } else if(scope.row.score === 5) {
        return 'success'
      }
    },
    getTypeName(scope){
      if (scope.row.score === 0){
        return '否'
      } else if(scope.row.score === 5) {
        return '是'
      }
    },


    formatDate (value) {
      return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
    },

    getFormData () {
      let formData = {}
      let searchForm = common.cloneObj(this.searchForm)
      for (let variable in searchForm) {
        if (searchForm.hasOwnProperty(variable)) {
          let innerVal = searchForm[variable]
          if (!common.isEmpty(innerVal)) {
            formData[variable] = common.trim(innerVal)
          }
        }
      }
      // common.data2Number(formData, this.settings.isNumber)
      return formData
    },
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