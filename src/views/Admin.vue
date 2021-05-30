<template>
  <div class="px-6 py-4 mt-16">
    <v-card class="px-6 py-4 mt-4">
      <v-card-text class="d-flex justify-center">
        <h2 class="font-weight-black">Добавить исполнительный орган</h2>
      </v-card-text>
      <v-form ref="addAuthorityForm" v-model="addAuthorityFormValid" lazy-validation>
        <v-text-field
          v-model="addAuthorityName"
          :rules="nameRules"
          label="Название*"
          required
        />
        <v-textarea
          v-model="addAuthorityAbout"
          :rules="aboutRules"
          label="Описание*"
          required
        />
        <v-spacer />
        <v-btn
          :disabled="!addAuthorityFormValid"
          color="success"
          class="mr-4"
          @click="addAuthority"
        >
          Добавить
        </v-btn>
      </v-form>
    </v-card>
    <v-card class="px-6 py-4 mt-4">
      <v-card-text class="d-flex justify-center">
        <h2 class="font-weight-black">Добавить тематику для заявлений</h2>
      </v-card-text>
      <v-form ref="addApplicationTypeForm" v-model="addApplicationTypeFormValid" lazy-validation>
        <v-text-field
          v-model="addApplicationTypeName"
          :rules="nameRules"
          label="Название*"
          required
        />
        <v-select
          v-model="addApplicationTypeAuthorityId"
          :items="authorities"
          item-value="id"
          item-text="name"
          label="Исполнительные органы"
          dense
        ></v-select>
        <v-spacer />
        <v-btn
          :disabled="!addApplicationTypeFormValid"
          color="success"
          class="mr-4"
          @click="addApplicationType"
        >
          Добавить
        </v-btn>
      </v-form>
    </v-card>
    <v-card class="px-6 py-4 mt-4">
      <v-card-text class="d-flex justify-center">
        <h2 class="font-weight-black">Добавить роль юзеру</h2>
      </v-card-text>
      <v-form ref="addUserToRoleForm" v-model="addUserToRoleFormValid" lazy-validation>
        <v-select
          v-model="addUserToRoleFormSelectedUserId"
          :items="users"
          item-value="id"
          item-text="fullName"
          label="Пользователь"
          dense
          required
        ></v-select>
        <v-select
          v-model="addUserToRoleFormSelectedRoleId"
          :items="roles"
          item-value="id"
          item-text="name"
          label="Роль"
          dense
          required
        ></v-select>
        <v-spacer />
        <v-btn
          :disabled="!addUserToRoleFormValid"
          color="success"
          class="mr-4"
          @click="addUserToRole"
        >
          Добавить
        </v-btn>
      </v-form>
    </v-card>
        <v-card class="px-6 py-4 mt-4">
      <v-card-text class="d-flex justify-center">
        <h2 class="font-weight-black">Добавить пользователя в исполнительный орган</h2>
      </v-card-text>
      <v-form ref="addUserToAuthorityForm" v-model="addUserToAuthorityFormValid" lazy-validation>
        <v-select
          v-model="addUserToAuthorityFormSelectedUserId"
          :items="users"
          item-value="id"
          item-text="fullName"
          label="Пользователь"
          dense
          required
        ></v-select>
        <v-select
          v-model="addUserToAuthorityFormSelectedAuthorityId"
          :items="authorities"
          item-value="id"
          item-text="name"
          label="Исполнительный орган"
          dense
          required
        ></v-select>
        <v-spacer />
        <v-btn
          :disabled="!addUserToAuthorityFormValid"
          color="success"
          class="mr-4"
          @click="addUserToAuthority"
        >
          Добавить
        </v-btn>
      </v-form>
    </v-card>
  </div>
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
    showErrorMessage: false,
    selectedAuthorityId: null,
    authorities: [],
    users: [],
    roles: [],
    addAuthorityName: "",
    addAuthorityAbout: "",

    // Add Authority form.
    addAuthorityName: "",
    addAuthorityAbout: "",
    addAuthorityFormValid: false,

    // Add Application Type form.
    addApplicationTypeAuthorityId: null,
    addApplicationTypeName: "",
    addApplicationTypeFormValid: false,

    // Add User To Authority form.
    addUserToAuthorityFormSelectedUserId: null,
    addUserToAuthorityFormSelectedAuthorityId: null,
    addUserToAuthorityFormValid: false,

    // AddUserToRoleForm
    addUserToRoleFormSelectedUserId: null,
    addUserToRoleFormSelectedRoleId: null,
    addUserToRoleFormValid: false,
  }),

  methods: {
    addUserToRole() {
      this.$refs.addUserToRoleForm.validate();

      if (this.addUserToRoleFormValid) {
        const data = {
          roleId: this.addUserToRoleFormSelectedRoleId
        }
        http
          .post(`/api/admin/users/${this.addUserToRoleFormSelectedUserId}/role`, data)
          .then((response) => {
            console.log(response);
            this.$router.go();
          })
          .catch((err) => {
            console.log(err.data);
          });
      }
    },
    addUserToAuthority() {
      this.$refs.addUserToAuthorityForm.validate();

      if (this.addAuthorityFormValid) {
        const data = {
          userId: this.addUserToAuthorityFormSelectedUserId
        }
        http
          .post(`/api/admin/authorities/${this.addUserToAuthorityFormSelectedAuthorityId}/user`, data)
          .then((response) => {
            console.log(response);
            this.$router.go();
          })
          .catch((err) => {
            console.log(err.data);
          });
      }
    },
    addApplicationType() {
      this.$refs.addApplicationTypeForm.validate();

      if (this.addAuthorityFormValid) {
        const data = {
          name: this.addApplicationTypeName
        }
        http
          .post(`/api/admin/authorities/${this.addApplicationTypeAuthorityId}/type`, data)
          .then((response) => {
            console.log(response);
            this.$router.go();
          })
          .catch((err) => {
            console.log(err.data);
          });
      }
    },
    addAuthority() {
      this.$refs.addAuthorityForm.validate();
      if (this.addAuthorityFormValid) {
        const data = {
          name: this.addAuthorityName,
          description: this.addAuthorityAbout
        }
        http
          .post("/api/admin/authorities", data)
          .then((response) => {
            console.log(response);
            this.$router.go();
          })
          .catch((err) => {
            console.log(err.data);
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
    getAuthorities: function () {
      http
        .get("api/editorial/authorities")
        .then((response) => {
          if (response.data) {
            this.authorities = response.data;
          }
        })
        .catch((err) => {});
    },
    getUsers: function () {
      http
        .get("api/admin/users/all")
        .then((response) => {
          if (response.data) {
            this.users = response.data;
          }
        })
        .catch((err) => {});
    },
    getRoles: function () {
      http
        .get("api/admin/users/roles")
        .then((response) => {
          if (response.data) {
            this.roles = response.data;
          }
        })
        .catch((err) => {});
    },
  },
  mounted: function () {
    this.getApplicationTypes();
    this.getAuthorities();
    this.getUsers();
    this.getRoles();
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