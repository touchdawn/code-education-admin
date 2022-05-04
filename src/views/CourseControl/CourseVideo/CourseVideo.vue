<template>
<div>
  <div style="display:flex;align-items: center; justify-content: center; text-align:left;">
    <video  v-if="videoUrl !== ''" id="video" controls :src="videoUrl" type="video/mp4" style="width: 600px;"></video>
    <div style="text-align:center;"  v-if="videoUrl === ''">
<!--      <img :src="imgSrc()" alt="" v-if="videoUrl === ''" style="width: 600px">-->
      <svg t="1649819404901"class="icon" viewBox="0 0 1385 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2056" width="600" height="300"><path d="M45.176471 30.117647h60.235294V0H45.176471v30.117647z m90.352941 0h60.235294V0H135.529412v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235295V0h-60.235295v30.117647z m90.352942 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352942 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352941 0h60.235294V0h-60.235294v30.117647z m90.352941 0h30.117647a15.058824 15.058824 0 0 1 13.056 7.529412l26.051765-15.073883A45.161412 45.161412 0 0 0 1340.235294 0h-30.117647v30.117647z m45.176471 29.199059v60.235294h30.117647v-60.235294h-30.117647z m0 90.352941v60.235294h30.117647v-60.235294h-30.117647z m0 90.352941v60.235294h30.117647v-60.235294h-30.117647z m0 90.352941v60.235295h30.117647v-60.235295h-30.117647z m0 90.352942v60.235294h30.117647v-60.235294h-30.117647z m0 90.352941v60.235294h30.117647v-60.235294h-30.117647z m0 90.352941v60.235294h30.117647v-60.235294h-30.117647z m0 90.352941v60.235294h30.117647v-60.235294h-30.117647z m0 90.352941v60.235294h30.117647v-60.235294h-30.117647z m0 90.352941v60.235295h30.117647v-60.235295h-30.117647z m0 90.352942V978.823529a15.058824 15.058824 0 0 1-14.049883 15.028706l1.957647 30.057412A45.176471 45.176471 0 0 0 1385.411765 978.823529v-15.977411h-30.117647zM1311.969882 993.882353h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352942 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235295v30.117647h60.235295v-30.117647z m-90.352942 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0h-60.235294v30.117647h60.235294v-30.117647z m-90.352941 0H45.176471a15.058824 15.058824 0 0 1-15.058824-15.058824v-12.288H0V978.823529a45.176471 45.176471 0 0 0 45.176471 45.176471h1.852235v-30.117647zM30.117647 936.417882v-60.235294H0v60.235294h30.117647z m0-90.352941v-60.235294H0v60.235294h30.117647z m0-90.352941v-60.235294H0v60.235294h30.117647z m0-90.352941v-60.235294H0v60.235294h30.117647z m0-90.352941v-60.235294H0v60.235294h30.117647z m0-90.352942v-60.235294H0v60.235294h30.117647z m0-90.352941v-60.235294H0v60.235294h30.117647z m0-90.352941v-60.235294H0v60.235294h30.117647z m0-90.352941v-60.235294H0v60.235294h30.117647z m0-90.352941v-60.235294H0v60.235294h30.117647z m1.234824-84.073412l-27.602824-12.047059A45.176471 45.176471 0 0 1 45.176471 0v30.117647a15.058824 15.058824 0 0 0-13.824 9.050353zM891.482353 271.058824c39.905882 0 72.282353 32.376471 72.282353 72.282352v325.270589c0 39.905882-32.376471 72.282353-72.282353 72.282353H493.929412c-39.905882 0-72.282353-32.376471-72.282353-72.282353V343.341176c0-39.905882 32.376471-72.282353 72.282353-72.282352h397.552941z m-81.061647 250.639058a18.010353 18.010353 0 0 0 0-30.930823l-180.675765-108.137412A18.130824 18.130824 0 0 0 602.352941 398.095059v216.274823c0 6.505412 3.508706 12.498824 9.185883 15.676236 2.740706 1.596235 5.812706 2.349176 8.884705 2.349176 3.222588 0 6.430118-0.858353 9.336471-2.56l180.660706-108.137412z" p-id="2057" fill="#8a8a8a"></path></svg>
<!--      <div>暂无视频</div>-->
    </div>
<!--    <div>-->
<!--      <el-button>暂无视频</el-button>-->
<!--    </div>-->
  </div>
  <div>

  </div>
  <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item v-for="(item,index) in lessonData"
                      :title="item.TITLE" :name="index" >
      <div v-for="(child, childIndex) in item.child"
           @click="courseClick(child,childIndex)"
           style="margin-bottom: 1%; margin-left: 2%;border-bottom: darkgrey solid 1px ">
        {{child.TITLE}}
      </div>
    </el-collapse-item>

  </el-collapse>


  <el-dialog title="章节详情" :visible.sync="mdVisible" :before-close="doClose" >
    <div>
      <mavon-editor v-model="mdValue" :subfield="false" :defaultOpen="defaultData"
                    :toolbarsFlag="false" :boxShadow="false" />
    </div>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";
import common from "@/common/common";

export default {
  name: 'CourseVideo',
  props: {
    courseId: {
      type: Number,
      required: true
    }
  },
  // watch:{
  //   courseId(newVal, oldVal){
  //     console.log("课程视频界面")
  //     this.getCourseDetail(newVal);
  //   }
  // },
  data() {
    return {
      mdVisible:false,
      defaultData: "preview",
      mdValue:'',
      videoUrl: "",
      activeNames: ['1'],
      lessonData: [],
    };
  },
  created() {
    console.log("课程视频界面")
    this.userDt = JSON.parse(localStorage.getItem("userInfo"))
    this.getCourseDetail()
  },
  methods: {
    courseClick(child,childIndex){  //课程点击
      console.log(child)
      if (child.TYPE === "MD") {
        let that = this
        that.mdUrl = child.URL;
        that.$axios({
          method: "GET",//指定请求方式
          url: common.storageUrl + that.mdUrl,//请求接口（相对接口，后面会介绍到）
        }).then(function (res) {
          // console.log(res)
          that.mdValue = res.data
        })
        this.mdVisible = true;
      } else if (child.TYPE ==="video") {
        this.videoUrl = common.storageUrl + child.URL
      }
    },


    getCourseDetail(){
      let that = this;
      console.log("请求课程信息")
      that.$axios({
        method: "GET",//指定请求方式
        url: common.commonLocalServer + "/lesson/getCourseInfo/" + that.courseId + '/' + 2,//请求接口（相对接口，后面会介绍到）
        headers:{token:that.userDt.token}
      }).then(function(res){
        console.log("请求结果")
        console.log(res)
        that.lessonData = res.data.data.chapter;
      })

    },

    handleChange(val) {
      console.log(val);
    },
    imgSrc(){
      return common.storageUrl +"no_video.png"
    },
    doClose(){
      this.mdValue= '';
      this.mdVisible = false;
    },
  }
}
</script>

<style scoped>

</style>