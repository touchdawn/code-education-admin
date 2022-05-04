<template>
  <div>
    <el-form  >
      <el-row>
        <el-col  :span="12">
          <el-form-item label="课程名" :label-width="formLabelWidth">
            <div >{{ fatherData.lessonName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建人邮箱" :label-width="formLabelWidth">
            <div >{{ fatherData.creatorEmail }}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col  :span="12">
          <el-form-item label="创建人" :label-width="formLabelWidth">
            <div >{{ fatherData.creatorName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建人手机" :label-width="formLabelWidth">
            <div >{{ fatherData.creatorPhone}}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col  :span="24">
          <el-form-item label="课程简介" :label-width="formLabelWidth">
            <div style="max-width: 90%">{{ fatherData.courseIntroduction}}</div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="课程封面" :label-width="formLabelWidth">
        <img :src="urlProcess(fatherData.imgUrl)" alt="courseImg" style="width: 30%; height: 20%">
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center">
<!--      <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
      <el-button type="primary" v-if="fatherData.status === 1 && fatherData.score === 0" @click="setHead(fatherData.score)">设为首页推荐</el-button>
      <el-button type="warning" v-if="fatherData.status === 1 && fatherData.score === 5" @click="setHead(fatherData.score)">取消首页推荐</el-button>
      <el-button type="danger" v-if="fatherData.status === 1" @click="changeStatus">禁 用</el-button>
      <el-button type="success" v-if="fatherData.status === 0" @click="changeStatus">启 用</el-button>

      <el-button type="success" v-if="fatherData.status === 1" @click="videoClick">教学详情</el-button>

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
    }
  }
};
</script>

<style scoped>

</style>