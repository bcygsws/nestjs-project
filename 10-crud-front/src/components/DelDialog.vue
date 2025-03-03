<!--
*@name: FormDialog.vue
*@author: Bao Chengyi
*@date: 2025/3/1 20:06
-->
<template>
  <el-dialog v-model="dialogForm" title="删除数据" width="40%" class="my-dialog">
    <span>你确定要删除这条数据吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogForm = false">取消</el-button>
        <el-button type="primary" @click="delSubmit">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
/*接收父组件传递的属性*/
import {computed} from "vue";

const props = defineProps({
  isDel: {
    type: Boolean,
    default: false
  },
});
const emits = defineEmits(['handleDelDialog', 'submitDel']);
// 计算属性的get/set，维护子组件中的dialogForm状态
const dialogForm = computed({
  get() {
    return props.isDel;
  },
  set(val) {
    emits('handleDelDialog', val);
  }
});

/**
 * @desc:delSubmit()方法
 * 删除数据
 *
 * */
const delSubmit = () => {
  emits('submitDel');
}

</script>

<style lang="scss" scoped>

</style>