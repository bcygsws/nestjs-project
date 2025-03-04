<template>
  <div class="home-container">
    <!--搜索框-->
    <div class="search">
      <el-input
          v-model="info.keywords"
          placeholder="请输入检索关键字"
          class="input-with-select"
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearch"/>
        </template>
      </el-input>
    </div>
    <!--内容展示表-->
    <!--添加数据-->
    <div class="content">
      <div class="add">
        <el-button type="primary" size="small" @click="addUser">
          添加数据
          <el-icon class="el-icon--right">
            <Plus/>
          </el-icon>
        </el-button>
      </div>
      <!--展示数据border stripe设置true后，表示带边框和带斑马纹的表格-->
      <el-table :data="tb" style="width: 100%" border stripe>
        <el-table-column label="ID" width="60">
          <template #default="scope">
            <div>{{ scope.row.id }}</div>
          </template>
        </el-table-column>
        <el-table-column label="名字" width="180">
          <template #default="scope">
            <div>{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template #default="scope">
            <div>{{ scope.row.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ formatDate(scope.row['createdAt']) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ formatDate(scope.row['updatedAt']) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tags" width="180">
          <template #default="scope">
            <el-space>
              <el-tag v-for="tag in scope.row.tags"
                      :key="tag.id"
                      closable
                      @close="delTag(scope.row,tag)">
                {{ tag['tags'] }}
              </el-tag>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="editUser(scope.row)"
            >修改用户
            </el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="delUser(scope.row)"
            >删除
            </el-button
            >
            <el-button
                size="small"
                type="primary"
                @click="modTag(scope.row)"
            >修改标签
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
          size="small"
          background
          layout="prev, pager, next"
          :total="info.total"
          :page-size="info.pageSize"
          @current-change="switchPage"
          class="mt-4"
      />
    </div>
    <!--添加数据对话框-->
    <!--定义一个flag量：true为添加数据，false为修改数据-->
    <FormDialog
        :flag="flag"
        :form="form"
        :visible="visible"
        @handleSub="handleSub"
        @handleMod="handleMod"
        @handleDialogForm="handleDialogForm"
    />
  </div>
  <!--修改标签tag的对话框-->
  <TagDialog
      :isTagShow="isTagShow"
      :tagForm="tagForm"
      @handleTag="handleTag"
      @handleTagDialog="handleTagDialog"
      @handleTagSubmit="handleTagSubmit"
  />
  <!--删除数据对话框-->
  <DelDialog
      :isDel="isDel"
      @handleDelDialog="handleDelDialog"
      @submitDel="submitDel"
  />
</template>

<script lang="ts" setup>
import {reactive, onMounted, ref} from "vue";
import {Search, Plus} from '@element-plus/icons-vue';
import {addUserAPI, deleteUserByIdAPI, editUserByIdAPI, getListAPI} from "@/apis/table.ts";
import type {IList, IQuery, IData, IForm} from '@/apis/table.ts';
import formatDate from "@/utils/format.ts";
import FormDialog from "@/components/FormDialog.vue";
import TagDialog from "@/components/TagDialog.vue";
import DelDialog from "@/components/DelDialog.vue";
import type {ITag,ITagList} from "@/apis/tag.ts";
// 深拷贝方法cloneDeep
import {cloneDeep} from "lodash-es";
import {delTagByIdsAPI, updateTagAPI} from "@/apis/tag.ts";

// 添加/修改对话框的显示或隐藏
const visible = ref(false);

// 标签对话框的显示或隐藏
const isTagShow = ref(false);
// 当前tag列表所在行id
const tagId = ref(0);

// 删除对话框的显示或隐藏
const isDel = ref(false);

// 维护是添加数据还是修改数据
const flag = ref(false);


let form = reactive<IForm>({
  id: 0,
  name: '',
  desc: '',
});
const tagForm = ref<ITag[] | []>([]);


// 主要参数page当前页码、pageSize每页容量、total总数、keywords关键字
const info = reactive<IQuery>({
  page: 1,
  pageSize: 5,
  total: 0,
  keywords: ""
});

// tableData数据源
const tableData = ref<IList[]>([]);

// 点击表格中的可操作的数据源，主要是Tags列

const tb = ref<IList[]>([]);


/**
 * @desc:getList
 * 获取表格列表数据
 *
 *
 * */
const getList = async () => {
  const res = await getListAPI<IData>(info);
  console.log("res====", res);
  if (res.code === 200) {
    tableData.value = res.data?.list;
    tb.value = tableData.value;
    console.log("tableData===", tableData);
    info.total = res.data?.total;
  }
}
onMounted(() => {
  getList();
});
/**
 * @desc:handleSearch方法
 * 输入关键字，点击搜索按钮，触发搜索事件
 *
 * */

const handleSearch = () => {
  getList();
}

/**
 * @desc:添加数据addUser
 *
 * */
const addUser = async () => {
  visible.value = true;
  // 添加数据标志
  flag.value = true;

}
/**
 * @desc:editUser()方法
 * 修改数据
 *
 *
 **/
const editUser = (row: IList) => {
  console.log(row);
  visible.value = true;
  // 修改数据标志
  flag.value = false;
  // 修改按钮点击，看到回填数据
  form = Object.assign(form, {name: row.name, desc: row.desc, id: row.id});

}
const delUser = (row: IForm) => {
  console.log(row);
  form.id = row.id;
  // 打开删除对话框
  isDel.value = true;

}
/**
 * @desc:修改标签方法modTag()
 *
 * */
const modTag = (row: IList) => {
  console.log(row);
  isTagShow.value = true;
  // 获取子组件对话框中的渲染标签数据
  tagForm.value = <ITag[] | []>row.tags;
  // 记录当前行的id
  tagId.value = row.id;
  console.log("tagForm====", tagForm.value);

}
/**
 * @desc:handleTag()方法
 * 修改下拉框中的各标签的选中状态时，反过来修改数据源tagForm
 *
 *
 * */
const handleTag = (val: any) => {
  console.log("val====标签数据", val);
  tagForm.value = val.map((item: any) => ({tags: item}))
}
/**
 * @desc:handleTagSubmit()方法
 * 标签修改后，点击 确定 按钮，事件处理
 * 参数val，示例：['Tag1','Tag2']
 * */
const handleTagSubmit = async (val: string[]) => {
  console.log("server val====", val);
  console.log("tagId====", tagId.value);
  // 记录的当前行id,以及新的tag标签列表，提交至后端
  const res = await updateTagAPI(tagId.value, val);
  if (res.code === 200) {
    // 关闭对话框
    isTagShow.value = false;
    // 刷新列表
    await getList();
  }

}

/**
 * @desc:switchPage方法
 * 切换页码事件处理
 *
 * */
const switchPage = (page: number) => {
  info.page = page;
  getList();
}


/**
 * @desc:handleSub()方法
 * 接收子组件添加后的表单数据
 *
 * */
const handleSub = async (val: Partial<IList>) => {
  console.log("val ====", val);
  // 将数据提交到服务端
  const res = await addUserAPI<IList>(val);
  console.log("res", res);
  if (res.code === 200) {
    // 提交到后端成功
    // 1.清空表单域
    form = Object.assign(form, {name: '', desc: ''});
    // 2.关闭对话框
    visible.value = false;
    // 3.重新请求user列表
    await getList();

  }

}
/**
 * @desc:handleMod()方法
 * 接收子组件修改后的表单数据
 *
 * */
const handleMod = async (val: Partial<IList>) => {
  console.log("val ====", val);
  // 将数据提交到服务端
  const res = await editUserByIdAPI(form.id!, val);
  console.log("res", res);
  if (res.code === 200) {
    // 提交到后端成功
    // 1.清空表单域
    form = Object.assign(form, {name: '', desc: '', id: 0});
    // 2.关闭对话框
    visible.value = false;
    // 3.刷新列表
    await getList();
  }
}
/**
 * @desc：submitDel()方法
 * 删除对话框 确认按钮点击事件
 *
 **/
const submitDel = async () => {
  const res = await deleteUserByIdAPI(form.id!);
  console.log("del res", res);
  if (res.code === 200) {
    // 1.关闭对话框
    isDel.value = false;
    // 2.刷新列表
    await getList();
  }
}

/**
 * @desc:删除标签delTag()
 * row:表格中当前行的数据
 * tag:被删除的那个标签信息
 *
 * */

const delTag = async (row: IList, tag: ITagList) => {
  console.log("当前行数据", row);
  console.log("被删掉的那个tag标签", tag);
  tb.value = cloneDeep(tableData.value);
  // 节点tags数组tagArray
  let tagArray: ITagList[] = [];
  if (row.tags?.length) {
    //得到最新的tags标签数组
    tagArray = row.tags.filter((item: ITagList) => item !== tag)
  }
  // 根据当前行id,在tb中修改当前行数据
  tb.value.some((item) => {
    if (item.id === row.id) {
      item.tags = tagArray;
      return true;
    }
  })
  // 删除后的tb
  console.log("tb=====", tb.value);
  // row.id和tag.id是传递给后端的数据；
  // 示例：row.id当前user表id,tag.id是被删除的那个tag标签的id
  const res=await delTagByIdsAPI(row.id, tag.id);
  if (res.code === 200) {
    // 刷新列表
    await getList();
  }

}


/**
 * @desc：handleDialogForm()方法
 * 处理对话框的显示或隐藏
 *
 * */
const handleDialogForm = (val: any) => {
  visible.value = val;
}

/**
 * @desc:handleDialogForm1()方法
 * 修改标签后，子组件向父组件传值方法
 *
 *
 * */
const handleTagDialog = (val: any) => {
  isTagShow.value = val;
}
/**
 * @desc:handleDelDialog()方法
 * 删除数据，对话框
 *
 * */
const handleDelDialog = (val: any) => {
  isDel.value = val;
}
</script>
<style lang="scss" scoped>
.home-container {
  width: 100%;

  .search {
    width: 60%;
    height: 50px;
    margin: 0 auto;
    padding: 20px 0 0;
    box-sizing: border-box;
  }

  .content {
    padding: 0 20px;
    box-sizing: border-box;

    .add {
      margin: 10px 0;
    }
  }

  .pagination {
    margin-top: 15px;

    .el-pagination {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
    }
  }
}

/*对话框样式*/
</style>