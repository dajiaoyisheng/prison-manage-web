import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import PrisonersData from './data/prisoners';
import resPieData from './data/pie';
import barData from './data/bar';
import pPostionData from './data/pposition';
import pPTableData from './data/pptabledata';
import pstatus from './data/pstatus';
import sysOptionsData from './data/sysoptions';
import prisonarea from './data/prisonarea';
import {
  serverInfoData
} from './data/serverinfo';
import posunsualData from './data/posunusual';
import cameraData from './data/camera';
import pManageDatas from './data/pManageDatas';
import calendarData from './data/calendar';
import pointnameData from './data/pointname';
import prewarningstatsData from './data/prewarningstats';
import systemmanagementData from './data/sysmangement';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);
    let defaultResData = function () {
      return {
        status: 0,
        statusinfo: "操作成功",
        data: {}
      };
    }();


    mock.onGet('/getBenchChartPie').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = resPieData;
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

    // 工作台-获取犯人总数
    mock.onGet('/getPrisonersData').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = PrisonersData;
          resolve([200, defaultResData])
        }, 1000);
      });
    });
    // 工作台-人员状态
    mock.onGet('/getPStatus').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = pstatus;
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

    // mock.onGet('/getTvMonitor').reply(config => {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             defaultResData.data = prisonarea;
    //             resolve([200, defaultResData])
    //         }, 1000);
    //     });
    // });

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

    mock.onPost('/getCameraList').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = cameraData;
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

    mock.onPost('/getPrisonerInfo').reply(config => {
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

    mock.onPost('/getDailyDates').reply(config => {
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

    mock.onPost('/getSpecialDates').reply(config => {
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

    mock.onPost('/getPointNameDatas').reply(config => {
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

    mock.onPost('/getPrewarningstatsDatas').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = prewarningstatsData;
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/queryAreaOrder').reply(config => {
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

    mock.onGet('/getScopes').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = calendarData.scopes;
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/getLoggers').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = systemmanagementData.loggerTable;
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/getUsers').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = systemmanagementData.userTable;
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/saveSysOptions').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/saveServerInfo').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/deleteUser').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/getUser').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          defaultResData.data = systemmanagementData.userItem;
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/saveUser').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/saveDailyDates').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, defaultResData])
        }, 1000);
      });
    });

    mock.onPost('/deleteDailyDate').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, defaultResData])
        }, 1000);
      });
    });
  }
}
