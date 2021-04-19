<template>
  <v-card class="px-6 py-4 mt-16">
    <v-card-text class="d-flex justify-center">
      <h2 class="font-weight-black">Заявление</h2>
    </v-card-text>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Название"
        required
      ></v-text-field>

      <v-textarea
        v-model="about"
        :rules="aboutRules"
        label="Описание"
        required
      ></v-textarea>
      <v-spacer />

      <v-file-input
        label="Добавить файлы"
        filled
        prepend-icon="mdi-camera"
        class="mt-4"
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
  </v-card>
</template>

<script>
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
        // Send....
      }
    },
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