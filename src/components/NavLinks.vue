<template>
    <div>
        <ul>
            <li><router-link :to="{ name: 'categories', params: { slug: 'knit-boxy' }}"> Knit Boxy</router-link></li>
            <li><router-link :to="{ name: 'categories', params: { slug: 'knit-form-fitting' }}">Knit Form Fitting</router-link></li>
            <li><router-link :to="{ name: 'categories', params: { slug: 'knit-regular' }}">Knit Regular</router-link></li>
            <li><router-link :to="{ name: 'categories', params: { slug: 'knit-relaxed' }}">Knit Relaxed</router-link></li>
            <li><router-link :to="{ name: 'categories', params: { slug: 'shirt-boxy' }}">Shirt Boxy</router-link></li>
            <li><router-link :to="{ name: 'categories', params: { slug: 'shirt-regular' }}">Shirt Regular</router-link></li>
            <li><router-link :to="{ name: 'categories', params: { slug: 'woven-regular' }}">Woven Regular</router-link></li>
            <li><router-link :to="{ name: 'categories', params: { slug: 'woven-relaxed' }}">Woven Relaxed</router-link></li>
            <li><router-link :to="{ name: 'categories', params: { slug: 'woven-slim' }}">Woven Slim</router-link></li>
        </ul>
    </div>
</template>


<script>
export default {
  name: 'nav_links',
};
</script>
