webpackJsonp([8],{"82Sr":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("BO1k"),i=a.n(n),s=a("mvHQ"),r=a.n(s),o=(a("wa1j"),a("zeeE")),c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"showVideo"}},[t("iframe",{staticStyle:{height:"370px",width:"750px"},attrs:{src:"./ws_rtsp/rtspPlay.jsp?id="+this.cameraId}})])},staticRenderFns:[]},l={components:{cameraVideo:a("VU/8")({props:["cameraId"]},c,!1,null,null,null).exports,tablePagination:o.a},data:function(){return{cameraId:null,isShowVideo:!1,count:0,prisonSubRegions:[],cameraTypes:[],cameraList:[],current:null,currentIndex:"",paramsPaiCode:[],savePaiCodeTable:[],paiCodeTable:[],changeRow:[],tempSaveData:{},tempRow:[],vals:[],params:{paiCode:"",ciType:"",ciName:"",nodeType:""}}},mounted:function(){this.getPrisonSubRegions(),this.getCameraTypes(),this.getCameraList()},methods:{getPrisonSubRegions:function(){var e=this;this.$get(this.urlconfig.cmGetPrisonSubRegions).then(function(t){e.prisonSubRegions=t.data}).catch(function(e){}).then(function(){})},getCameraTypes:function(){var e=this;this.$get(this.urlconfig.cmGetCameraTypes).then(function(t){e.cameraTypes=t.data}).catch(function(e){}).then(function(){})},getCameraList:function(){var e=this,t={pageIndex:this.$refs.pagination.index,pageSize:this.$refs.pagination.limit,params:r()(this.params)};this.$post(this.urlconfig.cmGetCameraList,t).then(function(t){e.count=t.data.totalRows,e.cameraList=t.data.items}).catch(function(e){}).then(function(){})},saveCameraInfo:function(){var e=this.changeRow;this.$post(this.urlconfig.cmSaveCameraInfo,e).then(function(e){alert("保存成功")}).catch(function(e){}).then(function(){})},showVideo:function(e,t){this.cameraId=t.ciId,this.isShowVideo=!0},beforeClose:function(){this.cameraId=null,this.isShowVideo=!1},changePaiPathFilter:function(e){var t=this;this.params.paiCode=e[e.length-1];this.getCascaderObj(e,this.prisonSubRegions).map(function(e){t.params.nodeType=e.nodeType})},changePaiCode:function(e,t){this.current=e,this.currentIndex=e,this.tempRow=t},changePaiPathTable:function(e){var t=this,a=[];this.getCascaderObj(e,this.prisonSubRegions).map(function(e){a.push(e.label)}),this.cameraList.forEach(function(e){t.tempRow.ciId===e.ciId&&(e.paiPath=a.join("/"))}),this.tempSaveData={},this.tempSaveData={ciId:this.tempRow.ciId,paiCode:this.tempRow.paiCode};var n=this.changeRow.findIndex(function(e){return e.ciId===t.tempRow.ciId});n>-1?this.changeRow[n]=this.tempSaveData:this.changeRow.push(this.tempSaveData)},getCascaderObj:function(e,t){return e.map(function(e){var a=!0,n=!1,s=void 0;try{for(var r,o=i()(t);!(a=(r=o.next()).done);a=!0){var c=r.value;if(c.value==e)return t=c.children,c}}catch(e){n=!0,s=e}finally{try{!a&&o.return&&o.return()}finally{if(n)throw s}}return null})}},watch:{savePaiCodeTable:function(e,t){var a=this;this.prisonSubRegions.map(function(t,n){e===t.value&&(a.cameraList[a.currentIndex].paiCode=t.label)}),this.currentIndex=null}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"cameramanager"}},[a("p",{staticClass:"contentInfo"},[e._v("摄像头列表")]),e._v(" "),a("section",{staticClass:"contentMain"},[a("section",{staticClass:"puu-params"},[a("el-row",[a("el-col",{attrs:{span:7}},[a("span",[e._v("所在区域:")]),e._v(" "),a("el-cascader",{attrs:{size:"small","change-on-select":"",placeholder:"请选择",options:e.prisonSubRegions},on:{change:e.changePaiPathFilter},model:{value:e.paramsPaiCode,callback:function(t){e.paramsPaiCode=t},expression:"paramsPaiCode"}})],1),e._v(" "),a("el-col",{attrs:{span:7}},[a("span",[e._v("摄像头类型:")]),e._v(" "),a("el-select",{attrs:{size:"small",placeholder:"请选择"},model:{value:e.params.ciType,callback:function(t){e.$set(e.params,"ciType",t)},expression:"params.ciType"}},e._l(e.cameraTypes,function(e){return a("el-option",{key:e.sCode,attrs:{label:e.sName,value:e.sCode}})}))],1),e._v(" "),a("el-col",{attrs:{span:7}},[a("span",[e._v("摄像头编号/名称:")]),e._v(" "),a("el-input",{staticClass:"pp-input",attrs:{size:"small",placeholder:"请输入摄像头编号或名称",clearable:""},model:{value:e.params.ciName,callback:function(t){e.$set(e.params,"ciName",t)},expression:"params.ciName"}})],1),e._v(" "),a("el-col",{attrs:{span:3}},[a("el-button",{staticClass:"search-btn",attrs:{type:"primary",size:"small"},on:{click:e.getCameraList}},[e._v("查询")]),e._v(" "),a("el-button",{staticClass:"search-btn",attrs:{type:"primary",size:"small"},on:{click:e.saveCameraInfo}},[e._v("保存")])],1)],1)],1),e._v(" "),a("section",[a("el-dialog",{attrs:{title:"实时视频",visible:e.isShowVideo,width:"800px","before-close":e.beforeClose},on:{"update:visible":function(t){e.isShowVideo=t}}},[a("cameraVideo",{attrs:{cameraId:e.cameraId}})],1)],1),e._v(" "),a("section",{staticClass:"el-table-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.cameraList,stripe:""}},[a("el-table-column",{attrs:{prop:"paiPath",label:"所在区域","min-width":"200px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{on:{click:function(a){e.changePaiCode(t.$index,t.row)}}},[a("el-cascader",{directives:[{name:"show",rawName:"v-show",value:e.current===t.$index,expression:"current === scope.$index"}],attrs:{"change-on-select":!0,placeholder:"请选择",options:e.prisonSubRegions},on:{blur:function(t){e.current=null},change:e.changePaiPathTable},model:{value:e.paiCodeTable,callback:function(t){e.paiCodeTable=t},expression:"paiCodeTable"}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.current!==t.$index,expression:"current !== scope.$index"}]},[e._v(e._s(t.row.paiPath))])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"ciId",label:"摄像头编号","min-width":"80px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ciName",label:"摄像头名称","min-width":"80px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ciType",label:"摄像头类型","min-width":"140px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ciNearid",label:"相邻摄像头","min-width":"140px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"realtimeUri",label:"实时视频服务地址","min-width":"140px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"replayUri",label:"回放视频服务地址","min-width":"140px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"ciMemo",label:"备注","min-width":"120px",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right",width:"120px",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},nativeOn:{click:function(a){a.preventDefault(),e.showVideo(t.$index,t.row)}}},[e._v("实时视频")])]}}])})],1),e._v(" "),a("div",{staticClass:"el-pagination-wrap"},[a("table-pagination",{ref:"pagination",attrs:{total:e.count},on:{change:e.getCameraList}})],1)],1)])])},staticRenderFns:[]};var u=a("VU/8")(l,p,!1,function(e){a("rlLJ")},"data-v-0076a0da",null);t.default=u.exports},BO1k:function(e,t,a){e.exports={default:a("fxRn"),__esModule:!0}},fxRn:function(e,t,a){a("+tPU"),a("zQR9"),e.exports=a("g8Ux")},g8Ux:function(e,t,a){var n=a("77Pl"),i=a("3fs2");e.exports=a("FeBl").getIterator=function(e){var t=i(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return n(t.call(e))}},rlLJ:function(e,t){}});
//# sourceMappingURL=8.329b89266cdbd61f6f60.js.map