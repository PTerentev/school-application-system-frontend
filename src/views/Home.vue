<template>
  <v-card class="px-6 py-4 mt-16">
    <v-card-text class="d-flex justify-center">
      <h2 class="font-weight-black">Заявление</h2>
    </v-card-text>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Название*"
        required
      ></v-text-field>

      <v-textarea
        v-model="about"
        :rules="aboutRules"
        label="Описание*"
        required
      ></v-textarea>

      <v-spacer />

      <v-select
        v-model="selectedApplicationTypeId"
        :items="applicationTypes"
        item-value="id"
        item-text="name"
        label="Тематика заявления"
        dense
        clearable
      ></v-select>

      <v-spacer />

      <v-file-input
        label="Добавить файлы"
        filled
        accept="image/*, video/*"
        prepend-icon="mdi-camera"
        class="mt-6"
        multiple
        @change="selectFile"
      ></v-file-input>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="sendApplication"
      >
        Отправить заявление
      </v-btn>
    </v-form>
      <p v-if="showErrorMessage" class="mt-10 red--text">
        Пожалуйста, введите правильные данные
      </p>
  </v-card>
</template>

<script>
import { http } from "@/api";

export default {
  data: () => ({
    valid: false,
    name: "",
    about: "",
    nameRules: [(v) => !!v || "Название необходимо"],
    aboutRules: [(v) => !!v || "Описание необходимо"],
    applicationTypes: [],
    selectedApplicationTypeId: null,
    files: null,
    showErrorMessage: false
  }),

  methods: {
    sendApplication() {
      this.$refs.form.validate();
      if (this.valid) {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("description", this.about);

        if (this.selectedApplicationTypeId != null)
        {
          formData.append("applicationTypeId", this.selectedApplicationTypeId);
        }

        if (this.files != null)
        {
          for (let file of this.files) {
            formData.append("formFiles", file);
          }
        }

        http
          .post("/api/applicant/applications", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.$router.push({ name: "success" }).catch(() => {});
          })
          .catch((err) =>
          {
            console.log(err.data);
            this.showErrorMessage = true;
          });
      }
    },
    getApplicationTypes() {
      http
        .get("/api/applicant/applications/types")
        .then((response) => {
          if (response.data) {
            this.applicationTypes = response.data;
          }
        })
        .catch((err) => {});
    },
    selectFile(files) {
      this.files = files;
      console.log(this.files);
    },
  },
  mounted: function () {
    this.getApplicationTypes();
  },
};
</script>

<style lang="scss" module>
@import "../styles/base";
.bgContainer {
  width: 100%;
  height: 100%;
}
</style>