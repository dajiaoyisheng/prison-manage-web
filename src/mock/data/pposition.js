import Mock from 'mockjs';

let p = Math.floor(Math.random() * (15 - 1 + 1) + 1);
let pPostionData = {
    "total": p,
    data: []
};

for (let i = 0; i < p; i++) {
    pPostionData.data.push({
        name: Mock.mock('@cname()'),
        numbering: Mock.mock('@natural(1000000, 9999999)')
    });
}

export default pPostionData;