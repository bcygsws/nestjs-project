<!--
*@name: TagDialog.vue
*@author: Bao Chengyi
*@date: 2025/3/1 20:06
-->
<template>
  <el-dialog v-model="dialogForm" title="修改标签" width="40%">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="60">
        <el-select
            v-model="form.curVal"
            multiple
            placeholder="请选择标签，可多选"
            style="width: 100%"
        >
          <el-option
              v-for="item in cat"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
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
import {onMounted, Ref, ref} from 'vue';
/*接收父组件传递的属性*/
import {computed} from "vue";
import {getTagCatAPI} from "@/apis/tag.ts";
import type {ITag} from '@/apis/tag.ts';

// tag标签的分类{label:'',value:''}
const cat = ref<ITag[]>([]);
// 选中的标签集合，如：['Tag1','Tag2']
const tags = ref<string[]>([]);

const getTagCat = async () => {
  const res = await getTagCatAPI();
  console.log("getTagCat", res);
  if (res.code === 200) {
    cat.value = res.data.map((item: any) => {
      return {
        label: item['tags'],
        value: item['tags']
      }
    })
    console.log("cat: ", cat.value);

  }
}

function getValueByTag(tag: string) {
  const res = cat.value.find((item: ITag) => {
    if (item.label === tag) {
      return item.value;
    }
  })
  return res?.value;
}

onMounted(() => {
  getTagCat();
})
const props = defineProps({
  isTagShow: {
    type: Boolean,
    default: false
  },
  tagForm: {
    type: Array<any>
  }
});
const emits = defineEmits(['handleTag', 'handleTagDialog', 'handleTagSubmit']);
// 计算属性的get/set，维护子组件中的dialogForm状态
const dialogForm = computed({
  get() {
    return props.isTagShow;
  },
  set(val) {
    emits('handleTagDialog', val);
  }
});
// 表单数据
const form = ref<{ curVal: Ref }>({
  curVal: computed({
    get() {
      if (!props.tagForm?.length) {
        return [];
      } else {
        const res = props.tagForm.reduce((res, cur) => {
          return [...res, getValueByTag(cur.tags)]
        }, []);
        console.log("yyyyy", res);
        return res;
      }
    },
    set(val) {
      tags.value = val;
      console.log("curVal中val: ", val);
      emits('handleTag', val);
    }
  })
});
console.log("curVal: ", form.value.curVal);

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
// 向父组件emit form表单数据
  console.log("form: ", form.value);
  emits('handleTagSubmit', form.value.curVal);

}

</script>

<style lang="scss" scoped>

</style>