import Mock from 'mockjs';

let pointnameData = Mock.mock({
    topTableData: [{
        number: 'A010101',
        name: '张三',
        warningType: '无法定位',
        lastArea: '第一监区/一号监舍楼/一层/监舍1',
        lastTime: '13:01:23 07/23/2018'
    }, {
        number: 'A010102',
        name: '李四',
        warningType: '无法定位',
        lastArea: '第一监区/一号监舍楼/一层/监舍1',
        lastTime: '13:01:23 07/23/2018'
    }, {
        number: 'A010103',
        name: '王五',
        warningType: '无法定位',
        lastArea: '第一监区/一号监舍楼/一层/监舍1',
        lastTime: '13:01:23 07/23/2018'
    }],
    bottomTableData: [{
        number: 'A010102',
        name: '李一',
        area: '第一监区/生产车间/生产车间1',
        time: '13:02:23 07/23/2018',
        func: '人脸/视觉码'
    }, {
        number: 'A010102',
        name: '李一',
        area: '第一监区/生产车间/生产车间1',
        time: '13:02:23 07/23/2018',
        func: '人脸/视觉码'
    }, {
        number: 'A010102',
        name: '李一',
        area: '第一监区/生产车间/生产车间1',
        time: '13:02:23 07/23/2018',
        func: '人脸/视觉码'
    }]
})

export default pointnameData;