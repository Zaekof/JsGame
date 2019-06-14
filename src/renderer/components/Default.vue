<template>
    <v-layout align-space-between justify-space-around fill-height>
      <div>test1</div>
      <div>test 2</div>
      <div>test3</div>
    </v-layout>
</template>

<script>
export default {
  name: 'Default-page'
}
</script>

<style>
  /* https://vuetifyjs.com/en */
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
</style>
