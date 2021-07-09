<template>
  <main>
    <header></header>
    <article>
      <!-- Modal -->
      <div class="modal fade" :id="`${document.title.replace(/\s/g, '')}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" :id="`${document.title.replace(/\s/g, '')}`">{{ document.title }}</h5>
              <button @click="clearMessage" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Modal Body -->
            <div class="modal-body">
              <div class="container d-flex" style="justify-content: center">
                <div class="col" style="margin-top: 5px">
                  <div class="container">
                    <strong>Judul</strong>
                    <p>{{ document.title }}</p>
                    <hr />
                    <strong>Tahun</strong>
                    <p>{{ document.year }}</p>
                    <hr />
                    <strong>Divisi</strong>
                    <p>{{ document.division }}</p>
                    <hr />
                    <strong>{{ data.fileOne.desc }}</strong>
                    <p id="file">
                      {{ data.fileOne.name }}
                      <span style="color: #80bc01" v-if="message.files.green.fileOne">({{ message.files.green.fileOne }})</span>
                      <span style="color: red" v-if="message.files.red.fileOne"> ({{ message.files.red.fileOne }})</span>
                    </p>
                    <p id="optionFile" class="fileOne" v-if="FC.fileOne && data.fileOne?.name !== 'Tidak ada'">
                      <span id="green" @click="dwndFile" :path="data.fileOne.path" loc="fileOne" :nameFile="data.fileOne.name">Download </span>
                      <span id="red" v-if="document.position === 'lakdan'" @click="delFile" :itemid="document._id" :nameFile="data.fileOne.name" loc="fileOne">| Delete</span>
                    </p>
                    <br />
                    <strong>{{ data.fileTwo.desc }}</strong>
                    <p id="file">
                      {{ data.fileTwo.name }}
                      <span style="color: #80bc01" v-if="message.files.green.fileTwo">({{ message.files.green.fileTwo }})</span>
                      <span style="color: red" v-if="message.files.red.fileTwo"> ({{ message.files.red.fileTwo }})</span>
                    </p>
                    <p id="optionFile" class="fileTwo" v-if="FC.fileTwo && data.fileTwo?.name !== 'Tidak ada'">
                      <span id="green" @click="dwndFile" :path="data.fileTwo.path" loc="fileTwo" :nameFile="data.fileTwo.name">Download </span>
                      <span id="red" v-if="document.position === 'lakdan'" @click="delFile" :itemid="document._id" :nameFile="data.fileTwo.name" loc="fileTwo">| Delete</span>
                    </p>
                    <br />
                    <strong>{{ data.fileThree.desc }}</strong>
                    <p id="file">
                      {{ data.fileThree.name }}
                      <span style="color: #80bc01" v-if="message.files.green.fileThree">({{ message.files.green.fileThree }})</span>
                      <span style="color: red" v-if="message.files.red.fileThree"> ({{ message.files.red.fileThree }})</span>
                    </p>
                    <p id="optionFile" class="fileThree" v-if="FC.fileThree && data.fileThree?.name !== 'Tidak ada'">
                      <span id="green" @click="dwndFile" :path="data.fileThree.path" loc="fileThree" :nameFile="data.fileThree.name">Download </span>
                      <span id="red" v-if="document.position === 'lakdan'" @click="delFile" :itemid="document._id" :nameFile="data.fileThree.name" loc="fileThree">| Delete</span>
                    </p>
                    <br />
                    <strong>{{ data.fileFour.desc }}</strong>
                    <p id="file">
                      {{ data.fileFour.name }}
                      <span style="color: #80bc01" v-if="message.files.green.fileFour">({{ message.files.green.fileFour }})</span>
                      <span style="color: red" v-if="message.files.red.fileFour"> ({{ message.files.red.fileFour }})</span>
                    </p>
                    <p id="optionFile" class="fileFour" v-if="FC.fileFour && data.fileFour?.name !== 'Tidak ada'">
                      <span id="green" @click="dwndFile" :path="data.fileFour.path" loc="fileFour" :nameFile="data.fileFour.name">Download </span>
                      <span id="red" v-if="document.position === 'lakdan'" @click="delFile" :itemid="document._id" :nameFile="data.fileFour.name" loc="fileFour">| Delete</span>
                    </p>
                    <br />
                    <strong>{{ data.fileFive.desc }}</strong>
                    <p id="file">
                      {{ data.fileFive.name }}
                      <span style="color: #80bc01" v-if="message.files.green.fileFive">({{ message.files.green.fileFive }})</span>
                      <span style="color: red" v-if="message.files.red.fileFive"> ({{ message.files.red.fileFive }})</span>
                    </p>
                    <p id="optionFile" class="fileFive" v-if="FC.fileFive && data.fileFive?.name !== 'Tidak ada'">
                      <span id="green" @click="dwndFile" :path="data.fileFive.path" loc="fileFive" :nameFile="data.fileFive.name">Download </span>
                      <span id="red" v-if="document.position === 'lakdan'" @click="delFile" :itemid="document._id" :nameFile="data.fileFive.name" loc="fileFive">| Delete</span>
                    </p>
                    <br v-if="data.fileSix?.desc" />
                    <strong>{{ data.fileSix?.desc }}</strong>
                    <p id="file">
                      {{ data.fileSix?.name }}
                      <span style="color: #80bc01" v-if="message.files.green.fileSix">({{ message.files.green.fileSix }})</span>
                      <span style="color: red" v-if="message.files.red.fileSix"> ({{ message.files.red.fileSix }})</span>
                    </p>
                    <p id="optionFile" class="fileSix" v-if="FC.fileSix && data.fileSix?.name !== 'Tidak ada'">
                      <span id="green" v-if="document.position !== 'divisi'" @click="dwndFile" :path="data.fileSix?.path" loc="fileSix" :nameFile="data.fileSix?.name">Download </span>
                      <span id="red" v-if="document.position === 'lakdan'" @click="delFile" :itemid="document._id" :nameFile="data.fileSix?.name" loc="fileSix">| Delete</span>
                    </p>
                    <hr />
                    <strong>Posisi</strong>
                    <p>{{ document.position }}</p>
                    <hr />
                    <strong>Deskripsi</strong>
                    <p>{{ document.description }}</p>
                    <hr />
                    <strong>Dibuat</strong>
                    <p>-{{ document.created_at }}</p>
                    <hr />
                    <strong>Diubah</strong>
                    <p>-{{ document.updated_at }}</p>
                    <hr />
                    <p style="color: #80bc01">{{ message.isSuccess }}</p>
                    <p style="color: red">{{ message.isFail }}</p>
                    <button v-if="user" style="margin-right: 5px" class="btn btn-outline-success" @click="download" :value="document._id" :title="document.title">Download zip</button>
                    <button v-if="ask" style="margin-right: 5px" class="btn btn-outline-success" @click="download" :value="document._id" :title="document.title">Download zip</button>
                    <button v-if="document.position === 'lakdan' && ask" @click="danger" class="btn btn-outline-danger">Delete</button>
                    <button v-if="confirm" @click="destroy" :value="document._id" :title="document.title" style="margin-right: 5px" class="btn btn-outline-danger">Destroy</button>
                    <button v-if="confirm" @click="cancel" class="btn btn-outline-secondary">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Modal Body -->

            <!-- Footer -->
            <div class="modal-footer">
              <button @click="clearMessage" type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
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
import moment from "moment";
export default {
  props: ["document", "disable"],
  data() {
    return {
      user: false,
      ask: true,
      confirm: false,
      data: this.document.projectFile,
      needF5: false,
      FC: {
        fileOne: true,
        fileTwo: true,
        fileThree: true,
        fileFour: true,
        fileFive: true,
        fileSix: true,
      },
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
      },
      api: {
        url: "/api/document/",
        delFile: "/api/delFile/",
        download: "/api/document/compress/",
        dwndFile: "/api/dwnd-document/",
      },
    };
  },
  async created() {
    if (this.disable) {
      this.ask = false;
      this.user = true;
    }
    if (this.form.files.fileSix === "Tidak ada") {
      this.forceDisplayFSix = false;
    }
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
          params: fileName,
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
            return response;
          })
          .catch((error) => {
            this.message.isFail = "Failure " + error.message;
            this.message.isSuccess = "";
            progress.done();
            return error;
          });
      }, 2000);
    },
    dwndFile(event) {
      progress.start();
      const file = event.target.getAttribute("loc");
      this.message.isSuccess = "Menyiapkan file..";
      this.message.files.green[file] = "Menyiapkan file..";
      setTimeout(async () => {
        const path = event.target.getAttribute("path");
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
            return response;
          })
          .catch((error) => {
            this.message.isFail = "Failure " + error.message;
            this.message.isSuccess = "";
            progress.done();
            return error;
          });
      }, 2000);
    },
    async delFile(event) {
      const nameFile = event.target.getAttribute("nameFile");
      let result = confirm("Hapus file? " + nameFile);
      if (!result) {
        return;
      }

      const file = event.target.getAttribute("loc");

      let F = new File([""], "Tidak ada", { type: "text/plain", lastModified: moment().format("lll") });
      this.form.files[file] = F;

      this.message.files.red[file] = "Menghapus file..";

      setTimeout(async () => {
        const csrfToken = Cookies.get("saveMe");
        axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        const id = event.target.getAttribute("itemid");

        const formData = new FormData();
        formData.append("title", this.document.title);
        formData.append("fileOne", this.form.files.fileOne);
        formData.append("fileTwo", this.form.files.fileTwo);
        formData.append("fileThree", this.form.files.fileThree);
        formData.append("fileFour", this.form.files.fileFour);
        formData.append("fileFive", this.form.files.fileFive);
        formData.append("fileSix", this.form.files.fileSix);
        formData.append("delFile", this.document.projectFile[file].path);

        formData.append("oldOne", this.document.projectFile.fileOne.path);
        formData.append("oldTwo", this.document.projectFile.fileTwo.path);
        formData.append("oldThree", this.document.projectFile.fileThree.path);
        formData.append("oldFour", this.document.projectFile.fileFour.path);
        formData.append("oldFive", this.document.projectFile.fileFive.path);
        formData.append("oldSix", this.document.projectFile.fileSix?.path);

        formData.append("descOne", this.document.projectFile.fileOne.desc);
        formData.append("descTwo", this.document.projectFile.fileTwo.desc);
        formData.append("descThree", this.document.projectFile.fileThree.desc);
        formData.append("descFour", this.document.projectFile.fileFour.desc);
        formData.append("descFive", this.document.projectFile.fileFive.desc);
        formData.append("descSix", this.document.projectFile.fileSix?.desc);

        await axios
          .post(this.api.delFile + this.document.position + "_" + id, formData)
          .then((response) => {
            this.message.files.red[file] = "File dihapus";
            document.querySelector("." + file).style.display = "none";
            this.needF5 = true;
            this.FC[file] = false;
            return response;
          })
          .catch((error) => {
            return error;
          });
      }, 3000);
    },
    danger() {
      this.message.isFail = "Tindakan ini tidak dapat dibatalkan, hapus proyek? 'Destroy' untuk melanjutkan.";
      this.confirm = true;
      this.ask = false;
    },
    async destroy(event) {
      this.confirm = false;
      this.ask = false;

      const id = event.target.getAttribute("value");
      const title = event.target.getAttribute("title");
      await axios
        .delete(this.api.url + id, {
          params: this.$store.state.whoAreYou + "_" + title,
        })
        .then((response) => {
          this.message.isFail = "Berhasil dihapus ✔";
          let countdown = ["..", "....", "......"];
          let i = 0;
          setInterval(() => {
            if (i >= countdown) {
              clearInterval();
            }
            this.message.isFail = countdown[i];
            i++;
          }, 1000);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          return response;
        })
        .catch((error) => {
          this.message.isFail = "Failure " + error.message;
        });
    },
    cancel() {
      this.confirm = false;
      this.ask = true;
      this.message.isFail = "";
    },
    clearMessage() {
      this.message.isSuccess = "";
      this.message.isFail = "";
      if (this.needF5) {
        window.location.reload();
        window.onpopstate = () => {
          window.location.reload();
        };
      }
      if (this.disable) {
        this.ask = false;
      } else {
        this.ask = true;
      }
      this.confirm = false;
    },
  },
};
</script>

<style>
#file {
  margin-bottom: 2px;
}

#optionFile {
  font-size: 0.8em;
}

#green {
  color: #80bc01;
}

#red {
  color: red;
}
</style>
