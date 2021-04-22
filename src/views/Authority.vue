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
                <AuthorityResponseDialog/>
            </v-card-actions>
        </v-card>
    </v-container>
  </div>
</template>

<script>
import Application from "@/components/Application.vue";
import AuthorityResponseDialog from "@/components/AuthorityResponseDialog.vue";

export default {
  components: {
    Application,
    AuthorityResponseDialog
  },
  data: () => ({
        dialog: false,
        testApplication: {
            id: 1,
            name: "test",
            description: "test",
            status: 3,
    },
  }),
  computed: {
    applications: function () {
      return Array.from({ length: 5 }, () => this.testApplication);
    },
  },
};
</script>