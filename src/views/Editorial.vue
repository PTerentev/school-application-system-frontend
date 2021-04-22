<template>
  <v-card class="mt-3 mb-5 mx-5">
    <v-tabs v-model="tabs" background-color="red lighten-2" dark centered>
      <v-tabs-slider />
      <v-tab>Новые заявки</v-tab>
      <v-tab>Заявки на проверку</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <div v-for="newApplication in newApplications" :key="newApplication.id">
          <EditorialSendToAuthority
            :application="newApplication"
            :authorities="authorities"
          />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div
          v-for="reviewApplication in reviewApplications"
          :key="reviewApplication.id"
        >
          <EditorialReviewApplication :application="reviewApplication" />
        </div>
      </v-tab-item>
    </v-tabs-items>
    <v-card-text v-if="isEmpty">Пусто!</v-card-text>
  </v-card>
</template>

<script>
import { http } from "@/api";
import EditorialSendToAuthority from "@/components/EditorialSendToAuthority.vue";
import EditorialReviewApplication from "@/components/EditorialReviewApplication.vue";
import { APPLICATION_STATUS } from "@/constants";

export default {
  components: {
    EditorialSendToAuthority,
    EditorialReviewApplication,
  },
  data: () => ({
    isEmpty: false,
    tabs: null,
    newApplications: [],
    reviewApplications: [],
    testApplication: {
      id: 1,
      name: "test",
      description: "test",
      status: 3,
    },
    authorities: [],
  }),
  methods: {
    getApplications: function () {
      http
        .get("/api/editorial/applications/all")
        .then((response) => {
          if (response.data.length) {
            this.newApplications = response.data.filter(
              (a) => a.status == APPLICATION_STATUS.CHECK
            );
            console.log(this.newApplications);
            this.reviewApplications = response.data.filter(
              (a) => a.status == APPLICATION_STATUS.REVIEW
            );
          } else {
            this.isEmpty = true;
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
  },
  mounted: function () {
    this.getApplications();
    this.getAuthorities();
  },
};
</script>

<style lang="scss" module>
.desisionButton {
  width: 200px;
}
</style>
