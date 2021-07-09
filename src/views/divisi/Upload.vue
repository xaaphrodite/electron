<template>
  <main>
    <header>
      <header-title title="Upload |Divisi" />
    </header>
    <br />
    <article>
      <section>
        <div class="container form" style="color: #57646f">
          <upload-modal />

          <h2>Buat proyek baru</h2>
          <p style="color: #80bc01">{{ message.isSuccess }}</p>
          <p style="color: red">{{ message.isFail }}</p>
          <hr />
          <form class="form" @submit.prevent="upload" enctype="multipart/form-data">
            <label for=""><b>Judul</b></label>
            <div class="input-group flex-nowrap">
              <input v-model="form.title" type="text" class="form-control" placeholder="Nama proyek" aria-label="Username" aria-describedby="addon-wrapping" />
            </div>
            <p id="message">{{ message.title }}</p>
            <!--  -->
            <label for=""><b>Tahun</b></label>
            <div class="input-group flex-nowrap">
              <input v-model="form.year1" type="text" class="form-control" placeholder="Tahun" aria-label="Tahun1" aria-describedby="addon-wrapping" maxlength="4" />
              <!-- <span style="padding: 0px 10px; font-size: 12px"><b>s/d</b></span>
              <input v-model="form.year2" type="text" class="form-control" placeholder="Opsional" aria-label="Tahun2" aria-describedby="addon-wrapping" maxlength="4" /> -->
            </div>
            <p id="message">{{ message.year }}</p>
            <!--  -->
            <label for=""><b>Divisi</b></label>
            <div class="input-group mb-1 mt-1">
              <select class="form-select" id="inputGroupSelect01" v-model="form.divisi">
                <option value="UBGTRANS">UBGTRANS</option>
                <option value="DIV.HCGA">DIV.HCGA</option>
                <option value="UBSBU">UBSBU</option>
              </select>
            </div>
            <p id="message">{{ message.divisi }}</p>
            <!--  -->
            <label for=""><b>ND dari user ke pengguna</b></label>
            <div class="input-group mb-1 mt-1"><input @change="fileOne" type="file" class="form-control" id="fileInput" accept=".pdf" /></div>
            <p id="message">{{ message.files.fileOne }}</p>
            <!--  -->
            <label for=""><b>TOR, RAB, DMR, KKO, KKF, dll</b></label>
            <div class="input-group mb-1 mt-1"><input @change="fileTwo" type="file" class="form-control" id="fileInput" accept=".pdf" /></div>
            <p id="message">{{ message.files.fileTwo }}</p>
            <!--  -->
            <label for=""><b>ND persetujuan pengadaan</b></label>
            <div class="input-group mb-1 mt-1"><input @change="fileThree" type="file" class="form-control" id="fileInput" accept=".pdf" /></div>
            <p id="message">{{ message.files.fileThree }}</p>
            <!--  -->
            <label for=""><b>File excel RAB</b></label>
            <div class="input-group mb-1 mt-1"><input @change="fileFour" type="file" class="form-control" id="fileInput" accept=".xlsx" /></div>
            <p id="message">{{ message.files.fileFour }}</p>
            <!--  -->
            <label for=""><b>Dok. pendukung lainnya</b></label>
            <div class="input-group mb-1 mt-1"><input @change="fileFive" type="file" class="form-control" id="fileInput" /></div>
            <p id="message">{{ message.files.fileFive }}</p>

            <!-- <label for="category"></label> -->
            <div class="input-group mb-1 mt-1">
              <select class="form-select" id="inputGroupSelect01" disabled>
                <option :selected="form.position">{{ form.position.replace(/d/, "UB/D") }}</option>
              </select>
            </div>
            <p id="message">{{ message.category }}</p>

            <div class="mb-1">
              <textarea v-model="form.description" style="height: 150px" class="form-control" id="validationTextarea" placeholder="Deskripsi"></textarea>
            </div>
            <p id="message">{{ message.description }}</p>

            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">List proyek</button>
            <button @click="errMessage" type="submit" class="btn btn-outline-success" style="margin-left: 5px">Submit</button>
          </form>
          <img id="undraw" src="/assets/undraw/undraw4.svg" alt="" />
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import progress from "nprogress";
import useVuelidate from "@vuelidate/core";
import { required, numeric, minLength, maxLength } from "@vuelidate/validators";
import headerTitle from "../../components/header-title.vue";
import UploadModal from "../../components/divisi/upload-modal.vue";
export default {
  components: { headerTitle, UploadModal },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      message: {
        title: null,
        year: null,
        divisi: null,
        files: {
          fileOne: null,
          fileTwo: null,
          fileThree: null,
          fileFour: null,
          fileFive: null,
          fileSix: null,
        },
        category: null,
        description: null,
        isSuccess: null,
        isFail: null,
      },
      form: {
        title: null,
        year1: null,
        // year2: null,
        divisi: null,
        files: {
          fileOne: null,
          fileTwo: null,
          fileThree: null,
          fileFour: null,
          fileFive: null,
        },
        position: this.$store.state.whoAreYou,
        description: null,
        created_at: moment().format("lll"),
      },
    };
  },
  validations() {
    return {
      form: {
        title: { required },
        year1: { required, numeric, minLength: minLength(4), maxLength: maxLength(4) },
        // year2: { numeric, maxLength: maxLength(4) },
        divisi: { required },
        files: {
          // fileOne: { required },
          // fileTwo: { required },
          // fileThree: { required },
          // fileFour: { required },
        },
        position: { required },
        description: { required },
      },
    };
  },
  methods: {
    errMessage() {
      if (this.form.title === "" || this.form.title === null) {
        this.message.title = "Judul tidak boleh kosong";
      } else {
        this.message.title = "";
      }
      if (this.form.divisi === "" || this.form.divisi === null) {
        this.message.divisi = "Tentukan divisi";
      } else {
        this.message.divisi = "";
      }
      // if (this.form.files.fileOne === "" || this.form.files.fileOne === null) {
      //   this.message.files.fileOne = "File dibutuhkan";
      // } else {
      //   this.message.files.fileOne = "";
      // }
      // if (this.form.files.fileTwo === "" || this.form.files.fileTwo === null) {
      //   this.message.files.fileTwo = "File dibutuhkan";
      // } else {
      //   this.message.files.fileTwo = "";
      // }
      // if (this.form.files.fileThree === "" || this.form.files.fileThree === null) {
      //   this.message.files.fileThree = "File dibutuhkan";
      // } else {
      //   this.message.files.fileThree = "";
      // }
      // if (this.form.files.fileFour === "" || this.form.files.fileFour === null) {
      //   this.message.files.fileFour = "File dibutuhkan";
      // } else {
      //   this.message.files.fileFour = "";
      // }
      if (this.form.description === "" || this.form.description === null) {
        this.message.description = "Deskripsi tidak boleh kosong";
      } else {
        this.message.description = "";
      }
    },
    fileOne(event) {
      if (event.target.files[0].type !== "application/pdf") {
        this.message.files.fileOne = "Disarankan file .pdf";
      }
      this.form.files.fileOne = event.target.files[0];
    },
    fileTwo(event) {
      if (event.target.files[0].type !== "application/pdf") {
        this.message.files.fileTwo = "Disarankan file .pdf";
      }
      this.form.files.fileTwo = event.target.files[0];
    },
    fileThree(event) {
      if (event.target.files[0].type !== "application/pdf") {
        this.message.files.fileThree = "Disarankan file .pdf";
      }
      this.form.files.fileThree = event.target.files[0];
    },
    fileFour(event) {
      if (event.target.files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        this.message.files.fileFour = "Disarankan file .xlsx";
      }
      this.form.files.fileFour = event.target.files[0];
    },
    fileFive(event) {
      this.form.files.fileFive = event.target.files[0];
    },
    async upload() {
      this.v$.$validate();
      if (this.v$.$error) {
        this.message.year = "Tahun diisi oleh angka, 4 digit";
        return;
      }
      document.querySelectorAll(".btn").forEach((el) => {
        el.disabled = true;
      });
      this.message.year = "";
      if (this.form.files.fileOne === null) {
        let F = new File([""], "Tidak ada", { type: "text/plain", lastModified: moment().format("lll") });
        this.form.files.fileOne = F;
      }
      if (this.form.files.fileTwo === null) {
        let F = new File([""], "Tidak ada", { type: "text/plain", lastModified: moment().format("lll") });
        this.form.files.fileTwo = F;
      }
      if (this.form.files.fileThree === null) {
        let F = new File([""], "Tidak ada", { type: "text/plain", lastModified: moment().format("lll") });
        this.form.files.fileThree = F;
      }
      if (this.form.files.fileFour === null) {
        let F = new File([""], "Tidak ada", { type: "text/plain", lastModified: moment().format("lll") });
        this.form.files.fileFour = F;
      }
      if (this.form.files.fileFive === null) {
        let F = new File([""], "Tidak ada", { type: "text/plain", lastModified: moment().format("lll") });
        this.form.files.fileFive = F;
      }
      progress.start();
      this.message.isSuccess = "Menyiapkan folder..";
      progress.set(0.4);
      setTimeout(async () => {
        const csrfToken = Cookies.get("saveMe");
        axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        const formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("year", this.form.year1);
        formData.append("division", this.form.divisi);
        formData.append("fileOne", this.form.files.fileOne);
        formData.append("fileTwo", this.form.files.fileTwo);
        formData.append("fileThree", this.form.files.fileThree);
        formData.append("fileFour", this.form.files.fileFour);
        formData.append("fileFive", this.form.files.fileFive);
        formData.append("position", this.form.position);
        formData.append("description", this.form.description);
        formData.append("created_at", this.form.created_at);
        formData.append("descOne", "ND dari user ke pengguna");
        formData.append("descTwo", "TOR,RAB,DMR,KKO,KKF,dll");
        formData.append("descThree", "ND persetujuan pengadaan");
        formData.append("descFour", "File excel RAB");
        formData.append("descFive", "Dok. pendukung lainnya");
        progress.set(0.6);
        await axios
          .post("/api/udocument/" + this.form.position, formData)
          .then((response) => {
            progress.set(0.8);
            this.message.isSuccess = "201 Created ✔";
            setTimeout(() => {
              this.$router.push("/dashboard/divisi/mydocument");
              progress.done();
            }, 1000);
          })
          .catch((error) => {
            this.message.isFail = "Failure " + error.message;
            this.message.isSuccess = "";
            progress.done();
          });
      }, 3000);
    },
  },
};
</script>

<style>
article {
  margin-left: 25px;
}
.form {
  max-width: 500px;
}
#message {
  font-size: 0.8em;
  color: red;
}
#undraw {
  max-width: 100%;
}
/* input[type="file"] {
  color: rgba(0, 0, 0, 0);
} */
@media (max-width: 1469px) {
  section {
    margin-top: 65px;
  }
}
@media (max-width: 990px) {
  article {
    margin-left: 0px;
  }
  .form {
    max-width: 100%;
  }
}
@media (max-width: 436px) {
  article {
    margin-left: 25px;
  }
}
</style>
