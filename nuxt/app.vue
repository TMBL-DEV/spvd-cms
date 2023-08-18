<template>
   <NuxtLayout>
    some page content
  </NuxtLayout>
</template>
<script setup lang="ts">
import { blog } from './types/blog';

const { find } = usePublicStrapi();

find<blog>('blogs').then((res) => {
  res.data.forEach((blog) => {
    console.log(blog.attributes.publishedAt);
    
  })

})

</script>
