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
            size="default"
            :icon="Plus"
            @click="handleAdd">
          添加数据
        </el-button>
      </div>
      <!--表格内容区-->
      <el-table :data="table" style="width: 100%">
        <el-table-column label="ID" align="center" prop="id"/>
        <el-table-column label="名字" align="center" prop="name"/>
        <el-table-column label="描述" align="center" prop="desc"/>
        <el-table-column label="创建时间" align="center" prop="createdAt">
          <template #default="scoped">
            {{ formatDate(scoped.row['createdAt']) }}
          </template>
        </el-table-column>
        <el-table-column label="修改时间" align="center" prop="updatedAt">
          <template #default="scoped">
            {{ formatDate(scoped.row['updatedAt']) }}
          </template>
        </el-table-column>
        <el-table-column label="Tags" align="center" prop="label">
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
                  :disable-transitions="false"
                  @close="closeTag(item.id,scope.row.id)"
              >
                {{ item['tags'] }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">
              修改
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
              添加
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
    <el-dialog v-model="dialogFormVisible" :title="flag?'添加数据':'修改数据'" width="500">
      <el-form :model="form" :ref="formRef">
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
            {{ flag ? '添加' : '保存' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!--添加标签对话框-->
    <el-dialog
        v-model="dialogTagVisible"
        title="添加标签"
        width="30%"
    >
      <el-tree-select
          v-model="tagVal"
          :data="tagsData"
          multiple
          :render-after-expand="false"
      />

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTagVisible = false">取消</el-button>
        <el-button type="primary" @click="handleTagSave">添加</el-button>
      </span>
      </template>
    </el-dialog>


  </div>
</template>
<script lang="ts" setup>
// 图片组件
import {Search, Plus} from '@element-plus/icons-vue';
import {onMounted, reactive, ref, watchEffect} from 'vue'
import {
  addItemAPI,
  addTagsAPI,
  delItemAPI,
  delTagAPI,
  editItemAPI,
  getPageListAPI,
  IQuery,
  ITag,
  IUser
} from "@/apis/table";
import {ElMessage, FormInstance} from 'element-plus';
import _ from 'lodash';
import {formatDate} from "../utils/format.ts";
// 表单域ref对象
const formRef = ref<FormInstance>();
// 控制修改和添加数据时对话框的显示和隐藏
const dialogFormVisible = ref(false);
// 控制【添加标签】时，对话框的显示和隐藏
const dialogTagVisible = ref(false);
const formLabelWidth = '40px';

const pageInfo = reactive<IQuery>({
  keywords: '',
  page: 1,
  pageSize: 5,
  total: 0
})


// 对话框里的表单数据
let form = reactive<IUser>({
  id: 0,
  name: '',
  desc: '',
  label: []
});

// tag标签数据
const tagInput = reactive<ITag>({
  tags: [],
  userId: 0
})
// 重置表单时，用到的对象resetForm
const resetForm = {
  id: 0,
  name: '',
  desc: ''
};
// 存储到请求列表
const tableData = ref<IUser[]>([]);
const table = ref<IUser[]>([]);
// 存储标签列表
const tagList = ref<ITag[]>([]);
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
// 定义boolean型ref,指示：添加和修改两种状态;true:添加，false:修改
const flag = ref(true);

// 对话框标签值
const tagVal = ref();
const tagsData = [
  {
    value: '1',
    label: 'Tag1'
  },
  {
    value: '2',
    label: 'Tag2'
  },
  {
    value: '3',
    label: 'Tag3'
  }
];


// 请求分页列表
const getPageList = async () => {
  const res = await getPageListAPI(pageInfo);
  console.log(res.data);
  if (res.data.code === 200) {
    // 存储分页的数据列表
    // ??表示如果其左边的值读不到，返回[]；类似||
    tableData.value = res.data?.data?.list ?? [];
    // 存储总条数
    pageInfo.total = res.data?.data?.total;
  } else {
    // TODO: 提示错误信息
  }
}

onMounted(() => {
  // 请求数据
  getPageList();
})

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
const handleAdd = () => {
  // console.log("id===", form.id);
  // 切换为添加数据状态
  flag.value = true;
  // 打开对话框
  init();
  // 5.重置表单域
  form = reactive({...form, ...resetForm});
}
const handleEdit = async (_: number, row: IUser) => {
// 索引变量index未使用，使用下划线注释掉
  // console.log(index, row);
  // 1.指示是修改数据状态
  flag.value = false;
  // 2.数据回显到form表单域
  form = reactive({...form, ...row});
  // console.log("id===", form.id);
  // 3.弹出对话框
  init();
}
/**
 * @name:handleSave()方法
 * @description:对话框添加或者修改后提交，事件处理
 * 修改和添加操作提交至后端后，都应重置表单域reset
 *
 *
 * */
const handleSave = async () => {

  console.log(flag.value);
  if (flag.value) {//添加数据
    // 1.表单校验

    // 2.提交数据
    // 直接表单对象放进去即可，id在里面；在接口中没有使用这个id
    const res = await addItemAPI(form);
    console.log(res.data);
    if (res.data.code === 200) {
      // 1.提示信息
      ElMessage({
        showClose: true,
        message: '添加成功',
        type: 'success'
      });
      // 2.重新请求分页列表
      await getPageList();
      // 3.关闭对话框
      close()
      // 4.重置表单域
      formRef.value?.resetFields();
    } else {
      ElMessage({
        showClose: true,
        type: 'error',
        message: '添加失败'
      })
      close();

    }
  } else {// 修改数据
    // 1.表单校验
    console.log("===", form);
    // 2.向后端提交数据
    const res = await editItemAPI(form);
    console.log(res.data.code);
    if (res.data.code === 200) {
      // 2.修改成功提示
      ElMessage({
        showClose: true,
        message: '成功修改一条数据',
        type: 'success'
      });
      // 3.关闭对话框
      close();
      // 4.重新请求列表
      await getPageList();
      // 5.重置表单域
      form = reactive({...form, ...resetForm});
    } else {
      ElMessage({
        showClose: true,
        message: '修改一条数据失败',
        type: 'error'
      });
    }


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
  const res = await getPageListAPI(pageInfo);
  if (res.data.code === 200) {
    // 存储分页的数据列表
    tableData.value = res.data?.data?.list!;
    // 存储总条数
    pageInfo.total = res.data?.data?.total;
  }
}

const handleDelete = async (row: IUser) => {
  // console.log(row)
  const res = await delItemAPI(row.id!);
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
 * @name:handleAddTags
 * @description:
 *
 *
 * */
const handleAddTags = (raw: IUser) => {
  dialogTagVisible.value = true
  // 打开对话框时，更新其对应的id值
  tagInput.userId = raw.id ?? 0;

}

/**
 * @name:handleTagSave
 * @description:保存标签
 *
 * */
interface IItem {
  label: string
  value: string
}

const handleTagSave = async () => {
  console.log(tagVal.value);
  // 后端需要的是tag标签名组成的数组：例如：['Tag1','Tag2']
  tagInput.tags = _.cloneDeep(tagsData)
      .filter((item: IItem) => tagVal.value.includes(item.value))
      .map(val => val.label) ?? [];
  console.log("====", tagInput);
  // 提交到后端
  const res = await addTagsAPI(tagInput);
  console.log(res.data);
  if (res.data.code == 200) {
    // 1.添加成功提示
    ElMessage({
      showClose: true,
      message: '成功为记录添加了标签',
      type: 'success'
    });
    // 2.重新请求列表
    await getPageList();
    // 3.关闭对话框
    dialogTagVisible.value = false;

  }

}
/**
 * @name:handleClose
 * @description:删除标签，事件处理
 *
 * */
const closeTag = async (tagId: number, userId: number) => {
  console.log(tagId);
  console.log(userId);
  // 记录行id
  tagInput.userId = userId;
  let tag: IUser[] = tableData.value.filter(item => item.id === userId);
  console.log('tag-test', tag);
  tagList.value = tag[0].tags!;
  tagList.value.some((val, index) => {
    if (val.id === tagId) {
      tagList.value.splice(index, 1);
      return true;
    }
  })


  const res = await delTagAPI({userId, tagId});
  console.log(res.data);
  if (res.data.code === 200) {
    // 1.提示信息
    ElMessage({
      showClose: true,
      type: 'success',
      message: '成功删除一个标签'
    });
    // 2.重新请求列表
    await getPageList();
  } else {
    ElMessage({
      showClose: true,
      type: 'error',
      message: '删除一个标签失败'
    });
  }

}
/**
 * @name:watchEffect
 * @description:
 *
 * */
watchEffect(() => {
  table.value = _.cloneDeep(tableData.value);

})


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