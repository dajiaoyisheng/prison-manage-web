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
            <img :src="images.exportgroup" title="导出">
            <el-upload style="display: inline-block;" ref="upload" action="" :on-change="handleFileListChange"
              :file-list="fileList" :auto-upload="false" :show-file-list="false" title="导入平面图">
              <img :src="images.importgroup">
            </el-upload>
            <img :src="images.save" title="保存">
          </div>
          <div class="r fr clearfix">
            <img :src="images.del" title="删除">
            <img :src="images.cancel" title="撤销" @click="cUndo()">
            <img :src="images.renew" title="重做" @click="cRedo()">
            <img :src="images.div" @click="draw('rect')" title="矩形">
            <img :src="images.polygon" title="多边形">
            <img :src="images.label" @click="draw('text')" title="标签">
            <img :src="images.camera" @click="drawCamera()" title="摄像头">
            <img :src="images.textA" id="strokeColor" title="文本颜色">
          </div>
        </div>
        <div class="aside-r-h-r fr text-center">
          <el-button class="search-btn" size="small">保存</el-button>
        </div>
      </div>

      <div class="main">
        <div class="l fl inbl">
          <div ref="canvasContainer" class="actionImage">
            <!-- 画图区域 -->
            <div ref="canvas" id="canvas"></div>
          </div>
        </div>
        <div class="r fr inbl">
          <div class="t line-word" title="对象">
            <span></span>
            <v-tree ref="rightTree" 
             :draggable="true" 
             :tree-data="PrisonareaObjtree" 
             :default-expand-all="true" 
             v-on:handle-node-click="handleObjectNodeClick" 
             v-on:handle-drag-start="handleDragStart"
             v-on:handle-drag-end="handleDragEnd">
            </v-tree>
          </div>

          <div class="d line-word" title="属性">
            <span></span>
            <p>
              <b>区域属性</b>
            </p>
            <p>
              <span>编码:</span>
              <span class="value" v-text="objectInfo.pri_code"></span>
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
              <span class="value"></span>
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
  import polygon from '@/assets/polygon.png';
  import label from '@/assets/label.png';
  import camera from '@/assets/camera.png';
  import camera0 from '@/assets/camera0.png';
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
          polygon: polygon,
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
        isDrawCamera: false,
        backgroundImage: null,
        Prisonareatree: [],
        PrisonareaObjtree: [],
        objectInfo: {}, //选中的父对象
        message: '监区管理',
        cameraImg: new Image(),
        startDragNode: false,//是否拖动节点
        draggingNode: null,//被拖动的节点
        mouseOveredGraph: null,//鼠标移动到图形上的uuid
        relationships: {},//存储对象和图形的关系
      }
    },
    created: function () {
      // 加载监狱树
      this.$get('/getPrisonareatree')
        .then(res=> {
          if(res.status === 0){
            this.Prisonareatree = res.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    },
    methods: {
      //拖拽节点开始
      handleDragStart(node, ev) {
        this.startDragNode = true;
      },
      //拖拽节点结束
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        //拖拽的对象
        this.draggingNode = draggingNode;
      },
      //点击左侧树节点
      handleNodeClick(data, checked, indeterminate) {
        this.PrisonareaObjtree = [data];
      },
      //点击右侧树节点
      handleObjectNodeClick(data, checked, indeterminate) {
        this.objectInfo = data;
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      setNodeRelationed(nodes, pri_code) {
        let _this = this;
        for (let i = 0;i < nodes.length; i++) {
          let element = nodes[i];
          if (element.pri_code == pri_code) {
            element['relationed'] = 'relationed';
          }
          if (element.children) {
            _this.setNodeRelationed(element.children, pri_code);
          }
        }
      },
      deleteNodeRelationed(nodes, pri_code) {
        let _this = this;
        for (let i = 0;i < nodes.length; i++) {
          let element = nodes[i];
          if (element.pri_code == pri_code) {
            delete element['relationed'];
          }
          if (element.children) {
            _this.deleteNodeRelationed(element.children, pri_code);
          }
        }
      },
      handleFileListChange(file, fileList) {
        let _this = this;
        //创建一个reader
        let reader = new FileReader();
        //将图片转成base64格式
        reader.readAsDataURL(file.raw);
        reader.onload = function (event) {
          var base64txt = _this.backgroundImage = event.target.result;
          _this.$refs.canvasContainer.style.backgroundImage = "url(" + base64txt + ")";;
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
          this.shapeType = type;
          this.startDraw();
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
        // this.drawObj.cPush();
        this.drawObj.setDrawState(true);
        this.drawObj.setImage(this.cameraImg);
        this.drawObj.setShape(this.lineWidth, this.strokeStyle, this.shapeType);
        // this.drawObj.showMask();
        this.drawObj.init();
      },
      //重做
      cUndo() {
        this.drawObj.cUndo();
      },
      //撤销
      cRedo() {
        this.drawObj.cRedo();
      }
    },
    mounted() {
      let _this = this;
      var canvasContainerRect = this.$refs.canvasContainer.getBoundingClientRect();
      this.drawObj = new Draw('canvas', canvasContainerRect.width, canvasContainerRect.height, function() {
        console.log(this.getAttr('uuid'));
      }, function(evt) {
        //如果是监区对象拖拽的情况下设置图形和对象的关系
        if (_this.startDragNode) {
          let uuid = this.getAttr('uuid');
          _this.startDragNode = false;
          _this.mouseOveredGraph = uuid;
          if (_this.relationships[uuid] == undefined) {
            _this.relationships[uuid] = _this.draggingNode;
            _this.$message({
              type: 'success',
              message: '关联成功!'
            });
          } else {
            _this.$confirm('当前区域已经和图形关联，当前操作会替换已有关联关系，是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let pri_code = _this.relationships[uuid]["data"]["pri_code"];
              _this.deleteNodeRelationed(_this.PrisonareaObjtree, pri_code);
              _this.PrisonareaObjtree = JSON.parse(JSON.stringify(_this.PrisonareaObjtree));
              _this.relationships[uuid] = _this.draggingNode;
              _this.$message({
                type: 'success',
                message: '关联成功!'
              });
            }).catch(() => {
              _this.$message({
                type: 'info',
                message: '已取消操作'
              });          
            });
          }


          let clientRect = this.getClientRect();
          
          let pri_name = _this.draggingNode.data.name;
          _this.drawObj.addText(pri_name, uuid, clientRect.x, clientRect.y, canvasContainerRect.top, canvasContainerRect.left);
          //设置当前节点数据
          let pri_code = _this.draggingNode.data.pri_code;
          _this.setNodeRelationed(_this.PrisonareaObjtree, pri_code);
          _this.PrisonareaObjtree = JSON.parse(JSON.stringify(_this.PrisonareaObjtree));
        }
      });
      this.cameraImg.src = camera0;
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

  .aside-r-h-l .l img,
  .aside-r-h-l .r img {
    width: 15px;
    height: 15px;
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
    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
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

  .camera-list>span {
    margin-right: 19px;
  }

  .camera-list>span>.name {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
  }

  .camera-list>span>.icon>img {
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

  .main .r .line-word>p>b {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
  }

  .main .r .line-word>p>.value {
    margin-left: 35px;
  }

</style>
