<template>
  <main>
    <header>
      <header-title title="My Document |Lakdan" />
    </header>
    <article>
      <div v-for="data in documents" :key="data._id">
        <details-modal :document="data" />
        <update-modal :document="data" />
      </div>
      <!-- Core Page -->
      <br />
      <section class="container">
        <div class="container mt-2">
          <div class="jumbotron">
            <h1 class="display-4">Daftar proyek</h1>
            <p class="lead">Unit hero sederhana, komponen gaya jumbotron sederhana untuk meminta perhatian ekstra pada konten atau informasi unggulan.</p>
            <p style="color: #80bc01; margin-bottom: -12px; margin-top: -10px; margin-left: 7px">{{ message.isSuccess }}</p>
            <p style="color: red; margin-bottom: -12px; margin-top: -10px; margin-left: 7px">{{ message.isFail }}</p>
          </div>
          <hr />

          <div class="container search">
            <form id="search" class="d-flex mb-3">
              <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Cek judul, tahun, divisi atau posisi" aria-label="Search" />
              <!-- <button class="btn btn-outline-success" type="submit">Cari</button> -->
            </form>
          </div>

          <table v-if="resources.length">
            <thead>
              <tr>
                <th style="text-align: center">Index</th>
                <th>Tahun</th>
                <th>Divisi</th>
                <th>Judul</th>
                <th>Posisi</th>
                <th>Dibuat</th>
                <th>Diubah</th>
                <th>Opsi</th>
                <th>Ket</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(document, index) in resultQuery" :key="document._id">
                <td data-label="Index" id="index">
                  <strong>{{ index + 1 }}</strong>
                </td>
                <td data-label="Tahun">{{ document.year }}</td>
                <td data-label="Divisi">{{ document.division }}</td>
                <td data-label="Judul">{{ document.title }}</td>
                <td data-label="Posisi">{{ document.position }}</td>
                <td data-label="Dibuat">-{{ document.created_at }}</td>
                <td data-label="Diubah">-{{ document.updated_at }}</td>
                <td data-label="Opsi">
                  <a id="options" @click="download" :value="document._id" :title="document.title">Download </a>
                  <span>|</span>
                  <a id="options" data-bs-toggle="modal" data-bs-backdrop="false" :data-bs-target="`#${document.title.replace(/\s/g, '')}`"> Details </a>
                  <span v-if="document.position !== 'rendan' && document.position !== 'divisi'">|</span>
                  <a v-if="document.position !== 'rendan' && document.position !== 'divisi'" id="options" data-bs-toggle="modal" data-bs-backdrop="false" :data-bs-target="`#update${document.title.replace(/\s/g, '')}`"> Update</a>
                </td>
                <td>Keterangan disini</td>
              </tr>
            </tbody>
          </table>
          <!-- <img id="undraw" src="/assets/undraw/undraw5.svg" alt="" /> -->
          <hr />
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import progress from "nprogress";
import headerTitle from "../../components/header-title.vue";
import DetailsModal from "../../components/lakdan/details-modal.vue";
import UpdateModal from "../../components/lakdan/update-modal.vue";
export default {
  components: { headerTitle, DetailsModal, UpdateModal },
  data() {
    return {
      documents: null,
      searchQuery: null,
      resources: [],
      message: {
        isSuccess: null,
        isFail: null,
      },
      api: {
        url: "/api/document/",
        download: "/api/document/compress/",
      },
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.resources.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.year.toLowerCase().includes(v) || item.title.toLowerCase().includes(v) || item.position.toLowerCase().includes(v));
        });
      } else {
        return this.resources;
      }
    },
  },
  async created() {
    window.onpopstate = () => {
      $("body").removeClass("modal-open");
      document.querySelector(".modal-backdrop").remove();
    };
    const csrfToken = Cookies.get("saveMe");
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    const result = await axios
      .post(this.api.url)
      .then((response) => {
        const data = CryptoJS.AES.decrypt(response.data.documents, "isSecure").toString(CryptoJS.enc.Utf8);
        const parseData = JSON.parse(data);
        this.documents = parseData;
        for (let key in parseData) {
          const data = parseData[key];
          this.resources.push({ _id: data._id, year: data.year, division: data.division, title: data.title, position: data.position, created_at: data.created_at, updated_at: data.updated_at });
        }
      })
      .catch((error) => {
        console.log("Failure " + error.message);
      });
    return result;
  },
  methods: {
    download(event) {
      progress.start();
      this.message.isSuccess = "Mengkompres file..";
      setTimeout(async () => {
        const id = event.target.getAttribute("value");
        const title = event.target.getAttribute("title");
        const fileName = `${title}_${id}.zip`;
        await axios({
          url: this.api.download + id,
          method: "POST",
          responseType: "blob",
        })
          .then((response) => {
            progress.set(0.4);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            this.message.isSuccess = "200 OK ✔";
            progress.set(0.6);
            setTimeout(() => {
              link.click();
              this.message.isSuccess = "";
              progress.done();
            }, 1000);
          })
          .catch((error) => {
            this.message.isFail = "Failure " + error.message;
            this.message.isSuccess = "";
            progress.done();
          });
      }, 2000);
    },
  },
};
</script>

<style scoped>
section {
  margin-bottom: 35vh;
}
#search {
  width: 50%;
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
}
table tr {
  border: 1px solid #ddd;
  padding: 5px;
}
table th,
table td {
  padding: 10px;
  text-align: start;
}
table th {
  font-size: 14px;
  letter-spacing: 1px;
  /* text-transform: uppercase; */
}
/* ------------------------------------------- */
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
#index {
  text-align: center;
}
#undraw {
  max-width: 300px;
  margin-left: 63px;
}
#options {
  color: #80bc01;
  cursor: pointer;
}
a {
  color: #57646f;
}
@media (max-width: 1469px) {
  section {
    margin-top: 65px;
  }
}
@media (max-width: 991px) {
  /*Default 765px */
  #search {
    width: 103%;
  }
  .jumbotron {
    font-size: 0.6em;
    margin-left: 0px;
  }
  .jumbotron h1 {
    font-size: 2.5em;
  }
  #undraw {
    max-width: 150px;
    margin-left: 99px;
  }
}
@media screen and (max-width: 991px) {
  /*Default 765px */
  section {
    margin-bottom: 0vh;
  }
  table {
    border: 0;
  }
  table thead {
    display: none;
  }
  table tr {
    border-bottom: 2px solid #ddd;
    display: block;
    margin-bottom: 10px;
  }
  table td {
    border-bottom: 1px dotted #ccc;
    display: block;
    font-size: 13px;
    text-align: right;
  }
  table td:last-child {
    border-bottom: 0;
  }
  table td:before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    /* text-transform: uppercase; */
  }
  #index {
    text-align: end;
  }
}
</style>
