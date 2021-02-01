<template lang="pug">
#regandlogin
  #loginbox
    #login
      p.m-0.pb-3.text-center 歡迎來到呷胖胖!
      img.image(:src="'./Home/cartImage.png'")
      login
    #reg
      p.m-0.pb-3.text-center 歡迎加入呷胖胖!
      img.image(:src="'./Home/cartImage.png'")
      reg
    p.btn.islogin.m-0 *還沒有帳號嗎？點擊這裡註冊
</template>

<style scoped lang='scss'>
@import "../assets/scss/all.scss";
  #regandlogin {
    width: 100%;
    height: 100vh;
    background: #fff;
  }
  #login,
  #reg {
    width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  #login {
    display: flex;
  }
  #reg {
    display: none;
  }
  #signinbox,
  #loginbox {
    width: 80%;
    height: auto;
    padding: 3% 0;
    border-radius: 1rem 1rem 1rem 1rem;
    background: #fff;
    position: relative;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0 0 7px #c5c4a6;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    transition: .4s;
  }
  p {
    font-size: 1.05rem;
    letter-spacing: 0.1rem;
    font-weight: 500;
    color: #785651;
  }
  .btn {
    font-weight: 400;
    margin-top: 5rem;
    font-size: .3rem;
    &:hover {
      color: #af5b4e;
    }
  }
  .image {
    width: 30%;
  }
  @media (min-width: 768px) {
    #loginbox
    ,#signinbox {
      width: 30%;
    }

  }
</style>

<script>
import login from '../components/Login.vue'
import reg from '../components/Reg.vue'
export default {
  name: 'regandlogin',
  data () {
    return {
      islogin: true
    }
  },
  components: {
    login,
    reg
  },
  mounted () {
    const loginBtn = document.querySelector('.islogin')
    const loginbox = document.querySelector('#login')
    const signinbox = document.querySelector('#reg')
    loginBtn.onclick = () => {
      if (this.islogin) {
        loginbox.style.display = 'none'
        signinbox.style.display = 'flex'
        loginBtn.innerText = '*已經有帳號的話請點這邊登入'
        this.islogin = false
      } else {
        loginbox.style.display = 'flex'
        signinbox.style.display = 'none'
        this.islogin = true
        loginBtn.innerText = '*還沒有帳號嗎？點擊這裡註冊'
      }
    }
  }
}
</script>
