<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" @click="klik">
    <div class="container-fluid">
      <i @click="sideBar" class="fas fa-user"></i>
      <router-link @click="sideBar" class="navbar-brand mevnapp" to="">
        <!-- <span style="font-size: 11px; margin-left: 1.5px"> bank of documents</span> -->
        Bank of Documents
        <img src="/assets/undraw/undraw7.svg" />
      </router-link>
      <button @click="rmSide" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <!-- <router-link v-if="imSkills" class="nav-link" to="/skills">Skills</router-link>
          <router-link v-if="imProject" class="nav-link" to="/project">Project</router-link>
          <router-link v-if="imContact" class="nav-link" to="/contact">Contact</router-link>
          <router-link class="nav-link disabled" to="" tabindex="-1" aria-disabled="true">AddPost</router-link> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    imSkills() {
      if (this.$route.name === "Skills") {
        return false;
      }
      return true;
    },
    imProject() {
      if (this.$route.name === "Project") {
        return false;
      }
      return true;
    },
    imContact() {
      if (this.$route.name === "Contact") {
        return false;
      }
      return true;
    },
  },
  methods: {
    sideBar() {
      let sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("active");
      let navbar1 = document.querySelector(".navbar-collapse");
      navbar1.classList.remove("show");
    },
    rmSide() {
      let sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("active");
    },
  },
};
</script>

<style scoped>
nav {
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  transition: 1s;
}
img {
  width: 45px;
}
.navbar-nav {
  color: #80bc01;
}

.fas {
  margin-left: 10px;
}

.mevnapp {
  margin-left: 25px;
}

@media (max-width: 990px) {
  .mevnapp {
    margin-left: 10px;
  }
}

@media (max-width: 378px) {
  .fas {
    margin-left: 0px;
  }

  .mevnapp {
    margin-left: 0px;
    font-size: 0.8em;
  }
}
</style>
