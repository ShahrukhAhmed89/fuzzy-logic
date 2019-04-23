<template>
  <div class="about">
    <p v-for="(product, index) in products" :key="index">{{product.name}}</p>
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
  name: 'About',
  mounted () {
    this.$store.dispatch('getData')
  },
  computed: mapState([
    'products'
  ])
}
</script>