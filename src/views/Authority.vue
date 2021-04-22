<template>
  <div width="100%">
    <v-card class="mt-3 mb-5 d-flex justify-center mx-5">
      <v-card-title>
        <h4>Новые запросы</h4>
      </v-card-title>
    </v-card>
    <v-container v-for="application in applications" :key="application.id">
      <v-card>
        <Application v-bind:application="application" />
        <v-card-actions class="d-flex justify-center align-center pa-5">
          <AuthorityResponseDialog
            :applicationId="application.id"
            :authorityId="application.authorityId"
          />
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { http } from "@/api";
import Application from "@/components/Application.vue";
import AuthorityResponseDialog from "@/components/AuthorityResponseDialog.vue";

export default {
  components: {
    Application,
    AuthorityResponseDialog,
  },
  data: () => ({
    isEmpty: false,
    dialog: false,
    applications: [],
  }),
  methods: {
    getApplications: function () {
      http
        .get("api/authority/my/applications")
        .then((response) => {
          this.applications = response.data;
          if (!response.data.length) {
            this.isEmpty = true;
          }
        })
        .catch((err) => {});
    },
  },
  mounted: function () {
    this.getApplications();
  },
};
</script>