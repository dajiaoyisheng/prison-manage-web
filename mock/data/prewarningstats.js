import Mock from 'mockjs';

let prewarningstatsData = Mock.mock({
    tableData: [{
        warningEvent: '服刑人员进入警戒区域',
        warningTimes: '18',
        warningCount: '25'
      }, {
        warningEvent: '服刑人员入错监舍',
        warningTimes: '15',
        warningCount: '14'
      }, {
        warningEvent: '特定区域长时间滞留',
        warningTimes: '11',
        warningCount: '11'
      }, {
        warningEvent: '未在指定时段进入特定区域',
        warningTimes: '5',
        warningCount: '12'
      }, {
        warningEvent: '未在指定时段进入特定区域',
        warningTimes: '5',
        warningCount: '12'
    }],
    list: [
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        },
        {
          name: '张三',
          times: '10'
        }
      ],
    option1: {
        xAxisData: [100, 190, 200, 334, 390, 330, 220],
        yAxisData: ['监区一', '监区二', '监区三', '监区四', '监区五']
    },
    option2: {
        xAxisData: [10, 52, 200, 334, 390, 330, 220],
        yAxisData: ['放风场', '监舍', '活动室', '会见室', '食堂']
    },
    areas: [
      {value: "1", label: "监区一"},
      {value: "2", label: "监区二"},
      {value: "3", label: "监区三"},
      {value: "4", label: "监区四"},
      {value: "5", label: "监区五"}
  ],
})

export default prewarningstatsData;