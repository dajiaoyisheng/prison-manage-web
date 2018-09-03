import Mock from 'mockjs';

let calendarData = Mock.mock({
    dateTypes: [
        {value: "1", label: "工作日"},
        {value: "2", label: "非工作日"},
        {value: "3", label: "节假日"}
    ],
    areas: [
        {value: "1", label: "监舍"},
        {value: "2", label: "生产车间"},
        {value: "3", label: "活动室"},
        {value: "4", label: "操场"}
    ],
    options: [
        {value: "1", label: "必须"},
        {value: "2", label: "禁止"}
    ],
    dailyDates :  {
        "totalRows": Mock.mock('@natural(1, 10)'),
        items: []
    },
    specialDates :  {
        "totalRows": Mock.mock('@natural(1, 10)'),
        items: []
    },
    holidayDates: [{
        name: '元旦',
        startDate: '2018-01-01',
        endDate: '2018-01-01',
        dateType: '节假日'
    }, {
        name: '春节',
        startDate: '2018-02-15',
        endDate: '2018-02-21',
        dateType: '节假日'
    }, {
        name: '五一',
        startDate: '2018-05-01',
        endDate: '2018-05-01',
        dateType: '节假日'
    }, {
        name: '十一',
        startDate: '2018-10-01',
        endDate: '2018-10-07',
        dateType: '节假日'
    }]
})

for (let i = 0; i < 5; i++) {
    calendarData.dailyDates.items.push({
        startTime: "12:22:12",
        endTime: "12:22:12",
        dateType: "工作日",
        timeLen: "8.3",
        item: "睡觉",
        area: "监舍、卫生间",
        option: "必须",
        scene: "全体人员"
    });
}

for (let i = 0; i < 5; i++) {
    calendarData.specialDates.items.push({
        startTime: "12:22:12",
        endTime: "12:22:12",
        dateType: "工作日/非工作日/节假日",
        timeLen: "3天7小时20分",
        item: "关禁闭",
        area: "禁闭室",
        option: "必须",
        scene: "张三、李四、赵七"
    });
}

export default calendarData;