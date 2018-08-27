import Mock from 'mockjs';

const prisonarea = [{
    id: 1,
    label: '杭州某某监狱',
    icon: 'el-icon-menu',
    children: [{
        id: 4,
        label: '第一监区(3/1750)',
        icon: 'el-icon-date',
        children: [{
                id: 9,
                label: '一号监舍楼(0/200)',
                icon: 'el-icon-message',
                children: [{
                        id: 10,
                        label: '一层',
                        icon: 'el-icon-news'
                    },
                    {
                        id: 11,
                        label: '二层',
                        icon: 'el-icon-news'
                    }
                ]
            },
            {
                id: 12,
                label: '二号监舍楼',
                icon: 'el-icon-message'
            },
            {
                id: 13,
                label: '三号监舍楼',
                icon: 'el-icon-message'
            },
            {
                id: 14,
                label: '生产车间(3/125)',
                icon: 'el-icon-message',
                children: [{
                        id: 15,
                        label: '生产车间1(3/60)',
                        icon: 'el-icon-news'
                    },
                    {
                        id: 16,
                        label: '生产车间2(0/65)',
                        icon: 'el-icon-news'
                    }
                ]
            },
            {
                id: 17,
                label: '教学楼',
                icon: 'el-icon-message'
            },
            {
                id: 18,
                label: '会见楼',
                icon: 'el-icon-message'
            },
            {
                id: 19,
                label: '运动场',
                icon: 'el-icon-message'
            },
            {
                id: 20,
                label: '监控室',
                icon: 'el-icon-message'
            },
        ]
    }, {
        id: 2,
        label: '第二监区',
        icon: 'el-icon-date',
        children: [{
            id: 5,
            label: '一号监舍',
            icon: 'el-icon-message'
        }, {
            id: 6,
            label: '二号监舍',
            icon: 'el-icon-message'
        }]
    }, {
        id: 3,
        label: '第三监区',
        icon: 'el-icon-date',
        children: [{
            id: 7,
            label: '一号监舍',
            icon: 'el-icon-message'
        }]
    }]
}];

export default prisonarea;