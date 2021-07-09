<template>
  <main>
    <header></header>
    <article>
      <!-- Modal -->
      <div class="modal fade" :id="`update${document.title.replace(/\s/g, '')}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" :id="`update${document.title.replace(/\s/g, '')}`">{{ document.title }}</h5>
              <button @click="clearMessage" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Modal Body -->
            <div class="modal-body">
              <div class="container">
                <!-- Update Column -->
                <div class="col" style="margin-top: 5px">
                  <div class="container form" style="color: #57646f">
                    <h2>Perbarui proyek</h2>
                    <p style="color: #80bc01">{{ message.isSuccess }}</p>
                    <p style="color: red">{{ message.isFail }}</p>
                    <hr />
                    <form class="form" @submit.prevent="update" :id="`${document._id}`" enctype="multipart/form-data">
                      <label for=""><b>Judul</b></label>
                      <div class="input-group flex-nowrap">
                        <input v-model="form.title" type="text" class="form-control" placeholder="Judul" aria-label="Username" aria-describedby="addon-wrapping" disabled />
                      </div>
                      <p id="message">{{ message.title }}</p>
                      <!--  -->
                      <label for=""><b>Draft final RKS</b> : {{ form.files.fileOne }}</label>
                      <div class="input-group mb-1 mt-1"><input @change="fileOne" type="file" class="form-control" id="fileInput" accept=".docx" /></div>
                      <p id="message">{{ message.files.fileOne }}</p>
                      <!--  -->
                      <label for=""><b>HPE</b> : {{ form.files.fileTwo }}</label>
                      <div class="input-group mb-1 mt-1"><input @change="fileTwo" type="file" class="form-control" id="fileInput" accept=".pdf" /></div>
                      <p id="message">{{ message.files.fileTwo }}</p>
                      <!--  -->
                      <label for=""><b>File excel HPE</b> : {{ form.files.fileThree }}</label>
                      <div class="input-group mb-1 mt-1"><input @change="fileThree" type="file" class="form-control" id="fileInput" accept=".xlsx" /></div>
                      <p id="message">{{ message.files.fileThree }}</p>
                      <!--  -->
                      <label for=""><b>ND penyampaian RKS & HPE</b> : {{ form.files.fileFour }}</label>
                      <div class="input-group mb-1 mt-1"><input @change="fileFour" type="file" class="form-control" id="fileInput" /></div>
                      <p id="message">{{ message.files.fileFour }}</p>
                      <!--  -->
                      <label for=""><b>ND EVPSPROC</b> : {{ form.files.fileFive }}</label>
                      <div class="input-group mb-1 mt-1"><input @change="fileFive" type="file" class="form-control" id="fileInput" /></div>
                      <p id="message">{{ message.files.fileFive }}</p>
                      <!--  -->
                      <label for=""><b>Dok. pendukung lainnya</b> : {{ form.files.fileSix }}</label>
                      <div class="input-group mb-1 mt-1"><input @change="fileSix" type="file" class="form-control" id="fileInput" /></div>
                      <p id="message">{{ message.files.fileSix }}</p>

                      <!-- <label for="category"></label> -->
                      <div class="input-group mb-1 mt-1">
                        <select class="form-select" id="inputGroupSelect01" disabled>
                          <option :selected="form.position">{{ form.position.replace(/r/, "R") }}</option>
                        </select>
                      </div>
                      <p id="message">{{ message.category }}</p>

                      <div class="mb-1">
                        <textarea v-model="form.description" style="height: 150px" class="form-control" id="validationTextarea" placeholder="Deskripsi"></textarea>
                      </div>
                      <p id="message">{{ message.description }}</p>

                      <button @click="errMessage" :oldFolder="`${document.title}`" type="submit" class="btn btn-outline-success">Submit</button>
                    </form>
                    <img id="undraw" src="/assets/undraw/undraw8.svg" alt="" />
                  </div>
                </div>
                <!-- End Update Column -->
              </div>
            </div>
            <!-- End Modal Body -->

            <!-- Footer -->
            <div class="modal-footer">
              <button @click="clearMessage" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
            <!-- End Footer -->
          </div>
        </div>
      </div>
      <!-- End Modal -->
    </article>
  </main>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import progress from "nprogress";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import moment from "moment";
