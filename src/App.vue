<template>
  <v-app>
    <v-app-bar color="green" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="white--text">
          Система жалоб и предложений
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            :to="item.link"
            link
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main :class="$style.bgContainer">
      <v-container class="pa-0">
        <v-row no-gutters>
          <v-col lg="2" md="2" />

          <v-col lg="8" md="8" cols="11">
            <router-view />
          </v-col>

          <v-col lg="2" md="2" />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    menuItems: [
      {
        name: "Подать заявление",
        link: "/",
      },
      {
        name: "Аккаунт",
        link: "/login",
      },
      {
        name: "Админ",
        link: "/admin",
      },
      {
        name: "Редакция",
        link: "/editorial",
      },
      {
        name: "Исполнительные орган",
        link: "/authority",
      },
      {
        name: "Опубликованные заявки",
        link: "/published",
      },
    ],
  }),
};
</script>

<style lang="scss" module>
@import "styles/base";
.bgContainer {
  width: 100%;
  height: 100%;
  background-image: url("./assets/img/school-background.jpg");
  background-repeat: repeat;
  background-size: contain;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
