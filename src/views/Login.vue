<template>
  <main>
    <header-title title="Login |BankofDocuments" />
    <header></header>
    <article>
      <section>
        <br />
        <div class="l-form" @submit.prevent="login">
          <form action="" class="form">
            <div class="container jumbotron jumbotron-fluid mt-5">
              <div class="container">
                <router-link to="/">
                  <h1 class="display-4">Bank of Documents <img id="mevn" src="/assets/undraw/undraw7.svg" /></h1>
                </router-link>
              </div>
            </div>

            <p id="message">{{ message }}</p>

            <div class="form__div">
              <input type="text" class="form__input" v-model="form.username" placeholder=" " name="username" id="username" />
              <label for="" class="form__label">Username</label>
            </div>

            <div class="form__div">
              <input type="password" class="form__input" v-model="form.password" placeholder=" " name="password" id="password" />
              <label for="" class="form__label">Password</label>
            </div>

            <button type="submit" name="login" id="login" class="btn btn-outline-success">Sign In</button>
            <img id="undraw" src="/assets/undraw/undraw6.svg" alt="" />
          </form>
        </div>
        <div id="particles-js"></div>
      </section>
      <slot />
    </article>
  </main>
</template>

<script>
import CryptoJS from "crypto-js";
import progress from "nprogress";
import firebase from "firebase";
import headerTitle from "../components/header-title.vue";
export default {
  components: { headerTitle },
  data() {
    return {
      message: null,
      form: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    console.clear();
  },
  methods: {
    async login() {
      if (this.form.username === "" || this.form.password === "") {
        this.message = "Both fields are required";
        return;
      }
      this.message = "";
      let send = document.querySelectorAll(".submit");
      send.forEach((el) => {
        el.classList.add("none");
      });
      let load = document.querySelectorAll(".request");
      load.forEach((el) => {
        el.classList.remove("none");
      });
      progress.start();
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.username, this.form.password)
        .then((response) => {
          let auth = CryptoJS.AES.encrypt(this.form.username, "756433").toString();
          localStorage.setItem("auth", auth);
          localStorage.setItem("identifier", this.form.username);
          this.$router.push("/dashboard/divisi");
          return response;
        })
        .catch((error) => {
          let send = document.querySelectorAll(".submit");
          send.forEach((el) => {
            el.classList.remove("none");
          });
          let load = document.querySelectorAll(".request");
          load.forEach((el) => {
            el.classList.add("none");
          });
          console.clear();
          this.form.password = "";
          this.message = "Wrong email or password";
          return error;
        });
      progress.done();
    },
  },
};
</script>

<style scoped>
#particles-js {
  max-height: 15%;
  text-align: left;
  position: fixed;
  bottom: 0;
  left: 0;
}
.container {
  display: flex;
  justify-content: center;
}
.jumbotron {
  color: #57646f;
  text-align: start;
  transition: all 0.5s ease 0s;
}
.jumbotron h5 {
  font-size: 2em;
}
.jumbotron p {
  font-size: 0.9em;
  font-weight: 500;
  margin-left: 5px;
}
p,
a {
  color: #57646f;
}
#mevn {
  max-width: 100px;
  max-height: 100px;
}
#message {
  color: red;
  margin-top: -25px;
  margin-bottom: 0px;
  margin-left: 5px;
  position: fixed;
  font-size: 0.7em;
}
section {
  display: flex;
  height: 50vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30vh;
}
button {
  border-block-color: #80bc01;
  border-color: #80bc01;
  margin-left: 2px;
  margin-top: -8px;
}
button:hover {
  background-color: #80bc01;
  border-color: #80bc01;
}
#undraw {
  width: 200px;
  z-index: -1;
  margin-top: -84px;
  margin-left: 77px;
}
img {
  width: 64px;
}
h1 {
  margin: 0;
  font-weight: 400;
  font-size: 1.2em;
  margin-top: -70px;
  margin-bottom: 20px;
}
/*===== FORM =====*/
.l-form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
  height: 100vh;
}
.form {
  width: 360px;
  height: 80%;
  padding: 4rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(92, 99, 105, 0.2);
  margin-right: 0px;
  margin-left: 0px;
}
.form__div {
  position: relative;
  height: 48px;
  margin-bottom: 1rem;
}
.form__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  border: 1px solid #57646f;
  border-radius: 0.5rem;
  outline: none;
  padding: 1rem;
  background: none;
  z-index: 1;
}
.form__label {
  position: absolute;
  left: 1rem;
  top: 0.87rem;
  padding: 0 0.25rem;
  background-color: #fff;
  color: #80868b;
  font-size: 1rem;
  transition: 0.3s;
}
.form__button {
  display: block;
  margin-left: auto;
  padding: 0.75rem 2rem;
  outline: none;
  border: none;
  background-color: #80bc01;
  color: #fff;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s;
}
.form__button:hover {
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.15);
}
/*Input focus move up label*/
.form__input:focus + .form__label {
  top: -0.5rem;
  left: 0.8rem;
  color: #80bc01;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 10;
}
/*Input focus sticky top label*/
.form__input:not(:placeholder-shown).form__input:not(:focus) + .form__label {
  top: -0.5rem;
  left: 0.8rem;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 10;
}
/*Input focus*/
.form__input:focus {
  border: 1.5px solid #80bc01;
}
@media (max-width: 1920px) {
  .form {
    height: 90%;
  }
}
@media (max-width: 766px) {
  .jumbotron h1 {
    font-size: 1.2em;
  }
  #mevn {
    max-width: 60px;
    max-height: 60px;
  }
}
@media (max-width: 436px) {
  section {
    margin-bottom: 2vh;
  }
  .jumbotron h1 {
    font-size: 1em;
  }
}
</style>