export default {
  props: ["document", "disable"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      message: {
        title: null,
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
        title: this.document.title,
        oldFolder: this.document.title,
        files: {
          fileOne: this.document.projectFile.fileOne.name,
          fileTwo: this.document.projectFile.fileTwo.name,
          fileThree: this.document.projectFile.fileThree.name,
          fileFour: this.document.projectFile.fileFour.name,
          fileFive: this.document.projectFile.fileFive.name,
          fileSix: this.document.projectFile.fileSix?.name,
        },
        position: this.$store.state.whoAreYou,
        description: this.document.description,
        updated_at: moment().format("lll"),
      },
      api: {
        url: "/api/document/",
      },
    };
  },
  validations() {
    return {
      form: {
        title: { required },
        files: {
          fileOne: { required },
          fileTwo: { required },
          fileThree: { required },
          fileFour: { required },
        },
        position: { required },
        description: { required },
        updated_at: { required },
      },
    };
  },
  methods: {
    errMessage(event) {
      const oldFolder = event.target.getAttribute("oldFolder");
      this.form.oldFolder = oldFolder;

      if (this.form.title === "" || this.form.title === null) {
        this.message.title = "Judul tidak boleh kosong";
      } else {
        this.message.title = "";
      }
      if (this.form.files.fileOne === "" || this.form.files.fileOne === null) {
        this.message.files.fileOne = "File dibutuhkan";
      } else {
        this.message.files.fileOne = "";
      }
      if (this.form.files.fileTwo === "" || this.form.files.fileTwo === null) {
        this.message.files.fileTwo = "File dibutuhkan";
      } else {
        this.message.files.fileTwo = "";
      }
      if (this.form.files.fileThree === "" || this.form.files.fileThree === null) {
        this.message.files.fileThree = "File dibutuhkan";
      } else {
        this.message.files.fileThree = "";
      }
      if (this.form.files.fileFive === "" || this.form.files.fileFive === null) {
        this.message.files.fileFive = "File dibutuhkan";
      } else {
        this.message.files.fileFive = "";
      }
      if (this.form.files.fileSix === "" || this.form.files.fileSix === null) {
        this.message.files.fileSix = "File dibutuhkan";
      } else {
        this.message.files.fileSix = "";
      }
      if (this.form.description === "" || this.form.description === null) {
        this.message.description = "Deskripsi tidak boleh kosong";
      } else {
        this.message.description = "";
      }
    },

    fileOne(event) {
      if (event.target.files[0].type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        this.message.files.fileOne = "Disarankan file .doc/.docx";
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
      if (event.target.files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        this.message.files.fileThree = "Disarankan file .xlsx";
      }
      this.form.files.fileThree = event.target.files[0];
    },
    fileFour(event) {
      this.form.files.fileFour = event.target.files[0];
    },
    fileFive(event) {
      this.form.files.fileFive = event.target.files[0];
    },
    fileSix(event) {
      this.form.files.fileSix = event.target.files[0];
    },

    async update(event) {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      }
      document.querySelectorAll(".btn").forEach((el) => {
        el.disabled = true;
      });

      progress.start();
      this.message.isSuccess = "Loading..";
      progress.set(0.4);

      setTimeout(async () => {
        const csrfToken = Cookies.get("saveMe");
        axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        const id = event.target.getAttribute("id");

        const formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("oldFolder", this.form.oldFolder);
        formData.append("fileOne", this.form.files.fileOne);
        formData.append("fileTwo", this.form.files.fileTwo);
        formData.append("fileThree", this.form.files.fileThree);
        formData.append("fileFour", this.form.files.fileFour);
        formData.append("fileFive", this.form.files.fileFive);
        formData.append("fileSix", this.form.files.fileSix);

        formData.append("oldOne", this.document.projectFile.fileOne.path);
        formData.append("oldTwo", this.document.projectFile.fileTwo.path);
        formData.append("oldThree", this.document.projectFile.fileThree.path);
        formData.append("oldFour", this.document.projectFile.fileFour.path);
        formData.append("oldFive", this.document.projectFile.fileFive.path);
        formData.append("oldSix", this.document.projectFile.fileSix.path);

        formData.append("descOne", this.document.projectFile.fileOne.desc);
        formData.append("descTwo", this.document.projectFile.fileTwo.desc);
        formData.append("descThree", this.document.projectFile.fileThree.desc);
        formData.append("descFour", this.document.projectFile.fileFour.desc);
        formData.append("descFive", this.document.projectFile.fileFive.desc);
        formData.append("descSix", this.document.projectFile.fileSix.desc);

        formData.append("position", this.form.position);
        formData.append("description", this.form.description);
        formData.append("updated_at", this.form.updated_at);
        progress.set(0.6);

        await axios
          .patch("/api/document/" + this.form.position + "_" + id, formData)
          .then((response) => {
            progress.set(0.8);
            this.message.isSuccess = "201 Created ✔";
            setTimeout(() => {
              window.location.reload();
              progress.done();
            }, 1000);
            return response;
          })
          .catch((error) => {
            this.message.isFail = "Failure " + error.message;
            this.message.isSuccess = "";
            progress.done();
          });
      }, 3000);
    },
    clearMessage() {
      this.message.title = "";
      this.message.file = "";
      this.message.category = "";
      this.message.description = "";
      this.message.isSuccess = "";
      this.message.isFail = "";
    },
  },
};
</script>

<style>
.white {
  color: white;
}
</style>
