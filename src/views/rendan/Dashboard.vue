<template>
  <main>
    <header>
      <navbar />
      <sidebar />
    </header>
    <article>
      <section style="margin-left: 10px" class="d-flex" id="landingpage" v-if="index">
        <header-title title="Dashboard |Rendan" />
        <div class="container jumbotron jumbotron-fluid">
          <div class="container">
            <br />
            <h1 class="display-4 mt-5">Bank of documents / <span style="color: #80bc01">Rendan</span></h1>
            <p class="lead">Aplikasi halaman tunggal dengan teknologi MEVN.</p>
            <hr />
          </div>
          <br />
          <div id="text">
            <div class="container">
              <h3>Tingkatan user</h3>
              <hr />
              <h4>Lakdan</h4>
              <p><i class="fas fa-angle-double-down"></i></p>
              <h4 style="color: #80bc01">Rendan</h4>
              <p><i class="fas fa-angle-double-down"></i></p>
              <h4>UB/Divisi</h4>
            </div>
          </div>
          <img id="svg" src="/assets/undraw/undraw11.png" />
          <p>Ketuk panel di atas untuk opsi lainnya</p>
        </div>
      </section>
      <router-view />
    </article>
  </main>
</template>

<script>
import HeaderTitle from "../../components/header-title";
import navbar from "../../components/rendan/navbar";
import Sidebar from "../../components/rendan/sidebar";
export default {
  components: { navbar, Sidebar, HeaderTitle },
  computed: {
    index() {
      return this.$route.name === "rDashboard";
    },
  },
};
</script>

<style scoped>
article {
  width: 97%;
  margin-top: 59px;
}
#text {
  color: #57646f;
}
#mevn {
  width: 70px;
}
section {
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
}
article {
  margin-top: 59px;
}
.jumbotron {
  color: #57646f;
  text-align: start;
  margin-left: 50px;
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
#svg {
  max-width: 50%;
  max-height: 100%;
  margin-left: 20px;
  z-index: -3;
  border-radius: 25px;
  margin-top: -100px;
  margin-left: 150px;
  /* box-shadow: 10px 7px 10px rgba(0, 0, 0, 0.5); */
}
ul {
  display: flex;
  flex-direction: column;
}
ul li {
  list-style: none;
}
ul li a {
  display: block;
  text-decoration: none;
  text-align: center;
  font-size: 3em;
  font-weight: 700;
  color: #e6e7e8;
  text-transform: uppercase;
}
ul li a:hover {
  color: #57646f;
  transition: all 0.5s ease-in-out;
}
ul li a::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 1;
  width: 100%;
  height: 100%;
  margin-left: -875px;
  margin-top: -63px;
  overflow: hidden;
  z-index: -1;
  font-size: 2.8em;
  color: #80bc01;
  opacity: 0;
  line-height: 100vh;
  transition: all 0.7s ease-in-out;
  font-weight: 400;
}
ul li:hover a::before {
  opacity: 1;
}
@media (max-width: 1469px) {
  article {
    margin-top: 0px;
  }
  section {
    margin-top: 0px;
  }
}
@media (max-width: 1400px) {
  ul li a::before {
    display: none;
  }
  ul li a:hover {
    color: #57646f;
  }
}
@media (max-width: 991px) {
  .jumbotron {
    margin-right: 0px;
  }
  .jumbotron h1 {
    font-size: 1.8em;
  }
  #mevn {
    max-width: 66px;
  }
  #text {
    margin-left: 15px;
    font-size: 0.8em;
  }
}
@media (max-width: 800px) {
  .jumbotron {
    margin-left: 0px;
  }
  #svg {
    /* display: none; */
    margin-top: -170px;
  }
}
@media (max-width: 435px) {
  .jumbotron h5 {
    font-size: 1.5em;
  }
  .jumbotron p {
    font-size: 0.8em;
  }
  #svg {
    max-height: 43%;
    max-width: 43%;
  }
  article {
    margin-left: -10px;
  }
}
</style>
