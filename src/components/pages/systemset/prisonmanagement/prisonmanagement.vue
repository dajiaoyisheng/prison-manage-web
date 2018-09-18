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

      <div class="left-tree">
        <v-tree ref="leftTree" :tree-data="Prisonareatree" v-on:handle-node-click="handleNodeClick"></v-tree>
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
            <img :src="images.div" @click="draw('rect')" alt="矩形">
            <img :src="images.label" @click="draw('text')" alt="标签">
            <img :src="images.camera" @click="drawCamera()" alt="摄像头">
            <img :src="images.textA" id="strokeColor" alt="">
          </div>
        </div>
        <div class="aside-r-h-r fr text-center">
          <el-button class="search-btn" size="small">保存</el-button>
        </div>
      </div>

      <div class="main">
        <div class="l fl inbl">
          <div v-if="isDrawCamera">
            <p class="h-line">摄像头设置</p>
            <div class="camera-list">
                <span v-for="camera in cameraList">
                  <span class="icon">
                    <img :src="images.camera">
                  </span>
                  <span class="name" v-text="camera.name"></span>
                </span>
            </div>
          </div>
          <div ref="canvasContainer" class="actionImage">
              <!-- 画图区域 -->
              <div ref="canvas" id="canvas"></div>
          </div>
        </div>
        <div class="r fr inbl">
          <div class="t line-word" title="对象">
            <span></span>
            <v-tree ref="rightTree" :tree-data="PrisonareaObjtree" :default-expand-all="false" v-on:handle-node-click="handleObjectNodeClick"></v-tree>
          </div>

          <div class="d line-word" title="属性">
            <span></span>
            <p>
              <b>区域属性</b>
            </p>
            <p>
              <span>编码:</span>
              <span class="value" v-text="objectInfo.code"></span>
            </p>
            <p>
              <span>名称:</span>
              <span class="value" v-text="objectInfo.name"></span>
            </p>
            <p>
              <span>位置:</span>
              <span class="value" v-text="objectInfo.position"></span>
            </p>
            <p>
              <span>角度:</span>
              <span class="value"</span>
            </p>
            <p>
              <span>备注:</span>
              <span class="value"></span>
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
        cameraList: [
          { name: 'J1JSL02L01' },
          { name: 'J1JSL02L02' },
          { name: 'J1JSL02L03' },
          { name: 'J1JSL02L04' },
          { name: 'J1JSL02L05' },
          { name: 'J1JSL02L06' }
        ],
        isDrawCamera: false,
        backgroundImage: null,
        Prisonareatree: [],
        PrisonareaObjtree:[],
        objectInfo: {},//选中的父对象
        message: '监区管理'
      }
    },
    created: function () {
      var _this = this;
      // 犯人总数
      this.$ajxj.get('/getPrisonareatree')
        .then(function (res) {
          _this.Prisonareatree = _this.PrisonareaObjtree = res.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        });
    },
    methods: {
      handleNodeClick(data, checked, indeterminate) {
        this.PrisonareaObjtree = [data];
      },
      handleObjectNodeClick(data, checked, indeterminate) {
        this.objectInfo = data;
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
          var base64txt = _this.backgroundImage = event.target.result;
          _this.$refs.canvasContainer.style.backgroundImage = "url("+base64txt+")";;
        };
      },
      checkBackgroundImage() {
          this.$alert('请先导入平面图', {
            confirmButtonText: '确定',
            showClose: false
          });
      },
      draw(type) {
        if (this.backgroundImage !== null) {
          if (this.objectInfo.name) {
            this.shapeType = type;
            this.startDraw();
          } else {
            this.$alert('请在右侧选择一个对象', {
              confirmButtonText: '确定',
              showClose: false
            });
          }
        } else {
          this.checkBackgroundImage();
        }
      },
      drawCamera() {
        if (this.backgroundImage !== null) {
          this.isDrawCamera = true;
        } else {
          this.checkBackgroundImage();
        }
      },
      startDraw() {
        this.drawObj.setDrawState(true);
        this.drawObj.setShape(this.lineWidth, this.strokeStyle, this.shapeType);
        this.drawObj.showMask();
        this.drawObj.init();
      }
    },
    mounted() {
      let _this = this;
      var canvasContainerRect = this.$refs.canvasContainer.getBoundingClientRect();
      this.drawObj = new Draw('canvas', canvasContainerRect.width, canvasContainerRect.height, function(uuid) {
        let tree = _this.$refs.rightTree;
        let node = tree.getCurrentNode();
        let data = {
            label: '矩形',
            icon: 'el-icon-news',
            isWarning: false,
            type: 'custom',
            name: '矩形',
            position: '矩形',
            shapeId: uuid
        }
        tree.append(data, node);
      });
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

  .aside-l.fl.inbl {
    background: #FFFFFF;
  }

  .left-tree {
    margin-top: 20px;
  }

  .aside-l-h .l {
    width: 40%;
  }

  .aside-l-h .r {
    width: 57%;
  }

  .aside-l-h .l img {
    margin-right: 15px;
  }

  .aside-l-h .r img {
    margin-left: 12px;
  }

  .aside-r-h-l {
    margin-left: 47px;
    width: 66%;
  }

  .aside-r-h-l .l {
    width: 50%;
  }

  .aside-r-h-l .r {
    width: 50%;
  }

  .aside-r-h-l .l img {
    margin-right: 29px;
  }

  .aside-r-h-l .r img {
    margin-left: 20px;
  }

  .aside-r-h-r {
    margin-right: 34px;
  }

  .main {
    padding: 20px 2% 5%;
  }

  .main .actionImage {
    min-height: 500px;
    background: #fff;
    width: 100%;
    filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size:100% 100%;
    background-size:100% 100%;
  }

  .h-line {
    font-size: 14px;
    font-weight: 400;
    color: #59C4EE;
  }

  .h-line:after {
    width: 89%;
  }

  .camera-list {
    padding: 15px 0;
  }

  .camera-list > span {
    margin-right: 19px;
  }

  .camera-list > span > .name {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
  }

  .camera-list > span > .icon > img {
    width: 18px;
    height: 14px;
  }

  .main .l {
    width: 66%;
  }

  .main .r {
    width: 342px;
  }

  .main .r .t,
  .main .r .d {
    border: 1px solid #e0e3ec;
    padding: 37px 97px 31px 44px;
    color: #666666;
    font-size: 14px;
    font-weight: 400;
  }

  .main .r .t {
    margin-bottom: 30px;
  }

  .main .r .d p {
    margin-bottom: 10px;
  }

  .main .r .line-word > p > b {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
  }

  .main .r .line-word > p > .value {
    margin-left: 35px;
  }

</style>
