<!--
*@name: HomeView
*@description: CRUD 首页
*@author: Bao Chengyi
*@date: 2024/8/28 1:53
-->
<template>
  <div class="home-container">
    <!--搜索区-->
    <div class="search">
      <el-input
          v-model="pageInfo.keywords"
          style="max-width: 600px"
          placeholder="请输入检索关键字"
          class="input-with-select"
      >
        <template #append>
          <el-button type="primary" :icon="Search" @click="handleSearch"/>
        </template>
      </el-input>


    </div>
    <!--表格区-->
    <div class="tb-container">
      <!--添加数据-按钮-->
      <div class="add-btn">
        <el-button
            type="primary"
            size="small"
            :icon="Plus"
            @click="handleAdd">
          添加数据
        </el-button>
      </div>
      <!--表格内容区-->
      <el-table :data="table" style="width: 100%" stripe border>
        <el-table-column label="ID" prop="id" width="50"/>
        <el-table-column label="名字" prop="name" width="100"/>
        <el-table-column label="描述" prop="desc"/>
        <el-table-column label="创建时间" prop="createdAt" width="180">
          <template #default="scoped">
            {{ formatDate(scoped.row['createdAt']) }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间" prop="updatedAt" width="180">
          <template #default="scoped">
            {{ formatDate(scoped.row['updatedAt']) }}
          </template>
        </el-table-column>
        <el-table-column label="Tags" prop="label">
          <!--利用作用域插槽，某一列中嵌入其他标签-->
          <template #default="scope">
            <!--打印当前 行内容 ，就是scope.row -->
            <!--{{ scope.row }}-->
            <el-space>
              <el-tag
                  v-for="item in scope.row['tags']"
                  :key="item.id"
                  class="mx-1"
                  closable
                  @close="closeTag(item.id,scope.row)"
              >
                {{ item['tags'] }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">
              修改数据
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
            <el-button
                size="small"
                type="success"
                @click="handleAddTags(scope.row)"
            >
              修改标签
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
            size="small"
            background
            layout="prev, pager, next"
            :total="pageInfo.total"
            :page-size="pageInfo.pageSize"
            :current-page="pageInfo.page"
            @update:current-page="switchPage"
            class="mt-4"
        />
      </div>

    </div>
    <!--编辑或者添加时对话框-->
    <ChangeDialog
        ref="changeRef"
        :flag="flag"
        :form="form"
        @handleAddSubmit="handleAddSubmit"
        @handleModSubmit="handleModSubmit"
    />
    <!--修改标签对话框-->
    <TagDialog
        :tagForm="tagForm"
        ref="tagRef"
        @handleTagMod="handleTagMod"
        @handleTagSubmit="handleTagSubmit"
    />

    <!--删除记录，对话框提示-->
    <DelDialog
        ref="delRef"
        @handleDelSubmit="handleDelSubmit"
    />
  </div>
</template>
<script lang="ts" setup>
// 图片组件
import {Search, Plus} from '@element-plus/icons-vue';
import {onMounted, reactive, ref} from 'vue'
import {
  addItemAPI,
  addTagsAPI,
  delItemAPI,
  delTagAPI,
  editItemAPI,
  getPageListAPI, ILabel,
  IQuery,
  IUser
} from "@/apis/table";
import {ElMessage} from 'element-plus';
import _ from 'lodash';
import {formatDate} from "@/utils/format.ts";
import DelDialog from "@/components/DelDialog.vue";
import ChangeDialog from "@/components/ChangeDialog.vue";
import TagDialog from "@/components/TagDialog.vue";

// 添加或删除数据标志;flag:true,添加数据；flag:false,修改数据
const flag = ref(false);
// 添加或修改数据对话框组件的ref属性
const changeRef = ref(false);

// DelDialog组件的ref属性
const delRef = ref();
// 记录删除对话框弹起时的id值
const delId = ref(0);


const pageInfo = reactive<IQuery>({
  keywords: '',
  page: 1,
  pageSize: 5,
  total: 0
});

// tag表单数据
const tagForm = ref<ILabel[]>([]);
// 添加标签对话框组件的ref属性
const tagRef = ref();
// 记录当前行的id
const tagId = ref(0);


// 对话框里的表单数据
let form = reactive<IUser>({
  id: 0,
  name: '',
  desc: ''
});

// 重置表单时，用到的对象resetForm
const resetForm = {
  id: 0,
  name: '',
  desc: ''
};
// 存储到请求列表
const tableData = ref<IUser[]>([]);
const table = ref<IUser[]>([]);
/**
 * @description:对话框复用
 * 确定是添加数据还是修改数据？
 * 方法一、当前采用的状态量
 *
 * 方法二、关注form表单数据的id值
 * id初始设为0，表示添加
 * 修改数据，回显时id不为0，就可以区分
 *
 * */

// 请求分页列表
const getPageList = async () => {
  const res = await getPageListAPI(pageInfo);
  console.log(res.data);
  if (res.data.code === 200) {
    // 存储分页的数据列表
    // ??表示如果其左边的值读不到，返回[]；类似||
    tableData.value = res.data?.data?.list ?? [];
    table.value = tableData.value;
    // 存储总条数
    pageInfo.total = res.data?.data?.total;
  } else {
    // TODO: 提示错误信息
  }
}
// 初次渲染时，dom挂载完成时，请求分页列表
onMounted(() => {
  // 请求数据
  getPageList();
});


/**
 * @name: handleAdd()方法
 * @description: 添加数据
 *
 * */
const handleAdd = () => {
  clearForm();
  // 切换为添加数据状态
  flag.value = true;
  // 打开对话框
  changeRef.value.dialogFormVisible = true;
}

/**
 * @desc：handleAddSubmit()方法
 * 添加数据对话框，添加 按钮提交数据
 *
 * */
const handleAddSubmit = async (val: IUser) => {
  console.log("add val", val);
  // 2.提交数据
  // 直接表单对象放进去即可，id在里面；在接口中没有使用这个id
  const res = await addItemAPI(val);
  console.log(res.data);
  if (res.data.code === 200) {
    // 3.清空表单
    clearForm();
    console.log("add form", form);
    // 4.关闭对话框
    changeRef.value.dialogFormVisible = false;
    // 4.重新请求分页列表
    await getPageList();
  }
}

/**
 * @desc:handleEdit()方法
 * 表格中，修改数据按钮
 *
 * */
const handleEdit = async (row: IUser) => {
  console.log("edit row", row);
  // 1.指示是修改数据状态
  flag.value = false;
  // 2.数据回显到form表单域
  form = Object.assign(form, {name: row.name, desc: row.desc, id: row.id});
  console.log("edit form", form);
  // 2.弹出对话框
  changeRef.value.dialogFormVisible = true;
}

/**
 *@desc:handleModSubmit()方法
 * 修改数据对话框，修改 按钮提交数据
 *
 *
 * */
const handleModSubmit = async () => {
  // 1.向后端提交数据
  const res = await editItemAPI(form);
  console.log(res.data.code);
  if (res.data.code === 200) {
    // 2.清空表单
    clearForm();
    // 3.关闭对话框
    changeRef.value.dialogFormVisible = false;
    // 4.重新请求列表
    await getPageList();
  }
}

/**
 * @name:handleSearch()方法
 * @description:检索事件处理
 *
 * */
const handleSearch = async () => {
  // 和添加数据接口一样，这里的total没有使用，直接传入reactive响应式对象，完全可行
  const res = await getPageListAPI(pageInfo);
  if (res.data.code === 200) {
    // 存储分页的数据列表
    tableData.value = res.data?.data?.list!;
    table.value = tableData.value;
    // 存储总条数
    pageInfo.total = res.data?.data?.total;
  }
}

/**
 * @desc:handleDelSubmit()方法
 * 子组件确定按钮，提交删除操作，子组件emit方法
 *
 * */
const handleDelSubmit = async () => {
  const res = await delItemAPI(delId.value);
  console.log(res.data);
  if (res.data.code === 200) {
    // 1.删除成功提示
    ElMessage({
      showClose: true,
      message: '成功删除一条数据',
      type: 'success'
    });
    // 2.重新请求列表
    await getPageList();
  } else {
    // 删除失败提示
    ElMessage({
      showClose: true,
      message: '删除一条数据失败',
      type: 'error'
    })

  }
}
const handleDelete = async (row: IUser) => {
  console.log(row);
  // 表格删除按钮，点击，弹出对话框
  delRef.value.dialogVisible = true;
  // 更新当前行id
  delId.value = row.id!;
}


/**
 * @name:switchPage
 * @description:切换页码
 *
 * */
const switchPage = (page: number) => {
  console.log(page)// 测试可以拿到当前页面
  pageInfo.page = page;
  // 根据当前page值重新发起列表请求
  getPageList();

}
/**
 * @desc:handleAddTags()方法
 * 点击 添加标签 按钮，为当前行添加若干标签
 *
 * */
const handleAddTags = (row: IUser) => {
  console.log("tag row", row);
  // 打开添加tag对话框
  tagRef.value.tagVisible = true;
  // 记录下当前user所在行id
  tagId.value = row.id!;
  tagForm.value = row.tags as ILabel[];
}
/**
 * @desc：handleTagMod()方法
 * 实时修改标签对话框，同步tagForm
 *
 * */
const handleTagMod = (val: string[]) => {
  console.log("实时修改tagForm", val);
  tagForm.value = val.map((item: string) => ({tags: item}));
}
/**
 * @desc：handleTagSubmit()方法
 * 子组件标签选择完成后，确定按钮提交，事件处理
 *
 * */
const handleTagSubmit = async (val: string[]) => {
  // 关闭对话框
  tagRef.value.tagVisible = false;
  console.log("tag submit", val);
  // 当前行user的id值：tagId，以及表单数据val,格式示例：['Tag1','Tag2']
  const res = await addTagsAPI({userId: tagId.value, list: val});
  console.log("add tag res", res);
  if (res.data.code === 200) {
    // 重新请求列表
    await getPageList();
  }

}

/**
 * @name:handleClose
 * @description:删除标签，事件处理
 * 参数
 * curId：当前删除的那个tag的id值
 * row:当前行数据
 *
 *
 * */
const closeTag = async (curId: number, row: IUser) => {
  console.log("curId", curId);
  let tagArray: ILabel[] = [];
  // 最新tag数组 tagArray;示例：{id：'',tags:''}
  tagArray = row.tags?.filter(item => item.id !== curId)!;
  // 更新当前行id:row.id 下的tags节点数组
  table.value = _.cloneDeep(tableData.value);
  table.value.some((item) => {
    if (item.id === row.id) {
      item.tags = tagArray;
      return true;
    }
  });
  const res = await delTagAPI(row.id!, curId);
  console.log(res.data);
  if (res.data.code === 200) {
    // 重新请求列表
    await getPageList();
  }
}
/**
 * @desc:clearForm()方法
 * 清空表单方法
 *
 * */
const clearForm = () => {
  form = reactive({...form, ...resetForm});
}

</script>

<style lang="scss" scoped>
/*a.装包sass b.配置vite;之后测试sass配置成功*/
.home-container {
  .search {
    padding-top: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .tb-container {
    padding: 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    .add-btn {
      padding: 10px 0;
    }

    .page {
      margin-top: 10px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }
}

</style>