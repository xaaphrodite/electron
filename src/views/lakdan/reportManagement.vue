<template>
  <main>
    <header>
      <header-title title="Management-report |Lakdan" />
    </header>
    <article>
      <br />
      <section class="container">
        <div class="container mt-2">
          <div class="jumbotron">
            <h1 class="display-4">Laporan manajemen</h1>
            <p class="lead">Unit hero sederhana, komponen gaya jumbotron sederhana untuk meminta perhatian ekstra pada konten atau informasi unggulan.</p>
            <p style="color: #80bc01; margin-bottom: -12px; margin-top: -10px; margin-left: 7px"></p>
            <p style="color: red; margin-bottom: -12px; margin-top: -10px; margin-left: 7px"></p>
          </div>
          <hr />

          <div class="container">
            <form @submit.prevent="show" class="form">
              <!--  -->
              <label for=""><b>Tahun</b></label>
              <div class="input-group flex-nowrap">
                <input v-model="searchQuery" type="text" class="form-control" placeholder="Dari" aria-label="Tahun1" aria-describedby="addon-wrapping" maxlength="4" />
                <span style="padding: 0px 10px; font-size: 12px"><b>-</b></span>
                <input @change="hideMessage" v-model="searchQuery1" type="text" class="form-control" placeholder="Hingga" aria-label="Tahun2" aria-describedby="addon-wrapping" maxlength="4" />
              </div>
              <p style="color: #80bc01; margin-top: -10px; margin-left: 7px">{{ message.isSuccess }}</p>
              <p style="color: red; margin-top: -10px; margin-left: 7px">{{ message.isFail }}</p>
              <!--  -->
              <label for="" class="mt-2"><b>Divisi</b></label>
              <div class="input-group mb-1">
                <select class="form-select" id="inputGroupSelect01" v-model="searchQuery2" @change="hide">
                  <option value="UBGTRANS">UBGTRANS</option>
                  <option value="DIV.HCGA">DIV.HCGA</option>
                  <option value="UBSBU">UBSBU</option>
                </select>
              </div>
              <p id="message"></p>
              <!--  -->
              <button @click="show" type="submit" class="btn btn-outline-success" style="margin-left: 5px">Tampilkan</button>
            </form>
            <hr />
          </div>
          <table v-if="resources.length">
            <thead>
              <tr>
                <th></th>
                <th style="text-align: center">No</th>
                <th>Judul</th>
                <th>Tahun</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody v-if="showTable && searchQuery && searchQuery2">
              <tr v-for="(document, index) in filterYear" :key="document._id">
                <td>{{ document.division }} {{ document.year }}</td>
                <td data-label="No" id="index">
                  <strong>{{ index + 1 }}</strong>
                </td>
                <td data-label="Judul">{{ document.title }}</td>
                <td data-label="Tahun">{{ document.year }}</td>
                <td data-label="Keterangan">{{ document.description }}</td>
              </tr>
            </tbody>
          </table>
          <div class="container">
            <hr />
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import headerTitle from "../../components/header-title.vue";
export default {
  components: { headerTitle },
  data() {
    return {
      documents: null,
      searchQuery: null,
      searchQuery1: null,
      searchQuery2: null,
      resources: [],
      showTable: false,
      message: {
        year: null,
        divisi: null,
        isSuccess: null,
        isFail: null,
      },
      form: {
        year1: null,
        year2: null,
        division: null,
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
          return (
            this.searchQuery
              .toLowerCase()
              .split(" ")
              .every((v) => item.year.toLowerCase().includes(v) || item.title.toLowerCase().includes(v) || item.division.toLowerCase().includes(v)) &&
            this.searchQuery1
              .toLowerCase()
              .split(" ")
              .every((v) => item.year.toLowerCase().includes(v) || item.title.toLowerCase().includes(v) || item.division.toLowerCase().includes(v)) &&
            this.searchQuery2
              .toLowerCase()
              .split(" ")
              .every((v) => item.year.toLowerCase().includes(v) || item.title.toLowerCase().includes(v) || item.division.toLowerCase().includes(v))
          );
        });
      } else {
        return this.resources;
      }
    },
    filterYear() {
      let year1 = this.searchQuery;
      let year2 = this.searchQuery1;
      let division = this.searchQuery2;
      return this.resources.filter((data) => {
        if (year1 !== null && year2 !== null && division !== data.division) {
          return false;
        } else {
          let year = data.year;
          return year >= year1 && year <= year2;
        }
      });
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
          this.resources.push({ _id: data._id, year: data.year, division: data.division, title: data.title, position: data.position, description: data.description });
        }
      })
      .catch((error) => {
        console.log("Failure " + error.message);
      });
    return result;
  },
  methods: {
    show() {
      if (this.searchQuery && this.searchQuery1 === null) {
        return (this.message.isFail = "Tentukan tahun kedua");
      }
      return (this.showTable = true);
    },
    hide() {
      return (this.showTable = false);
    },
    hideMessage() {
      return (this.message.isFail = "");
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 500px;
}
#message {
  font-size: 0.8em;
  color: red;
}
section {
  margin-bottom: 35vh;
}
#dwnd {
  cursor: pointer;
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
