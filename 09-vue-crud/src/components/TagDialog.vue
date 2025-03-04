<!--
*@name: TagDialog.vue
*@author: Bao Chengyi
*@date: 2025/3/4 17:55
-->
<template>
  <el-dialog v-model="tagVisible" title="修改标签" width="25%">
    <el-form :model="form">
      <el-form-item label="标签" :label-width="40">
        <el-select
            v-model="form.curValue"
            multiple
            placeholder="请选择标签，可多选"
            style="width: 100%"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="tagVisible = false">取消</el-button>
        <el-button type="primary" @click="handleTag">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {computed, reactive, ref} from "vue";

const props = defineProps({
  tagForm: {
    type: Object,
    required: true
  }
});
// 表单
const form = reactive({
  curValue: computed({
    get() {
      let res: string[] = [];
      res = props.tagForm?.reduce((sum, cur) => {
        return [...sum, cur.tags]
      }, [])
      return res;
    },
    set(val) {
      console.log("val", val);
      emits('handleTagMod', val);
    }
  })
});
const emits = defineEmits(['handleTagMod', 'handleTagSubmit']);
// 添加数据或修改数据对话框
const tagVisible = ref(false);

defineExpose({
  tagVisible
});


/**
 * @desc:handleTag()方法
 * 在下拉框中选择好标签后，点击确定按钮提交
 * 按钮提交事件
 *
 * */
const handleTag = () => {
  console.log("form", form.curValue);
  emits('handleTagSubmit', form.curValue);

}
const options = [
  {
    value: 'Tag1',
    label: 'Tag1',
  },
  {
    value: 'Tag2',
    label: 'Tag2',
  },
  {
    value: 'Tag3',
    label: 'Tag3',
  }
]
</script>

<style lang="scss" scoped>

</style>