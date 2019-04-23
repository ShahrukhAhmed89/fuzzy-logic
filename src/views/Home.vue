<template>
	<div class="catalogue-wrapper">
		<div class="catalogue-type">
			<h2>TYPE</h2>
			<NavLinks></NavLinks>
		</div>
		<div class="catalogue-display" v-if="products">
			<h1>Home</h1>
			<div class="catalogue-total">{{products.length}} Products</div>
			<div class='catalogue'>
				<div class="product" v-for="(product, index) in products" :key="index">
          <router-link :to="{ name: 'productPage', params: { id: product.id }}">
						<img :src="product.imgURLs[0]" loading="lazy">
						<div class="product-price">{{product.mrp}}</div>
						<h3 class="product-name">{{product.name}}</h3>
						<!-- <h3 class="product-name">{{product.knit}}</h3> -->
					</router-link>
				</div>
  		</div>
		</div>
	</div>
</template>

<script>
import NavLinks from '../components/NavLinks'
import { mapState } from 'vuex'

export default {
	name: 'home',
	components: {
    NavLinks,
  },
  mounted () {
		this.$store.dispatch('getData')
	},
  computed: mapState([
		'products'
	])
};

</script>
