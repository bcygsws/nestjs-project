<!--
*@name: StreamImage
*@author: Bao Chengyi
*@date: 2024/8/25 4:12
-->
<template>
  <!--上传图片模块-->
  <div class="action-container">
    <div class="upload-action">
      <h4>上传图片</h4>
      <el-upload
          action="/api/upload/album"
          list-type="picture-card"
          :auto-upload="false"
          :on-success="handleSuccess"
          v-model:file-list="fileList"
      >
        <el-icon>
          <Plus/>
        </el-icon>

        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
            <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
          >
            <el-icon><Download/></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete/></el-icon>
          </span>
        </span>
          </div>
        </template>
      </el-upload>
      <!--上传图片模块-提交到后端-->
      <el-button @click="submitImage">提交</el-button>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image"/>
      </el-dialog>
    </div>
    <!--下载图片模块-->
    <div class="download-action">
      <h4>下载图片</h4>
    </div>
  </div>


  <button @click="download">下载</button>
  <hr/>
  <img :src="base64Image" v-if="flag" width="100" height="100" alt=""/>
</template>
<script lang="ts" setup>
// 定义前端接收流的方法
import {getImgStreamAPI, uploadSinImgAPI} from "@/apis/dashboard";
import {onMounted, ref} from "vue";
// 设置base64图片的源
const base64Image = ref('');
import {Delete, Download, Plus, ZoomIn} from '@element-plus/icons-vue'

import type {UploadFile} from 'element-plus'

// 定义上传图片信息的数组,双向绑定
const fileList = ref([]);
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

/**
 * @name:submitImage
 * @description:图片上传后，点击按钮-提交，事件处理
 *
 * */
const submitImage = async () => {
  console.log(fileList.value);
  // 封装form-data
  const data = new FormData()
  console.log('test',data);
  fileList.value.forEach((item: any) => {
    // files名称与后端文件拦截器FilesInterceptor中保持一致

    data.append('files', item.raw);
  });
  console.log(data);
// 提交后端的请求
  const res = await uploadSinImgAPI(data);
  console.log(res);
}

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}


//下载文件有以下两种方式：
// 一、apis文件中，使用axios,定义请求流文件的方法：new Blob([res.data])
const getStreamImage = async (url: string) => {
  // axios返回arrayBuffer或者blog,fetch也是一样
  const res = await getImgStreamAPI(url);
  console.log(res);
  // 将res.data 传入blob,生成url链接
  const blob = new Blob([res.data], {
    // type:'image/jpg'
  });
  // 生成一个url链接,定义名称为my_url
  let my_url: string;
  my_url = URL.createObjectURL(blob);
  // 下载文件设置，对应的是工具栏中的下载按钮
  const a = document.createElement('a');
  a.href = my_url;
  a.download = "xiaoMan.zip";
  a.click();


}

// 2.apis文件中，使用fetch方式时，不需要res.data了，await的结果直接就是arrayBuffer了
// const getStreamImage = async (url: string) => {
//   // axios返回arrayBuffer或者blog,fetch也是一样
//   const res = await getImgStreamAPI(url);
//   console.log(res);
//   // 将res.data 传入blob,生成url链接
//   const blob = new Blob([res], {
//     // type:'image/png'
//   });
//   // 生成一个url链接,定义名称为my_url
//   let my_url: string;
//   my_url = URL.createObjectURL(blob);
//   // const btn = document.getElementById('btn');
//   // 下载文件设置，对应的是工具栏中的下载按钮
//   const a = document.createElement('a');
//   a.href = my_url;
//   a.download = "xiaoMan.zip";
//   a.click();
//
//
// }


// 测试下载图片接口是否调用
// 接口请求成功
onMounted(() => {
  // showImage("/api/upload/stream");
});
/**
 * @现在如何把这个流文件，转成图片呢？
 * 参考文档：
 * https://segmentfault.com/q/1010000044660400
 *
 *
 *
 * */
// 定义一个状态量flag,表示数据是否请求完成
const flag = ref(false);
const showImage = async (url: string) => {
  // axios返回arrayBuffer或者blog,fetch也是一样
  const res = await getImgStreamAPI(url);
  // console.log(res);
  const {data, headers} = res;
  flag.value = true;
  // 1.将返回的arrayBuffer收集到
  const array = data;
  console.log(array);
  // 根据arrayBuffer的不同类型做处理
  let img_url = '';
  if (array instanceof Blob) {
    img_url = window.URL.createObjectURL(array);
    base64Image.value = img_url;
  } else if (array instanceof ArrayBuffer) {
    const unit8Array = new Uint8Array(array);
    const blob = new Blob([unit8Array], {type: 'image/jpeg'});
    console.log(blob);
    img_url = window.URL.createObjectURL(blob);
    base64Image.value = img_url;
  } else {
    console.error('Invalid response data type!');
  }
}


// button标签子元素a的点击事件
const download = () => {
  getStreamImage("/api/upload/stream");
}
/**
 * @name:handleSuccess
 * @description:文件上传成功时的钩子
 * */
const handleSuccess = (uploadFile: any, uploadFiles: any) => {
  console.log('我执行了吗');
  console.log(uploadFile);
}


</script>

<style lang="scss" scoped>
.action-container {
  width: 1200px;
  background-color: #eeeeee;
  margin: 0 auto;

  h4 {
    text-align: center;
  }

  .upload-action {
    padding: 10px;
  }
}

</style>