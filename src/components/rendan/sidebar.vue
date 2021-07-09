<template>
  <main>
    <div class="sidebar">
      <ul>
        <li v-if="imHere">
          <router-link to="/dashboard/rendan" @click="sideBar">
            <span class="icon"><i class="fas fa-reply-all"></i></span>
            <span class="title">Kembali</span>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/rendan/mydocument" @click="sideBar">
            <span class="icon"><i class="fas fa-folder-open"></i></span>
            <span class="title">Daftar proyek</span>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/rendan/upload" @click="sideBar">
            <span class="icon"><i class="fas fa-file-upload"></i></span>
            <span class="title">Buat proyek baru</span>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard/rendan/management-report" @click="sideBar">
            <span class="icon"><i class="fas fa-file-signature"></i></span>
            <span class="title">Laporan manajemen</span>
          </router-link>
        </li>
        <li>
          <router-link to="" @click="sideBar(); logout();">
            <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
            <span class="title">Logout</span>
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  computed:{
    imHere(){
      if(this.$route.name !== "rDashboard"){
        return true
      }
      return false
    }
  },
  methods: {
    sideBar() {
      let sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("active");
      let navbar1 = document.querySelector(".navbar-collapse");
      navbar1.classList.remove("show");
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  width: 60px;
  height: 100%;
  background: #f8f9fa;
  transition: 1s;
  overflow: hidden;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.sidebar:hover,
.sidebar.active {
  width: 300px;
}
.sidebar > ul {
  position: absolute;
  top: 0;
  left: -10px;
  width: 100%;
}
.sidebar ul li {
  position: relative;
  width: 100%;
  list-style: none;
}
.sidebar ul li a:hover {
  color: #80bc01;
}
.sidebar ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: black;
}
.sidebar ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: start;
}
.sidebar ul li a .icon .fa {
  font-size: 24px;
}
.sidebar ul li a .title {
  position: relative;
  display: block;
  padding: 0 0px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}
@media (max-width: 1469px) {
  .sidebar {
    margin-top: 60px;
  }
}
@media (max-width: 991px) {
  .sidebar {
    left: -60px;
  }
  .sidebar.sidebar.active {
    left: 0px;
    width: 100%;
  }
}
</style>
