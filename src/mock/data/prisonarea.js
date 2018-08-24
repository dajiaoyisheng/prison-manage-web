import Mock from 'mockjs';

const prisonarea = [{
    id: 1,
    label: '杭州某某监狱',
    children: [{
        id: 4,
        label: '第一监区(3/1750)',
        children: [{
                id: 9,
                icon: 'el-icon-info',
                label: '一号监舍楼(0/200)',
                children: [{
                        id: 10,
                        label: '一层'
                    },
                    {
                        id: 11,
                        label: '二层'
                    }
                ]
            },
            {
                id: 12,
                icon: 'el-icon-info',
                label: '二号监舍楼'
            },
            {
                id: 13,
                icon: 'el-icon-info',
                label: '三号监舍楼'
            },
            {
                id: 14,
                icon: 'el-icon-info',
                label: '生产车间(3/125)',
                children: [{
                        id: 15,
                        label: '生产车间1(3/60)'
                    },
                    {
                        id: 16,
                        label: '生产车间2(0/65)'
                    }
                ]
            },
            {
                id: 17,
                icon: 'el-icon-info',
                label: '教学楼'
            },
            {
                id: 18,
                icon: 'el-icon-info',
                label: '会见楼'
            },
            {
                id: 19,
                icon: 'el-icon-info',
                label: '运动场'
            },
            {
                id: 20,
                icon: 'el-icon-info',
                label: '监控室'
            },
        ]
    }]
}, {
    id: 2,
    label: '第二监区',
    children: [{
        id: 5,
        label: '一号监舍'
    }, {
        id: 6,
        label: '二号监舍'
    }]
}, {
    id: 3,
    label: '第三监区',
    children: [{
        id: 7,
        label: '一号监舍'
    }]
}];

export default prisonarea;