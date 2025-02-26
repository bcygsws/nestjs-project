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
        <el-button type="primary" size="small">
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
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改
            </el-button
            >
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button
            >
            <el-button
                size="small"
                type="primary"
                @click="handleDelete(scope.$index, scope.row)"
            >添加
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
  </div>
</template>

<script lang="ts" setup>
import {reactive, onMounted, ref} from "vue";
import {Search, Plus} from '@element-plus/icons-vue';
import {getListAPI} from "@/apis/table.ts";
import type {IList, IQuery, IData} from '@/apis/table.ts';
import formatDate from "../../utils/format.ts";


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

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
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
</style>