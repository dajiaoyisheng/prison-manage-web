webpackJsonp([7],{"0Tre":function(t,e){t.exports="data:image/gif;base64,R0lGODlhBQAsALMAAFNzmsfa8pOYm7vQ66/G4qS926C41sfa8////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAFACwAAAQzUEgZBinmWKxv3p/XceAYkmKppizKISKCvHImy8cN5AhgAxxA60Q0GVeuIlI5PDZBE0kEADs="},mGbH:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mvHQ"),n=a.n(i),s=a("0Tre"),l=a.n(s),o=a("oXX7"),r=a.n(o),c=a("wa1j"),d=a.n(c),p=a("QcOD"),A=a.n(p),h={data:function(){return{message:"人员点名",pnAside:!0,pnMainAside:!1,pnAsideLeft:250,pnMainAsideLeft:257,images:{left:l.a,right:r.a,video:d.a,warning:A.a},bottomPagination:{pageSize:10,currentPage:1,totalRows:100},parameter:{keyword:"",nodeType:"",nodeId:""},treeData:[],topTableData:[],bottomTableData:[],cameras:[],timmer:null}},methods:{getPrisonareatree:function(){var t=this,e=this.$store.state.env+"/prisonRegion.action?method=getPrisonRegionTree";this.$get(e).then(function(e){t.treeData=e.data}).catch(function(t){}).then(function(){})},getTabledatas:function(){var t=this,e={parameter:n()(this.parameter)},a=this.$store.state.env+"/pointName.action?method=getPointNameDatas";this.$post(a,e).then(function(e){t.topTableData=e.data.unidentified,t.bottomTableData=e.data.identified}).catch(function(t){}).then(function(){})},handleNodeClick:function(t){this.parameter.nodeType=t.nodeType,this.parameter.nodeId=t.id,this.getTabledatas()},doQuery:function(){this.getTabledatas()},showVideo:function(t,e,a){this.pnAside=!1,this.pnAsideLeft=0,this.pnMainAsideLeft=7,this.pnMainAside=!0,this.cameras=a.cameras},closeVideo:function(){this.pnAside=!0,this.pnAsideLeft=250,this.pnMainAsideLeft=257,this.pnMainAside=!1},initSetInterval:function(){var t=this;this.timmer=setInterval(function(){t.getTabledatas()},5e3)}},mounted:function(){this.getPrisonareatree(),this.getTabledatas(),this.initSetInterval()},beforeDestroy:function(){null!=this.timmer&&(clearInterval(this.timmer),this.timmer=null)},components:{tablePagination:a("zeeE").a}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"pointname"}},[t.pnAside?a("section",{staticClass:"pn-left"},[a("el-tree",{attrs:{data:t.treeData,"node-key":"id","default-expand-all":"","expand-on-click-node":!1,"highlight-current":"true"},on:{"node-click":t.handleNodeClick},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.node,n=e.data;return a("span",{staticClass:"custom-tree-node"},[0==n.isWarning?a("span",[a("i",{class:i.icon}),t._v(t._s(i.label))]):t._e(),t._v(" "),1==n.isWarning?a("span",[a("i",[a("img",{attrs:{src:t.images.warning}})]),t._v(t._s(i.label))]):t._e()])}}])})],1):t._e(),t._v(" "),a("section",{staticClass:"pn-right",class:{"pn-right-show":!t.pnAside,"pn-right-hidden":t.pnAside}},[a("section",{staticClass:"pn-right-header"},[a("span",{staticStyle:{"font-size":"14px"}},[t._v("服刑人员:")]),t._v(" "),a("el-input",{staticClass:"pn-right-header-input",attrs:{size:"small",placeholder:"请输入服刑人员姓名或编号",clearable:""},model:{value:t.parameter.keyword,callback:function(e){t.$set(t.parameter,"keyword",e)},expression:"parameter.keyword"}}),t._v(" "),a("el-button",{staticClass:"search-btn",attrs:{size:"mini"},on:{click:function(e){t.doQuery()}}},[t._v("查询")])],1),t._v(" "),a("section",{staticClass:"pn-right-main",style:{left:t.pnMainAsideLeft+"px"}},[a("el-container",[a("el-main",{staticClass:"pn-right-main-main"},[a("section",{staticClass:"pn-right-main-main-top"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"pn-card-label",attrs:{slot:"header"},slot:"header"},[t._v("未识别人员列表("),a("span",{staticStyle:{color:"red"}},[t._v(t._s(t.topTableData.length)+"人")]),t._v(")")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.topTableData,stripe:"",height:"269"}},[a("el-table-column",{attrs:{prop:"criCode",label:"编号","min-width":"100px",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"criName",label:"姓名","min-width":"100px",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"warningType",label:"预警事件类型","min-width":"120px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"paiCode",label:"最后一次被定位区域","min-width":"230px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpcLoctime",label:"最后一次被定位时间","min-width":"200px"}}),t._v(" "),a("el-table-column",{attrs:{label:"视频",width:"100px",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"btn",attrs:{type:"text"},on:{click:function(a){t.showVideo("topTableData",e.$index,e.row)}}},[a("img",{staticStyle:{display:"inline-block","line-height":"20px","vertical-align":"middle"},attrs:{src:t.images.video}}),t._v(" "),a("span",{staticStyle:{display:"inline-block","line-height":"20px","vertical-align":"middle"}},[t._v("查看")])])]}}])})],1)],1)],1),t._v(" "),a("section",{staticClass:"pn-main-main-bottom"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"pn-card-label",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("已识别人员列表("+t._s(t.bottomTableData.length)+"人)")])]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.bottomTableData,stripe:"",height:"390"}},[a("el-table-column",{attrs:{prop:"criCode",label:"编号","min-width":"100px",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"criName",label:"姓名","min-width":"100px",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"paiCode",label:"当前区域","min-width":"230px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpcLoctime",label:"识别时间","min-width":"200px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpoLoctype",label:"识别方法","min-width":"100px"}}),t._v(" "),a("el-table-column",{attrs:{label:"视频",width:"100px",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"btn",attrs:{type:"text"},on:{click:function(a){t.showVideo("bottomTableData",e.$index,e.row)}}},[a("img",{staticStyle:{display:"inline-block","line-height":"20px","vertical-align":"middle"},attrs:{src:t.images.video}}),t._v(" "),a("span",{staticStyle:{display:"inline-block","line-height":"20px","vertical-align":"middle"}},[t._v("查看")])])]}}])})],1)],1)],1)]),t._v(" "),t.pnMainAside?a("el-aside",{staticClass:"pn-right-main-aside",staticStyle:{width:"400px"}},[a("el-card",{staticClass:"box-card"},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"pn-card-label"},[t._v("监控视频")]),t._v(" "),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){t.closeVideo()}}},[t._v("关闭")])],1),t._v(" "),a("div",t._l(t.cameras,function(t){return a("iframe",{key:t,staticStyle:{height:"370px",width:"750px"},attrs:{src:"./ws_rtsp/rtspPlay.jsp?id="+t}})}))])],1):t._e()],1)],1)])])},staticRenderFns:[]};var u=a("VU/8")(h,m,!1,function(t){a("nEAR"),a("pcgJ")},"data-v-2c57e956",null);e.default=u.exports},nEAR:function(t,e){},oXX7:function(t,e){t.exports="data:image/gif;base64,R0lGODlhBQAsALMAAFNzmsfa8pOYm7vQ66/G4qS926C41sfa8////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAFACwAAAQzUEgZBinmWKxv3p/XceAYkmKppizKISKCvHImy8cN5AhgAxxA60Q0GVeuIlI5PDZBE0kEADs="},pcgJ:function(t,e){}});
//# sourceMappingURL=7.1f00be867d76ba1af78d.js.map