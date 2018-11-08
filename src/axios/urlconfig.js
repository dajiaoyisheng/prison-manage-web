import store from '../vuex/store';
store.commit("env");
let storeEnv = store.state.env;

let urlconfig = {
  // 人员定位beging
  // 监区
  ppGetAreaData: `/criminalPosition.action?method=getPrisonAreas`,
  // 监舍
  ppGetHouseData: `/criminalPosition.action?method=getPrisonHouses`,
  // 监管类型
  ppGetVisiontypeData: `/criminalPosition.action?method=getSuperviseTypes`,
  // 搜索
  ppSearch: `/criminalPosition.action?method=getPrisonerList`,
  //人员基本信息
  ppGetPrisoner: `/criminalPosition.action?method=getPrionserByNum`,
  //人员照片信息
  ppGetPrionserPhoto: `/criminalPosition.action?method=getPrionserPhoto`,
  //当前预警信息
  ppGetTodayWarnings: `/criminalPosition.action?method=getTodayWarnings`,
  //当前活动全区域
  ppGetCurrActiveArea: `/criminalPosition.action?method=getCurrActiveArea`,
  //历史活动区域
  ppGetHisActiveTrack: `/criminalPosition.action?method=getHisActiveTrack`,
  // 人员定位end

  // 人员点名begin
  // 获取人员点名导航树
  pnGetPrisonareatree: `/prisonRegion.action?method=getPrisonRegionTree`,
  // 获取点名列表信息
  pnGetTabledatas: `/pointName.action?method=getPointNameDatas`,
  // 人员点名end

  // 查询统计begin
  // 定位异常预警begin
  // 查看服刑人员信息
  qpwGetShowPrisoner: `/earlyWarning.action?method=getPrisonerInfo`,
  // 获取预警事件类型
  qpwGetWarningEventTypes: `/earlyWarning.action?method=getWarningEventTypes`,
  // 获取服刑人员类型
  qpwGetSuperviseTypes: `/earlyWarning.action?method=getSuperviseType`,
  // 获取定位异常清单
  qpwGetPosunusualItems: `/earlyWarning.action?method=getEarlyWarnings`,
  // 定位异常预警end
  // 预警统计begin
  // 获取时期类型
  qpwGetAllPeriodTypes: `/warningStatistics.action?method=getAllPeriodTypes`,
  // 获取区间字典
  qpwGetPrisonDatas: `/prisonRegion.action?method=getAllPrisonRegions`,
  // 查询预警统计
  qpwDoQuery: `/warningStatistics.action?method=getPrewarningstatsDatas`,
  // 获取预警区域排名
  qpwQueryAreaOrder: `/warningStatistics.action?method=queryAreaOrder`,
  // 预警统计end
  // 违规预警begin
  // 获取预警事件类型
  qvGetPreWarnType: `/violationWarning.action?method=getWarningEventTypes`,
  // 获取表格数据
  qvGetTableDatas: `/violationWarning.action?method=getViolationWarnings`,
  // 违规预警end
  // 查询统计end

  // 系统设置begin
  // 日历管理begi
  // 保存作息表单
  scmSubmitForm: `/spriSchedule.action?method=saveDailyDates`,
  // 删除作息时间
  scmDeleteDailyDate: `/spriSchedule.action?method=deleteDailyDate`,
  // 获取日期类型
  scmGetDateTypes: `/systemCode.action?method=getDateType`,
  // 获取区间字典
  scmGetAreas: `/systemCode.action?method=getAreaType`,
  // 获取动作字典
  scmGetOptions: `/systemCode.action?method=getActionType`,
  // 获取适用范围字典
  scmGetScopes: `/systemCode.action?method=getPersonRange`,
  // 获取日常作息时间列表
  scmGetDailyDates: `/spriSchedule.action?method=getDailyDates`,
  // 获取特殊人员作息时间
  scmGetSpecialDates: `/spriSchedule.action?method=getSpecialDates`,
  // 日历管理end
  // 人员管理begin
  // 提交新增用户
  spiSubmitForm: `/criminalManager.action?method=saveCriminals`,
  // 查询服刑人员信息
  spiQueryPrisonerInfo: `/criminalManager.action?method=getCriminal`,
  // 根据监区查找所有监舍
  spiGetRoomsByPrisonRegion: `/prisonRegion.action?method=getRoomsByPrisonRegion`,
  // 获取服刑人员状态
  spmGetState: `/systemCode.action?method=getState`,
  // 获取人员当前状态
  spmGetCriState: `/systemCode.action?method=getCriState`,
  // 获取服刑监管类型
  spmgetSuperviseType: `/systemCode.action?method=getSuperviseType`,
  // 获取所有监区列表
  spmGetAllPrisonRegions: `/prisonRegion.action?method=getAllPrisonRegions`,
  // 获取服刑人员列表
  spmGetTableDatas: `/criminalManager.action?method=getCriminals`,
  // 执行删除操作
  spmHandleDelete: `/criminalManager.action?method=deleteCriminals`,
  // 人员管理end
  // 服务管理begin
  // 保存服务地址信息
  ssmSaveServerInfo: `/serverConfig.action?method=saveServerInfo`,
  // 获取服务地址信息
  ssmGetServerInfo: `/serverConfig.action?method=getServerInfo`,
  // 系统选项begin
  // 获取系统选项
  ssoGetSysOptions: `/systemOption.action?method=getSysOptions`,
  // 保存系统选项
  ssoSaveSysOptions: `/systemOption.action?method=saveSysOptions`,
  // 系统选项end
  // 服务管理end
  // 系统设置end


  // 摄像头管理begin
  // 获取所属区域
  cmGetPrisonSubRegions: `/prisonRegion.action?method=getPrisonRegionTree`,
  // 获取摄像头类型
  cmGetCameraTypes: `/systemCode.action?method=getCameraType`,
  // 获取摄像头列表
  cmGetCameraList: `/cameraInfo.action?method=getCameraList`,
  // 保存摄像头信息
  cmSaveCameraInfo: `/cameraInfo.action?method=saveCameraInfo`,
  // 摄像头管理end


  //工作台begin
  //犯人总数
  wkGetPrisonersData: `/workBench.action?method=getPrisonersData`,
  //人员分类
  wkGetBenchChartPie: `/workBench.action?method=getSupervisePrisoners`,
  //预警事件分类
  wkGetBenchChartbarData: `/workBench.action?method=getWarnTypePrisoners`,
  //人员状态
  wkGetPStatus: `/workBench.action?method=getStatusPrisoners`,
  //工作台end

}
export default urlconfig
