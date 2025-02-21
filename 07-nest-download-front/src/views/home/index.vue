<!--
*@name: HomeView
*@author: Bao Chengyi
*@date: 2025/2/20 1:58
-->
<template>
  <div class="home-container">
    <!--上传图片-->
    <div class="upload">
      <div class="title">上传图片</div>
      <!--/api前端跨域-->
      <el-upload
          ref="upload"
          class="upload-demo"
          action="/api/upload"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary" style="margin-right:20px">选择图片</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
          上传到服务器
        </el-button>
        <template #tip>
          <div class="el-upload__tip text-red">
            限制为1个文件，旧文件会被新文件覆盖
          </div>
        </template>
      </el-upload>
    </div>
    <!--下载图片-->
    <div class="download">
      <el-button plain @click="downloadImg">下载图片：传统方式</el-button>
      <el-button type="primary" plain @click="downloadStream">下载图片：压缩图片方式</el-button>

    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {genFileId} from 'element-plus';
import type {UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {downloadImgAPI, downloadStreamAPI} from "@/apis/image.ts";

const upload = ref<UploadInstance>();

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
}

const submitUpload = () => {
  console.log("upload.value===", upload.value);
  upload.value!.submit();
}

/**
 * @desc：前端接收文件后，下载
 * 传统方式：后端res.download()
 * 参考文档：https://juejin.cn/post/7442284498740527114
 *
 *
 * */
const downloadImg = async () => {
  const res = await downloadImgAPI();
  console.log("downloadImg", res);
  console.log("downloadImg data", res.data);
  const blob = new Blob([res.data]);
  // 数据请求完成后，转化为blob
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.target = '_blank';// 表示下载的图片在新窗口中打开
  // 必须设置download属性，否则会下载失败
  link.setAttribute('download', Date.now() + '.jpg');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);// 下载完成后，移除标签元素a
  window.URL.revokeObjectURL(url);// revoke撤销、废除、使无效
}

/**
 * @desc:downloadStream方法
 *
 * */
const downloadStream = async () => {
  const res = await downloadStreamAPI();
  console.log("res=======", res);
  const link = document.createElement('a');
  const url = window.URL.createObjectURL(new Blob([res.data]));
  console.log("url=======", url);
  link.href = url;
  link.download = "BaoChengyi.zip";
  document.body.appendChild(link);// 添加到文档中
  link.click();// 模拟点击下载
  document.body.removeChild(link);// 下载完成后，移除标签元素a
  window.URL.revokeObjectURL(url);// 下载完成后释放blob url


}
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .upload {
    width: 100%;
    height: 240px;
    background-color: pink;
    padding: 20px;
    box-sizing: border-box;

    .title {
      font-size: 20px;
      color: #1a1a1a;
      text-align: center;
      padding: 20px 0;
    }

    .upload-demo {
      width: 240px;
      margin: 0 auto;

      > .el-upload {
        margin-right: 50px;
      }
    }


  }

  .download {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
  }
}

</style>