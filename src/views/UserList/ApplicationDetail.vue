<template>
  <div>
    <el-form>
      <div>
        <video id="video" controls :src="addQiniuUrl(fatherData.fileUrl)" type="video/mp4" style="width: 90%; margin-left: 5%;"></video>
      </div>
      <el-row style="margin-top: 20px;">
        <el-col  :span="12">
          <el-form-item label="申请人" :label-width="formLabelWidth">
            <div >{{ fatherData.username }}</div>
          </el-form-item>
        </el-col>
<!--        <el-col :span="12">-->
<!--          <el-form-item label="创建人手机" :label-width="formLabelWidth">-->
<!--            <div >{{ fatherData.creatorPhone}}</div>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
      </el-row>

      <el-row>
        <el-col  :span="24">
          <el-form-item label="申请理由" :label-width="formLabelWidth">
            <div style="max-width: 90%">{{ fatherData.applyReason}}</div>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button type="danger"  @click="doDisapprove">驳 回</el-button>
      <el-button type="success" @click="doApprove">通 过</el-button>
    </div>
  </div>
</template>

<script>
import common from "@/common/common";

export default {
  props: {
    fatherData : Object,
    currentIndex: Number
  },
  data() {
    return {
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    };
  },
  watch:{
    fatherData(){
      console.log(999)
      this.form = this.fatherData
    }
  },
  created() {
    this.userDt = JSON.parse(localStorage.getItem("userInfo"))
    this.form = this.fatherData
  },
  mounted() {

  },
  methods:{

    doApprove(){
      // console.log(data[index].id)
      let that = this
      this.$confirm('确认过审吗?' , '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios({
          method: "GET",//指定请求方式
          url: common.commonLocalServer + "/admin/approveTeacherApplication/" + that.fatherData.id ,//请求接口（相对接口，后面会介绍到）
          headers:{token:this.userDt.token},
        }).then(function (res){
          console.log(res)
          that.$emit('changeStatus',that.currentIndex)
          that.$message({
            type: 'success',
            message: '成功!'
          });
        })
      }).catch(() => {
      });
    },
    doDisapprove(){
      let that = this
      this.$confirm( '确认驳回吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$axios({
          method: "GET",//指定请求方式
          url: common.commonLocalServer + "/admin/disApproveTeacherApplication/" + that.fatherData.id ,//请求接口（相对接口，后面会介绍到）
          headers:{token:this.userDt.token},
        }).then(function (res){
          console.log(res)
          that.$emit('changeStatus',that.currentIndex)
          that.$message({
            type: 'success',
            message: '成功!'
          });
        })
      }).catch(() => {
      });
    },
    setHead(score){
      let requestData = common.cloneObj(this.fatherData)
      let that = this
      console.log(requestData)
      this.$confirm((requestData.score === 0 ? '确认设为推荐吗?' : '确认取消推荐吗?'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(4)
        requestData.score = (requestData.status === 0 ? 5 : 0)
        that.$axios({
          method: "POST",//指定请求方式
          url: common.commonLocalServer + "/admin/updateCourse",//请求接口（相对接口，后面会介绍到）
          headers:{token:this.userDt.token},
          data:requestData
        }).then(function (res){
          console.log(res)
          that.$emit('changeRecommend',that.currentIndex)
          that.$message({
            type: 'success',
            message: '成功!'
          });
        })
      }).catch(() => {
      });
    },
    urlProcess(input){
      return common.storageUrl + input
    },

    videoClick(){
      this.$emit('redirectToVideo',this.currentIndex)
    },
    addQiniuUrl(input){
      return common.storageUrl + input
    },
  }
};
</script>

<style scoped>

</style>