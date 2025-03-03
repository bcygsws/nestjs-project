<!--
*@name: FormDialog.vue
*@author: Bao Chengyi
*@date: 2025/3/1 20:06
-->
<template>
  <el-dialog v-model="dialogForm" :title="flag?'添加数据':'修改数据'" width="40%" class="my-dialog">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="60">
        <el-input v-model="form.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="描述" :label-width="60">
        <el-input v-model="form.desc" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogForm = false">取消</el-button>
        <el-button type="primary" @click="submit(flag)">
          {{ flag ? '添加' : '修改' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
/*接收父组件传递的属性*/
import {computed} from "vue";

const props = defineProps({
  flag: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  form: {
    type: Object,
    default: () => {
      return {
        name: '',
        desc: ''
      }
    }
  }
});
const emits = defineEmits(['handleSub', 'handleMod', 'handleDialogForm']);
// 计算属性的get/set，维护子组件中的dialogForm状态
const dialogForm = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits('handleDialogForm', val);
  }
});

/**
 * @desc:submit()方法
 * 添加数据或者修改数据
 * 参数：flag
 * 类型：boolean
 *
 * */
const submit = (flag: boolean) => {
  dialogForm.value = false;
  if (flag) {// 添加数据逻辑
    emits('handleSub', props.form);
  } else {// 修改数据逻辑
    emits('handleMod', props.form);

  }
}

</script>

<style lang="scss" scoped>

</style>