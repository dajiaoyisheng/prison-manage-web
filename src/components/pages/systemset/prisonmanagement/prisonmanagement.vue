<template>
  <div id="prisonmanagement">
    <!-- 左 -->
    <section class="aside-l fl inbl">

      <div class="h aside-l-h clearfix">
        <div class="l fl">
          <img :src="images.exportgroup" alt="">
          <img :src="images.importgroup" alt="">
        </div>
        <div class="r fr">
          <img :src="images.add" alt="">
          <img :src="images.edit" alt="">
          <img :src="images.del" alt="">
        </div>
      </div>

      <div>
        <v-tree :tree-data="Prisonareatree" v-on:handle-node-click="handleNodeClick"></v-tree>
      </div>
    </section>
    <!-- 中 -->
    <section class="aside-r fr inbl">
      <div class="h clearfix">
        <div class="aside-r-h-l fl inbl clearfix">
          <div class="l fl">
            <img :src="images.exportgroup" alt="导出">
            <el-upload style="display: inline-block;" ref="upload" action="" :on-change="handleFileListChange" :file-list="fileList" :auto-upload="false" :show-file-list="false">
              <img :src="images.importgroup" alt="导入平面图">
            </el-upload>
            <img :src="images.save" alt="">
          </div>
          <div class="r fr clearfix">
            <img :src="images.del" alt="">
            <img :src="images.cancel" alt="">
            <img :src="images.renew" alt="">
            <img :src="images.div" @click="draw()" alt="">
            <img :src="images.label" alt="">
            <img :src="images.camera" alt="">
            <img :src="images.textA" id="strokeColor" alt="">
          </div>
        </div>
        <div class="aside-r-h-r fr text-center">
          <el-button class="search-btn" size="small">保存</el-button>
        </div>
      </div>


      <div class="main">
        <div class="l fl inbl">
          <p class="h-line">摄像头设置</p>
          <div>
              <!-- 摄像头 -->
              摄像头1
          </div>
          <div ref="canvasContainer" class="actionImage">
              <!-- 画图区域 -->
              <canvas ref="canvas" id="canvas"></canvas>
          </div>
        </div>
        <div class="r fr inbl">
          <div class="t line-word" title="对象">
            <span></span>
            <v-tree :tree-data="PrisonareaObjtree" v-on:handle-node-click="handleNodeClick"></v-tree>
          </div>

          <div class="d line-word" title="属性">
            <span></span>
            <p>
              <b>区域属性</b>
            </p>
            <p>
              <span>编码:</span>
            </p>
            <p>
              <span>名称:</span>
            </p>
            <p>
              <span>位置:</span>
            </p>
            <p>
              <span>角度:</span>
            </p>
            <p>
              <span>备注:</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import vTree from '@/components/commons/tree.vue';

  import add from '@/assets/add.png';
  import del from '@/assets/del-g.png';
  import edit from '@/assets/edit-g.png';
  import save from '@/assets/save.png';
  import cancel from '@/assets/cancel.png';
  import renew from '@/assets/renew.png';
  import div from '@/assets/div.png';
  import label from '@/assets/label.png';
  import camera from '@/assets/camera.png';
  import review from '@/assets/review.png';
  import textA from '@/assets/text-a.png';
  import exportgroup from '@/assets/exportgroup.png';
  import importgroup from '@/assets/importgroup.png';

  import Draw from '@/draw/action';

  export default {
    components: {
      vTree
    },
    data() {
      return {
        images: {
          add: add,
          del: del,
          edit: edit,
          save: save,
          cancel: cancel,
          renew: renew,
          div: div,
          label: label,
          camera: camera,
          review: review,
          textA: textA,
          exportgroup: exportgroup,
          importgroup: importgroup
        },
        drawObj: null,
        lineWidth: 1,
        strokeStyle: "#ff0000",
        shapeType: "rect",
        fileList: [],
        Prisonareatree: [],
        PrisonareaObjtree:[{
          id: 1,
          label: '杭州某某监狱',
          icon: 'el-icon-menu'
        }],
        message: '监区管理'
      }
    },
    created: function () {
      var _this = this;
      // 犯人总数
      this.$ajxj.get('/getPrisonareatree')
        .then(function (res) {
          _this.Prisonareatree = res.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    methods: {
      handleNodeClick(data, checked, indeterminate) {
        console.log(checked);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleFileListChange(file, fileList) {
        let _this = this;
        //创建一个reader
        let reader = new FileReader();
        //将图片转成base64格式
        reader.readAsDataURL(file.raw);
        reader.onload = function (event) {
          var base64txt = event.target.result;
          _this.$refs.canvasContainer.style.backgroundImage = "url("+base64txt+")";;
        };

      },
      draw() {
        this.startDraw();
      },
      startDraw() {
        this.drawObj.setDrawState(true);
        this.drawObj.setShape(this.lineWidth, this.strokeStyle, this.shapeType);
        this.drawObj.init();
      }
    },
    mounted() {
      var canvasContainerRect = this.$refs.canvasContainer.getBoundingClientRect();
      this.$refs.canvas.width = canvasContainerRect.width;
      this.$refs.canvas.height = canvasContainerRect.height;
      this.drawObj = new Draw('canvas');
    }
  }

</script>

<style scoped>
  .h {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e0e3ec;
  }

  img {
    cursor: pointer;
  }

  .aside-l {
    width: 18%;
  }

  .aside-r {
    width: 82%;
  }

  .aside-l-h {
    padding: 0 10%;
    border-right: 1px solid #e0e3ec;
  }

  .aside-l-h .l {
    width: 40%;
  }

  .aside-l-h .r {
    width: 57%;
  }

  .aside-l-h .l img {
    margin-right: 20%;
  }

  .aside-l-h .r img {
    margin-left: 16%;
  }

  .aside-r-h-l {
    padding-left: 2%;
    width: 66%;
  }

  .aside-r-h-l .l {
    width: 50%;
  }

  .aside-r-h-l .r {
    width: 50%;
  }

  .aside-r-h-l .l img {
    margin-right: 2%;
  }

  .aside-r-h-l .r img {
    margin-left: 2%;
  }

  .aside-r-h-r {
    width: 29%;
    padding-right: 2%;
  }

  .main {
    padding: 20px 2% 5%;
  }

  .main .actionImage {
    min-height: 500px;
    background: #fff;
    width: 100%;
  }

  .h-line:after {
    width: 89%;
  }

  .main .l {
    /* padding: 10px 2%; */
    width: 66%;
  }

  .main .r {
    width: 28%;
  }

  .main .r .t,
  .main .r .d {
    border: 1px solid #e0e3ec;
    /* width: 100%; */
    padding: 15px 17%;
  }

  .main .r .t {
    margin-bottom: 30px;
  }

  .main .r .d p {
    margin-bottom: 10px;
  }

</style>
