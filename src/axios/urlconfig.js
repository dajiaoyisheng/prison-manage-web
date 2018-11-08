import store from '../vuex/store';
store.commit("env");
let storeEnv = store.state.env;

let urlconfig = {
  // 人员定位beging
  // 监区
  ppGetAreaData: `${storeEnv}/criminalPosition.action?method=getPrisonAreas`,
  // 监舍
  ppGetHouseData: `${storeEnv}/criminalPosition.action?method=getPrisonHouses`,
  // 监管类型
  ppGetVisiontypeData: `${storeEnv}/criminalPosition.action?method=getSuperviseTypes`,
  // 搜索
  ppSearch: `${storeEnv}/criminalPosition.action?method=getPrisonerList`,
  
  //人员基本信息
  ppGetPrisoner: `${storeEnv}/criminalPosition.action?method=getPrionserByNum`,
  //人员照片信息
  ppGetPrionserPhoto: `${storeEnv}/criminalPosition.action?method=getPrionserPhoto`,
  //当前预警信息
  ppGetTodayWarnings: `${storeEnv}/criminalPosition.action?method=getTodayWarnings`,
  //当前活动全区域
  ppGetCurrActiveArea: `${storeEnv}/criminalPosition.action?method=getCurrActiveArea`,
   //历史活动区域
  ppGetHisActiveTrack: `${storeEnv}/criminalPosition.action?method=getHisActiveTrack`,
  
  
  // 人员定位end
  
  // 摄像头管理begin
  // 获取所属区域
  cmGetPrisonSubRegions: `${storeEnv}/prisonRegion.action?method=getPrisonRegionTree`,
  // 获取摄像头类型
  cmGetCameraTypes: `${storeEnv}/systemCode.action?method=getCameraType`,
  // 获取摄像头列表
  cmGetCameraList: `${storeEnv}/cameraInfo.action?method=getCameraList`,
  // 保存摄像头信息
  cmSaveCameraInfo: `${storeEnv}/cameraInfo.action?method=saveCameraInfo`,
  // 摄像头管理end
  
  
  //工作台begin
  //犯人总数
  wkGetPrisonersData:`${storeEnv}/workBench.action?method=getPrisonersData`,
  //人员分类
  wkGetBenchChartPie:`${storeEnv}/workBench.action?method=getSupervisePrisoners`,
  //预警事件分类
  wkGetBenchChartbarData:`${storeEnv}/workBench.action?method=getWarnTypePrisoners`,
  //人员状态
  wkGetPStatus:`${storeEnv}/workBench.action?method=getStatusPrisoners`,
  //工作台end
  
}
export default urlconfig
