<template>
  <v-row>
    <v-col cols="4">
      <SideMenu> </SideMenu>
    </v-col>
    
    <v-col cols="8">
      <v-app>
        <v-main>
          <router-view/>
        </v-main>
      </v-app>
    </v-col>
  </v-row>
</template>

<script>
import SideMenu from './components/SideMenu'
export default {
  name: 'App',
  components : {
    SideMenu
  },
  data: () => ({
    //
  }),
}
</script>
<style scoped>

</style>

