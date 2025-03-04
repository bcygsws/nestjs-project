<!--
*@name: ChangeDialog.vue
*@author: Bao Chengyi
*@date: 2025/3/4 17:55
-->
<template>
  <el-dialog v-model="dialogFormVisible" :title="flag?'添加数据':'修改数据'" width="25%">
    <el-form :model="form">
      <el-form-item label="名字" :label-width="40">
        <el-input v-model="form.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="描述" :label-width="40">
        <el-input v-model="form.desc" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleChange(flag)">
          {{ flag ? '添加' : '保存' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps({
  flag: {
    type: Boolean,
    default: true
  },
  form: {
    type: Object,
    required: true
  }
});
// 添加数据或修改数据对话框
const dialogFormVisible = ref(false);
defineExpose({
  dialogFormVisible
});
const emits = defineEmits(['handleAddSubmit', 'handleModSubmit']);

/**
 * @desc:handleChange()方法
 * 添加数据或修改数据完成对话框
 *
 * */


const handleChange = (flag: boolean) => {
  if (flag) {
    console.log("添加数据");
    emits('handleAddSubmit', props.form);
  } else {
    console.log("修改数据");
    emits('handleModSubmit', props.form);
  }
}
</script>

<style lang="scss" scoped>

</style>