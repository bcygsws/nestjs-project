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
      <el-table :data="tableData" style="width: 100%" border stripe>
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
            <el-popover effect="light" trigger="hover" placement="top" width="auto">
              <template #default>
                <div>name: {{ scope.row.name }}</div>
                <div>address: {{ scope.row.address }}</div>
              </template>
              <template #reference>
                <el-tag>{{ scope.row.name }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="editUser(scope.$index, scope.row)"
            >修改
            </el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="delUser(scope.$index, scope.row)"
            >删除
            </el-button
            >
            <el-button
                size="small"
                type="primary"
                @click="changeTags(scope.$index, scope.row)"
            >标签
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
        @handleDialogForm="handleDialogForm"
    />
  </div>
  <!--修改标签tag的对话框-->
  <TagDialog
      :isTagShow="isTagShow"
      :tagForm="tagForm"
      @handleTag="handleTag"
      @handleDialogForm1="handleDialogForm1"
  />
</template>

<script lang="ts" setup>
import {reactive, onMounted, ref} from "vue";
import {Search, Plus} from '@element-plus/icons-vue';
import {getListAPI} from "@/apis/table.ts";
import type {IList, IQuery, IData} from '@/apis/table.ts';
import formatDate from "../../utils/format.ts";
import FormDialog from "@/components/FormDialog.vue";
import TagDialog from "@/components/TagDialog.vue";

// 添加/修改对话框的显示或隐藏
const visible = ref(false);

// 标签对话框
const isTagShow = ref(false);
// 维护是添加数据还是修改数据
const flag = ref(false);

const form = reactive({
  name: '',
  desc: '',
});
const tagForm=ref([]);


// 主要参数page当前页码、pageSize每页容量、total总数、keywords关键字
const info = reactive<IQuery>({
  page: 1,
  pageSize: 5,
  total: 0,
  keywords: ""
});

// tableData数据源
const tableData = ref<IList[]>([]);

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

interface User {
  date: string
  name: string
  address: string
}

/**
 * @desc:handleEdit()方法
 * 修改数据
 *
 *
 **/
const editUser = (index: number, row: User) => {
  console.log(index, row);
  visible.value = true;
  flag.value = false;
}
const delUser = (index: number, row: User) => {
  console.log(index, row)
}
/**
 * @desc:修改标签方法changeTags
 *
 * */
const changeTags = (index: number, row: User) => {
  console.log(index, row);
  isTagShow.value = true;
}
/**
 * @desc:handleTag()方法
 * 修改当前行的标签
 *
 * */
const handleTag = (val: any) => {
  console.log("val====标签数据", val);
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
 * @desc:添加数据addUser
 *
 * */
const addUser = () => {
  visible.value = true;
  flag.value = true;

}
/**
 * @desc:handleSub()方法
 * 接收子组件修改或添加后的表单数据
 *
 * */
const handleSub = (val: any) => {
  console.log("val ====", val);
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
const handleDialogForm1 = (val: any) => {
  isTagShow.value = val;
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