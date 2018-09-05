import Mock from 'mockjs';

const prisonarea = [{
    id: 1,
    label: '杭州某某监狱',
    icon: 'el-icon-menu',
    isWarning: false,
    children: [{
        id: 4,
        label: '第一监区(3/1750)',
        icon: 'el-icon-date',
        isWarning: false,
        children: [{
                id: 9,
                label: '一号监舍楼(0/200)',
                icon: 'el-icon-message',
                isWarning: false,
                children: [{
                        id: 10,
                        label: '一层',
                        icon: 'el-icon-news',
                        isWarning: false
                    },
                    {
                        id: 11,
                        label: '二层',
                        icon: 'el-icon-news',
                        isWarning: false
                    }
                ]
            },
            {
                id: 12,
                label: '二号监舍楼',
                icon: 'el-icon-message',
                isWarning: false
            },
            {
                id: 13,
                label: '三号监舍楼',
                icon: 'el-icon-message',
                isWarning: false
            },
            {
                id: 14,
                label: '生产车间(3/125)',
                icon: 'el-icon-message',
                isWarning: false,
                children: [{
                        id: 15,
                        label: '生产车间1(3/60)',
                        icon: 'el-icon-news',
                        isWarning: true
                    },
                    {
                        id: 16,
                        label: '生产车间2(0/65)',
                        icon: 'el-icon-news',
                        isWarning: false
                    }
                ]
            },
            {
                id: 17,
                label: '教学楼',
                icon: 'el-icon-message',
                isWarning: false
            },
            {
                id: 18,
                label: '会见楼',
                icon: 'el-icon-message',
                isWarning: false
            },
            {
                id: 19,
                label: '运动场',
                icon: 'el-icon-message',
                isWarning: false
            },
            {
                id: 20,
                label: '监控室',
                icon: 'el-icon-message',
                isWarning: false
            },
        ]
    }, {
        id: 2,
        label: '第二监区',
        icon: 'el-icon-date',
        isWarning: false,
        children: [{
            id: 5,
            label: '一号监舍',
            icon: 'el-icon-message',
            isWarning: false
        }, {
            id: 6,
            label: '二号监舍',
            icon: 'el-icon-message',
            isWarning: false
        }]
    }, {
        id: 3,
        label: '第三监区',
        icon: 'el-icon-date',
        isWarning: false,
        children: [{
            id: 7,
            label: '一号监舍',
            icon: 'el-icon-message',
            isWarning: false
        }]
    }]
}];

export default prisonarea;