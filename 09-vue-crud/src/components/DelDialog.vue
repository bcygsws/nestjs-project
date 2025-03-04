<!--
*@name: DelDialog.vue
*@author: Bao Chengyi
*@date: 2025/3/4 17:11
-->
<template>
  <el-dialog
      v-model="dialogVisible"
      title="删除数据"
      width="25%"
  >
    <span>你确定删除这条数据吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="delDialogClosed">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ref} from 'vue';

// 删除数据对话框显示或隐藏
const dialogVisible = ref(false);
const emits = defineEmits(['handleDelSubmit']);

/**
 * @desc: 对话框关闭事件处理
 *
 * */
const delDialogClosed = () => {
  // 关闭对话框
  dialogVisible.value = false;
  emits('handleDelSubmit');

}

defineExpose({
  dialogVisible
});
</script>

<style lang="scss" scoped>

</style>