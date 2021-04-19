<template>
  <v-card class="mx-auto px-6 py-4 mt-16" max-width="600px">
    <v-card-text class="d-flex justify-center">
      <h2 class="font-weight-black">Вход</h2>
    </v-card-text>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Почта"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPassord ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassord ? 'text' : 'password'"
        label="Пароль"
        @click:append="showPassord = !showPassord"
      ></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
        Войти
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    showPassord: false,
    valid: false,
    name: "",
    password: "",
    nameRules: [(v) => !!v || "Введите почту"],
  }),

  methods: {
    login() {
      this.$refs.form.validate();
      if (this.valid) {
        // Send....
      }
    },
  },
};
</script>