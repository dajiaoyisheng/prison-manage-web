import Mock from 'mockjs';

let serverInfoData = Mock.mock({
    "serverItem|4": {
        address: "http://223.210.134.12:9001",
        username: "user01",
        password: "password",
        queuename: "video"
    },
    "engineItem|2": {
        switch: true,
        address: "http://192.168.101.101:8005/video"
    },
    "specialItems|3-5": [function() {
        return {
            address: "http://223.210.134.12:9001",
            username: "user01",
            password: "password"
        }
    }]
})

export { serverInfoData };