<template>
  <div >
    <video  v-if="form.URL !== ''" id="video" controls
            :src="addQiniuUrl(form.URL)" type="video/mp4" style="width: 90%; margin-left: 5%;"></video>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <!--      <el-button @click="dialogFormVisible = false">取 消</el-button>-->
      <!--      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
<!--      <el-button type="primary" v-if="fatherData.status === 1 && fatherData.score === 0" @click="setHead(fatherData.score)">设为首页推荐</el-button>-->
<!--      <el-button type="warning" v-if="fatherData.status === 1 && fatherData.score === 5" @click="setHead(fatherData.score)">取消首页推荐</el-button>-->
<!--      <el-button type="danger" v-if="fatherData.status === 1" @click="changeStatus">禁 用</el-button>-->
      <el-button type="success" v-if="form.STATUS === 0"
                 style="margin-top: 2%;" @click="videoPassClick">审核通过</el-button>
      <el-button type="warning" v-if="form.STATUS === 0"
                 style="margin-top: 2%;" @click="refuseClick">拒 绝</el-button>
      <el-button type="danger" v-else
                 style="margin-top: 2%;" @click="videoPassClick">下 架</el-button>
<!--      <el-button type="success" v-if="fatherData.status === 1" @click="videoClick">去视频</el-button>-->
      <el-dialog
          width="30%"
          title="拒绝"
          :visible.sync="innerVisible"
          append-to-body>
        <el-form :model="refuseForm"  ref="innerForm" label-width="80px">
          <el-form-item label="拒绝理由">
            <el-input v-model="refuseForm.reason" type="textarea" :rows="10"
                      placeholder="请输入拒绝理由" style="width: 100%; height: 200px;"></el-input>
          </el-form-item>
          <el-button type="primary"
                     style="margin-top: 2%; display: block; margin: 0 auto" @click="refuseConfirmClick">提 交</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import common from "@/common/common";

export default {
  name:'VideoAuditDetail',
  props: {
    fatherData : Object,
    currentIndex: Number
  },
  data() {
    return {
      innerVisible:false,
      refuseForm:{
        reason:''
      },
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
    console.log(888)
    this.form = this.fatherData
    console.log(this.form)
  },
  mounted() {

  },
  methods:{
    refuseConfirmClick(){

    },
    refuseClick(){
      this.innerVisible = true
    },
    videoPassClick(){
      let that = this
      let requestData = common.cloneObj(this.fatherData)
      console.log(requestData)
      requestData.status = this.form.STATUS === 0 ? 1 : 0
      requestData.id = this.fatherData.ID
      this.$confirm((requestData.STATUS === 0 ? '确认过审吗?' : '确认禁用吗?'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        requestData.STATUS = 1
        that.$axios({
          method: "POST",//指定请求方式
          url: common.commonLocalServer + "/admin/updateSectionStatus",//请求接口（相对接口，后面会介绍到）
          headers:{token:this.userDt.token},
          data:requestData
        }).then(function (res){
          console.log(res)
          if (res.data.flag === 'T'){
            that.$message({
              type: 'success',
              message: '操作成功!'
            });
            that.form.STATUS = (that.form.STATUS === 0 ? 1 : 0)
            console.log(that.form)
            // that.$emit('refresh')
          } else {
            that.$message({
              type: 'error',
              message: '操作失败!'
            });
          }
          // that.$emit('changeStatus',that.currentIndex)

        })
      }).catch(() => {
      });
    },
    changeStatus(){
      // console.log(data[index].id)
      let requestData = common.cloneObj(this.fatherData)
      let that = this
      console.log(requestData)
      this.$confirm((requestData.status === 0 ? '确认过审吗?' : '确认禁用吗?'), '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(4)
        requestData.status = (requestData.status === 0 ? 1 : 0)
        that.$axios({
          method: "POST",//指定请求方式
          url: common.commonLocalServer + "/admin/updateCourse",//请求接口（相对接口，后面会介绍到）
          headers:{token:this.userDt.token},
          data:requestData
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
    }
  }
};
</script>

<style scoped>

</style>