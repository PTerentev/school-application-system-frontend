<template>
  <v-card class="mx-auto px-6 py-4 mt-16" max-width="600px">
    <v-card-text class="d-flex justify-center">
      <h2 class="font-weight-black">Регистрация</h2>
    </v-card-text>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        :rules="rules"
        v-model="lastName"
        label="Фамилия"
        required
      />
      <v-text-field :rules="rules" v-model="firstName" label="Имя" required />
      <v-text-field
        :rules="rules"
        v-model="middleName"
        label="Отчество"
        required
      />
      <v-text-field
        v-model="email"
        :rules="rules"
        label="Почта"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPassord ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassord ? 'text' : 'password'"
        :rules="rules"
        label="Пароль"
        @click:append="showPassord = !showPassord"
        required
      ></v-text-field>
      <v-text-field
        v-model="repeatPassword"
        type="password"
        label="Повторите пароль"
        required
        :rules="[passwordConfirmationRule]"
      ></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4 d-flex justify-center" @click="signUp">
        Зарегистрировать аккаунт
      </v-btn>
      <p v-if="isSignUpFailed" class="mt-10 red--text">
        {{errorMessage}}
      </p>
    </v-form>
  </v-card>
</template>

<script>
import { http } from "@/api";

export default {
  data: () => ({
    isSignUpFailed: false,
    showPassord: false,
    valid: false,
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    repeatPassword: "",
    errorMessage: "",
    emailRules: [(v) => !!v || "Введите почту"],
  }),

  methods: {
    signUp() {
      this.isSignUpFailed = false;
      this.$refs.form.validate();
      if (this.valid) {
        http
          .post("api/user/register", {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
          })
          .then((response) => {
            this.$router.push({ name: "registerSuccess" }).catch(() => {});
          })
          .catch((err) => {
            console.log(err.response.data.Extensions.errors[0].Messages[0]);
            this.errorMessage = err.response.data.Extensions.errors[0].Messages[0];
            this.isSignUpFailed = true;
          });
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.repeatPassword || "Пароли не совпадают";
    },
    rules() {
      const rules = [];

      let rule = (v) =>
        (!v || "").length === 0 || `Поле обязательно для заполнения`;

      rules.push(rule);

      return rules;
    },
  },
};
</script>