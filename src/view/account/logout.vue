<template>

</template>

<script>
    export default {
        data() {
            return {

            };
        },
        methods:{
          logout(){
              this.$api.get('/api/login/logout').then(res => {
              });
              this.$store.commit('setUserId', -1);
              this.$router.push('/login');
          }
        },
        mounted() {
          this.logout();
        },
    }
</script>

<style>

</style>
