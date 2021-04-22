<template>
  <div width="100%">
    <v-card class="mt-3 mb-5 d-flex justify-center mx-5">
      <v-card-title>
        <h4>Опубликованные запросы и ответы</h4>
      </v-card-title>
    </v-card>
    <v-container v-for="application in applications" :key="application.id">
      <Application v-bind:application="application" />
    </v-container>
  </div>
</template>

<script>
import { http } from "@/api";
import Application from "@/components/Application.vue";

export default {
  components: {
    Application,
  },
  data: () => ({
    applications: null,
  }),
  methods: {
    getApplications: function () {
      http
        .get("api/public/applications/published")
        .then((response) => {
          this.applications = response.data.items;
        })
        .catch((err) => {});
    },
  },
  mounted: function () {
    this.getApplications();
  },
};
</script>