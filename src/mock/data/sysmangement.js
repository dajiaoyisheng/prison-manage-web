import Mock from 'mockjs';

let logCount = Math.floor(Math.random() * (15 - 1 + 1) + 1);
let userCount = Math.floor(Math.random() * (15 - 1 + 1) + 1);

let systemmanagementData = Mock.mock({
    loggerTable: {
        count: logCount,
        data: []
    },
    userTable: {
        count: userCount,
        data: []
    },
    userItem: {
        guid: '123456',
        userName: '张三',
        passWord: '123456',
        insurePwd: '123456'
    }
})

for (let i = 0; i < logCount; i++) {
    systemmanagementData.loggerTable.data.push({
        optionUser: 'root',
        optionIP: '127.0.0.1',
        optionName: '登录系统',
        optionTime: '2018-09-27 12:02:00',
        optionContent: 'root用户于2018-09-27 12:02:00登录系统'
    });
}

for (let i = 0; i < userCount; i++) {
    systemmanagementData.userTable.data.push({
        guid: '123456',
        userName: '张三',
        createTime: '2018-09-27 12:02:00'
    });
}

export default systemmanagementData;