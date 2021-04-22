<template>
  <v-card class="px-6 py-4 mt-16">
    <v-card-text class="d-flex justify-center">
      <h2 class="success-text">Заявление успешно подано, ожидайте ответ!</h2>
    </v-card-text>
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
  }),

  methods: {
    sendApplication() {
      this.$refs.form.validate();
      if (this.valid) {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("description", this.about);

        http
          .post("/api/applicant/applications", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // Todo: show success message
            this.$router.go();
          })
          .catch((err) => {});
      }
    },
  },
};
</script>