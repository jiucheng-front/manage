<template>
    <div id="app">
        <iheader v-if="!isLogin"></iheader>
        <iaside v-if="!isLogin"></iaside>
        <router-view></router-view>
        <footers v-if="!isLogin"></footers>
    </div>
</template>

<script>

    import iheader from '@/components/iheader'
    import iaside  from '@/components/iaside'
    import footers from '@/components/footers'

    export default {
        name: 'app',
        data () {
          return {
              name: ''
          }
        },
        components: {
            iheader,
            iaside,
            footers
        },
        computed: {
            isLogin () {
                return this.name === 'login'
            }
        },
        watch: {
            '$route' (to, from) {
                this.name   = to.name
            }
        },
        created () {
            this.name = this.$router.currentRoute.name
        }
    }
</script>

<style>
</style>
