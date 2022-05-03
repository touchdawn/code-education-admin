<template>
<!--  <html lang="en">-->
<!--  <head>-->
<!--    <meta charset="UTF-8">-->
<!--    <meta http-equiv="X-UA-Compatible" content="IE=edge">-->
<!--    <meta name="viewport" content="width=device-width, initial-scale=1.0">-->
<!--    <link rel="stylesheet" href="login.css">-->
<!--    <title>Document</title>-->
<!--  </head>-->

<!--  <body>-->
<div>
  <div class="background">
    <img :src="randImgSrc" width="100%" height="100%" />
  </div>
  <div >
    <form action="" class="login">
      <p style="margin-top: 30px; color:#343434;">一站式教培·后台</p>
      <!--    <input style="margin-top: 20px;" type="text" placeholder="用户名">-->
      <!--    <input style="margin-top: 10px;" type="password" placeholder="密码">-->
      <!--    <input type="submit" class="btn" value="登  录">-->
      <el-input style="margin-top: 20px; width: 300px; " type="text" placeholder="用户名" v-model="form.email"></el-input>
      <el-input style="margin-top: 20px; width: 300px;" type="password" placeholder="密码"  v-model="form.password"></el-input>
      <el-button type="primary" style="margin-top: 20px;" @click="onSubmit"> 登录 </el-button>
    </form>
  </div>
</div>

<!--  </body>-->
<!--  </html>-->
</template>
<script>
import common from "@/common/common";
export default {
  data() {
    return {
      randImgSrc:'',
      form: {
        email: "",
        password: ""
      }
    };
  },
  created() {
    this.getImgSrc()
  },
  methods: {
    onSubmit() {

      if (this.checkInputData()){
        let that = this
        that.$axios({
          method: "GET",//指定请求方式
          url: common.commonLocalServer + "/users/login",//请求接口（相对接口，后面会介绍到）
          params: that.form
        }).then(function(res){
          console.log(res.data)
          if (res.data.flag === "T" && res.data.data.type === 2){
            console.log('鉴权成功')
            localStorage.setItem("userInfo",JSON.stringify(res.data.data))
            that.$router.push('/home');
          } else if (res.data.flag === "F"){
            console.log(33)
            that.$message({
              message: '用户不存在或密码错误',
              center: true
            });
          } else {
            that.$message({
              message: '权限不足',
              center: true
            });
          }
        })
            .catch(function(err){
            })
      }

    },
    checkInputData(){
      if (!common.isEmpty(this.form.password) && !common.isEmpty(this.form.email)  ){
        return true
      } else {
        this.$message({
          message: '请填写数据！',
          center: true
        });
        return false
      }
    },
    getImgSrc(){
      var res = this.randomNum(1,13)
      console.log(res)
      this.randImgSrc = "\n" +
          "https://coding-education.xyz/background/" + res + ".jpg"
      // return
    },

    randomNum(minNum,maxNum){
      switch(arguments.length){
      case 1:
        return parseInt(Math.random()*minNum+1,10);
        break;
      case 2:
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
      default:
        return 0;
        break;
  }
}
}
};
</script>

<style scoped>
*{
  user-select: none;
  /* 无法选中，整体感更强 */
}

/*body{*/
/*  background-image: url("../assets/10.jpg");*/
/*  background-size: cover;*/
/*  background-attachment: fixed;*/
/*}*/

.background{
  width:100%;
  height:100%;
  z-index:-1;
  position: absolute;
}


.login{
  position: absolute;
  top: 50%;
  margin-top: -200px;
  left: 50%;
  margin-left: -200px;
  /* absolute居中的一种方法 */
  background-color: rgb(255 255 255 / 0.4);

  /*opacity:0.5;*/
  width: 400px;
  height: 300px;
  border-radius: 25px;
  text-align: center;
  padding: 5px 40px;
  box-sizing: border-box;
  /* 这样padding就不会影响大小 */
}

p{
  font-size: 42px;
  font-weight: 600;
}

/*input{*/
/*  background-color: whitesmoke;*/
/*  width: 100%;*/
/*  height: 48px;*/
/*  margin-bottom: 10px;*/
/*  border: none;*/
/*  !* 下面的会覆盖上面的步伐 *!*/
/*  outline: none;*/
/*  font-size: 22px;*/
/*}*/

.btn{
  background-color: #59c2c5;
  width: 38%;
  height: 48px;
  border-radius: 8px;
  margin-top: 40px;
  font-size: 28px;
  font-weight: 600;
  color: white;
}
.btn:hover{
  background-color: #59c2a0;
}
</style> -->






