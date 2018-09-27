import Mock from 'mockjs';

let p = 10;
let pPTableData = {
    "total": 23,
    data: []
};

for (let i = 0; i < p; i++) {
    pPTableData.data.push({
        starttime: Mock.mock('@datetime'),
        endtime: Mock.mock('@datetime'),
        during: Mock.mock('@natural(1, 100)'),
        tyle: '必须在监舍睡觉',
        area: "餐厅",
        tv: 'http://mockjs.com/examples.html#Date',
    });
}

export default pPTableData;