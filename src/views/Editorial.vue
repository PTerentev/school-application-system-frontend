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
        <v-card v-for="application in applications" :key="application.id">
          <Application
            class="ml-4 my-10 ml-2"
            v-bind:application="application"
          />
          <v-card-actions>
            <v-container>
              <v-row no-gutters>
                <v-col class="d-flex justify-end pr-3">
                  <v-btn
                    depressed
                    color="success"
                    :class="$style.desisionButton"
                    >Опубликовать</v-btn
                  >
                </v-col>
                <v-col class="d-flex justify-start pl-3">
                  <EditorialCommentDialog />
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { http } from "@/api";
import EditorialSendToAuthority from "@/components/EditorialSendToAuthority.vue";
import Application from "@/components/Application.vue";
import EditorialCommentDialog from "@/components/EditorialCommentDialog.vue";
import { APPLICATION_STATUS } from '@/constants';

export default {
  components: {
    Application,
    EditorialCommentDialog,
    EditorialSendToAuthority,
  },
  data: () => ({
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
  computed: {
    applications: function () {
      return Array.from({ length: 5 }, () => this.testApplication);
    },
  },
  methods: {
    getApplications: function () {
      http
        .get("/api/editorial/applications/all")
        .then((response) => {
          if (response.data)
          {
            this.newApplications = response.data.filter(a => a.Status === APPLICATION_STATUS.SENT);
            this.reviewApplications = response.data.filter(a => a.Status === APPLICATION_STATUS.REVIEW);
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
