<template>
  <main>
    <header></header>
    <article>
      <!-- Modal -->
      <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="uploadModalLabel">List proyek</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div class="container search">
                <form id="search" class="d-flex mb-3">
                  <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Cek judul, posisi, atau tahun" aria-label="Search" />
                  <!-- <button class="btn btn-outline-success" type="submit">Cari</button> -->
                </form>
              </div>
              <h6>
                Tap/click nama file untuk download <br />
                <span style="font-size: 0.7em">Lakdan - Rendan - UB/Divisi</span>
              </h6>

              <!-- <p style="color: #80bc01">{{ message.isSuccess }}</p> -->
              <p style="color: red">{{ message.isFail }}</p>

              <table v-if="resources.length">
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Posisi</th>
                    <th>Tahun</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="document in resultQuery" :key="document._id">
                    <td data-label="Judul">{{ document.title }}</td>
                    <td data-label="Posisi">{{ document.position }}</td>
                    <td data-label="Tahun">{{ document.year.match(/^\d{4}/).join("") }}</td>
                    <td data-label="File">
                      <strong>{{ document.file.fileOne.desc }}</strong>
                      <br />
                      <p @click="dwnd" id="dwnd" :nameFile="document.file.fileOne.name" :path="document.file.fileOne.path" :position="document.position" loc="fileOne">
                        <span style="color: #80bc01" v-if="location === document.file.fileOne.path">{{ message.files.green.fileOne }}</span>
                        {{ document.file.fileOne.name }}
                      </p>
                      <!--  -->
                      <strong>{{ document.file.fileTwo.desc }}</strong>
                      <br />
                      <p @click="dwnd" id="dwnd" :nameFile="document.file.fileTwo.name" :path="document.file.fileTwo.path" :position="document.position" loc="fileTwo">
                        <span style="color: #80bc01" v-if="location === document.file.fileTwo.path">{{ message.files.green.fileTwo }}</span>
                        {{ document.file.fileTwo.name }}
                      </p>
                      <!--  -->
                      <strong>{{ document.file.fileThree.desc }}</strong>
                      <br />
                      <p @click="dwnd" id="dwnd" :nameFile="document.file.fileThree.name" :path="document.file.fileThree.path" :position="document.position" loc="fileThree">
                        <span style="color: #80bc01" v-if="location === document.file.fileThree.path">{{ message.files.green.fileThree }}</span>
                        {{ document.file.fileThree.name }}
                      </p>
                      <!--  -->
                      <strong>{{ document.file.fileFour.desc }}</strong>
                      <br />
                      <p @click="dwnd" id="dwnd" :nameFile="document.file.fileFour.name" :path="document.file.fileFour.path" :position="document.position" loc="fileFour">
                        <span style="color: #80bc01" v-if="location === document.file.fileFour.path">{{ message.files.green.fileFour }}</span>
                        {{ document.file.fileFour.name }}
                      </p>
                      <!--  -->
                      <strong>{{ document.file.fileFive.desc }}</strong>
                      <br />
                      <p @click="dwnd" id="dwnd" :nameFile="document.file.fileFive.name" :path="document.file.fileFive.path" :position="document.position" loc="fileFive">
                        <span style="color: #80bc01" v-if="location === document.file.fileFive.path">{{ message.files.green.fileFive }}</span>
                        {{ document.file.fileFive.name }}
                      </p>
                      <!--  -->
                      <strong>{{ document.file.fileSix?.desc }}</strong>
                      <br />
                      <p @click="dwnd" id="dwnd" :nameFile="document.file.fileSix?.name" :path="document.file.fileSix?.path" :position="document.position" loc="fileSix">
                        <span style="color: #80bc01" v-if="location === document.file.fileSix?.path">{{ message.files.green.fileSix }}</span>
                        {{ document.file.fileSix?.name }}
                      </p>
                      <!--  -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  </main>
</template>

<script>
import CryptoJS from "crypto-js";
import progress from "nprogress";
import Cookies from "js-cookie";
import axios from "axios";
export default {
  data() {
    return {
      message: {
        isSuccess: null,
        isFail: null,
        files: {
          green: {
            fileOne: null,
            fileTwo: null,
            fileThree: null,
            fileFour: null,
            fileFive: null,
            fileSix: null,
          },
          red: {
            fileOne: null,
            fileTwo: null,
            fileThree: null,
            fileFour: null,
            fileFive: null,
            fileSix: null,
          },
        },
      },
      documents: null,
      searchQuery: null,
      resources: [],
      location: null,
      api: {
        url: "/api/document/",
        download: "/api/document/compress/",
        dwndFile: "/api/dwnd-document/",
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
          this.resources.push({ year: data.year, division: data.division, title: data.title, position: data.position, file: data.projectFile });
        }
      })
      .catch((error) => {
        console.log("Failure " + error.message);
      });
    return result;
  },
  methods: {
    dwnd(event) {
      // let whoAreYou = event.target.getAttribute("position");
      // if (store.state.whoAreYou !== whoAreYou) {
      //   return;
      // }

      progress.start();
      const path = event.target.getAttribute("path");
      const file = event.target.getAttribute("loc");
      this.location = path;
      this.message.isSuccess = "Menyiapkan file..";
      this.message.files.green[file] = "Menyiapkan file..";
      setTimeout(async () => {
        const nameFile = event.target.getAttribute("nameFile");
        await axios({
          url: this.api.dwndFile,
          method: "POST",
          params: path,
          responseType: "blob",
        })
          .then((response) => {
            progress.set(0.4);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", nameFile);

            document.body.appendChild(link);
            this.message.isSuccess = "200 OK ✔";
            progress.set(0.6);
            setTimeout(() => {
              link.click();
              this.message.isSuccess = "";
              this.message.files.green[file] = "";
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
