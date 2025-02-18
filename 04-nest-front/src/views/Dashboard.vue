<!--
*@name: Dashboard
*@author: Bao Chengyi
*@date: 2024/8/22 18:18
-->
<template>
  主页面板
  <stream-image></stream-image>
  <!--msg-->
  <p>{{ msg }}</p>
</template>
<script lang="ts" setup>
import StreamImage from '@/components/StreamImage.vue';
import {getListAPI} from "@/apis/home.ts";
import {onMounted, ref} from "vue";

const msg = ref("");
const getList = async () => {
  const res = await getListAPI();
  console.log(res);
  msg.value = res.data?.data!;
}
onMounted(() => {
  getList();
  getList();
});

</script>

<style lang="scss" scoped>


</style>