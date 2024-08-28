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
        <el-button type="primary" size="default" :icon="Plus" @click="addItem">添加数据</el-button>
      </div>
      <!--表格内容区-->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="名字" prop="name"/>
        <el-table-column label="描述" prop="desc"/>
        <el-table-column label="ID" prop="id"/>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
            >
              删除
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
            class="mt-4"
        />
      </div>

    </div>
    <!--编辑或者添加时对话框-->
    <el-dialog v-model="dialogFormVisible" title="添加数据" width="500">
      <el-form :model="form">
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>


  </div>
</template>
<script lang="ts" setup>
// 图片组件
import {Search, Plus} from '@element-plus/icons-vue';
import {computed, onMounted, reactive, ref} from 'vue'
import {addItemAPI, getPageListAPI, IQuery, IUser} from "@/apis/table.ts";
import {ElMessage} from 'element-plus';
// 检索关键字keywords
const keywords = ref('');
const pageInfo = reactive<IQuery>({
  keywords: '',
  page: 1,
  pageSize: 10,
  total: 0
})


// 对话框里的表单数据
const form = reactive<IUser>({
  id: 0,
  name: '',
  desc: ''
});
// 存储到请求列表
const tableData = ref<IUser[]>([]);
// 清空数据
const resetForm = ref({...form});
// 请求分页列表
const getPageList = async () => {
  const res = await getPageListAPI(pageInfo);
  console.log(res.data);
  if (res.data.code === 200) {
    // 存储分页的数据列表
    tableData.value = res.data?.data.list;
    // 存储总条数
    pageInfo.total = res.data?.data.total;

  } else {
    // TODO: 提示错误信息
  }
}

onMounted(() => {
  // 请求数据
  getPageList();
})

const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
/**
 * @name:init()方法
 * @description:弹出对话框
 *
 * */
const init = () => {
  dialogFormVisible.value = true;
}
/**
 * @name:close()方法
 * @description:关闭对话框
 *
 * */
const close = () => {
  dialogFormVisible.value = false;

}
/**
 * @name:addItem()方法
 * @description: 添加数据
 *
 * */
const addItem = () => {
  init();
}
/**
 * @name:handleSave()方法
 * @description:对话框添加或者修改后提交，事件处理
 *
 * */
const handleSave = async () => {
  console.log('保存');
  // 1.表单校验

  // 2.提交数据
  // 直接表单对象放进去即可，id在里面；在接口中没有使用这个id
  const res = await addItemAPI(form);
  if (res.data.code === 200) {
    // 1.关闭对话框
    close();
    // 2.提示信息
    ElMessage({
      showClose: true,
      message: '添加成功',
      type: 'success'
    });
    // 2.重新请求分页列表
    await getPageList();
  } else {
    ElMessage({
      showClose: true,
      type: 'error',
      message: '添加失败'
    })
    close();

  }
}
/**
 * @name:handleSearch()方法
 * @description:检索事件处理
 *
 *
 * */
const handleSearch = async () => {
  // 和添加数据接口一样，这里的total没有使用，直接传入reactive响应式对象，完全可行
  const res=await getPageListAPI(pageInfo);
  if (res.data.code === 200) {
    // 存储分页的数据列表
    tableData.value = res.data?.data.list;
    // 存储总条数
    pageInfo.total = res.data?.data.total;
  }
}
const handleEdit = (index: number, row: IUser) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: IUser) => {
  console.log(index, row)
}

const dialogTableVisible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '40px'


</script>

<style lang="scss" scoped>
/*a.装包sass b.配置vite;之后测试sass配置成功*/
.home-container {
  .search {
    padding-top: 20px;
    color: red;
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