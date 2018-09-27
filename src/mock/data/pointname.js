import Mock from 'mockjs';

let pointnameData = Mock.mock({
    topTable: {
        count: 4,
        data: []
    },
    bottomTable: {
        count: 100,
        data: []
    }
})

let topCount = Math.floor(Math.random() * (3 - 1 + 1) + 1);
for (let i = 0; i < topCount; i++) {
    pointnameData.topTable.data.push({
        number: 'A010101',
        name: '张三',
        warningType: '无法定位',
        lastArea: '第一监区/一号监舍楼/一层/监舍1',
        lastTime: '13:01:23 07/23/2018',
        cameras: ['1']
    });
}

let bottomCount = Math.floor(Math.random() * (10 - 1 + 1) + 1);
for (let i = 0; i < bottomCount; i++) {
    pointnameData.bottomTable.data.push({
        number: 'A010102',
        name: '李一',
        area: '第一监区/生产车间/生产车间1',
        time: '13:02:23 07/23/2018',
        func: '人脸/视觉码',
        cameras: ['1', '2']
    });
}

export default pointnameData;