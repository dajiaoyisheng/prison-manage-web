import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PrisonersData from './data/prisoners';
import pieData from './data/pie';
import barData from './data/bar';
import pPostionData from './data/pposition';
import pPTableData from './data/pptabledata';
import sysOptionsData from './data/sysoptions';
import prisonarea from './data/prisonarea';
import { serverInfoData } from './data/serverinfo';
import posunsualData from './data/posunusual';
import pManageDatas from './data/pManageDatas';
import calendarData from './data/calendar';
import pointnameData from './data/pointname';
import prewarningstatsData from './data/prewarningstats';

export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);
        let defaultResData = function() {
            return {
                status: 0,
                statusinfo: "操作成功",
                data: {}
            };
        }();

        mock.onGet('/getPrisonersData').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data.data = PrisonersData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getBenchChartPie').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = pieData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getBenchChartbarData').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = barData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/prisonersStutas').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data.data = PrisonersData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/pPositionData').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = pPostionData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onPost('/pPTableData').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = pPTableData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getSysOptions').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = sysOptionsData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });


        mock.onGet('/getPrisonareatree').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = prisonarea;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getServerInfo').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = serverInfoData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getWarningTypes').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = posunsualData.warningTypes;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getPrisonerTypes').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = posunsualData.prisonerTypes;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onPost('/getPosunusualItems').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = posunsualData.ppuTableDatas;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });
        // 服刑人员管理
        mock.onPost('/getPManageDatas').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = pManageDatas;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getPrisonerInfo').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = posunsualData.prisonerInfo;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getDailyDates').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = calendarData.dailyDates;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getDateTypes').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = calendarData.dateTypes;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getAreas').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = calendarData.areas;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getOptions').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = calendarData.options;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getSpecialDates').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = calendarData.specialDates;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getHolidayDates').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = calendarData.holidayDates;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getPointNameDatas').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = pointnameData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getPrewarningstatsDatas').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = prewarningstatsData;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });

        mock.onGet('/getPrisonDatas').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    defaultResData.data = prewarningstatsData.areas;
                    resolve([200, defaultResData])
                }, 1000);
            });
        });
    }
}