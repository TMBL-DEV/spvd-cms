<template>
  <div>
    hoi
  </div>
</template>
<script setup lang="ts">
useStrapiAuth().setToken(useRuntimeConfig().public.strapiToken)
const {find} = useStrapi();

find('blogs').then((res) => {
  // console.log(res);

})

</script>
