<!--
*@name: TagDialog.vue
*@author: Bao Chengyi
*@date: 2025/3/1 20:06
-->
<template>
  <el-dialog v-model="dialogForm" title="修改标签" width="40%">
    <el-form :model="tagForm">
      <el-form-item label="姓名" :label-width="60">
        <el-tree-select
            v-model="curVal"
            :data="cat"
            multiple
            :render-after-expand="false"
            show-checkbox
            style="width: 100%"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogForm = false">取消</el-button>
        <el-button type="primary" @click="submit()">
         修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue';
/*接收父组件传递的属性*/
import {computed} from "vue";
import {getTagCatAPI} from "@/apis/tag.ts";

export interface ITag {
  value: number;
  label: string;
}

const cat = ref<ITag[]>([]);
const getTagCat = async () => {
  const res = await getTagCatAPI();
  console.log("getTagCat", res);
  if (res.code === 200) {
    cat.value = res.data.map((item: any, index) => {
      return {
        label: item['tags'],
        value: index + 1
      }
    })
    console.log("cat: ", cat.value);

  }
}

onMounted(() => {
  getTagCat();
})
const curVal = ref();
console.log("curVal: ", curVal);
const props = defineProps({
  isTagShow: {
    type: Boolean,
    default: false
  },
  tagForm: {
    type: Array<any>
  }
});
const emits = defineEmits(['handleTag', 'handleDialogForm1']);
// 计算属性的get/set，维护子组件中的dialogForm状态
const dialogForm = computed({
  get() {
    return props.isTagShow;
  },
  set(val) {
    emits('handleDialogForm1', val);
  }
});

/**
 * @desc:submit()方法
 * 添加数据或者修改数据
 * 参数：flag
 * 类型：boolean
 *
 * */
const submit = () => {
  // 关闭对话框
  dialogForm.value = false;
// 向父组件emit tagForm数据
  emits('handleTag', curVal.value);

}

</script>

<style lang="scss" scoped>

</style>