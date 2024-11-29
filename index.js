const JuejinHelper = require("juejin-helper");
const {CronJob } = require('cron');
const config = require('./config/index');
const { sendEmail } = require('./helper/email')

async function run() {
    const juejin = new JuejinHelper();
    await juejin.login(config.COOKIE);

    const growth = juejin.growth();


    // 获取今日签到状态
    const isCheck = await growth.getTodayStatus();

    // 没有签到
    if (!isCheck) {
        // 签到
        await growth.checkIn();
        // 获取抽奖配置
        await growth.getLotteryConfig();
        // 抽奖
        await growth.drawLottery();
    }

    // 获取当前矿石数
    const num = await growth.getCurrentPoint();
    console.log(isCheck, num);
    // 获取统计签到天数
    // await growth.getCounts();
    const emailConfig = config.EMAIL_CONFIG;
    await sendEmail({...emailConfig, html: "<span>是否已经签到：" + isCheck + ", 当前矿石数量：" + num + "</span>"})

    // 获取抽奖幸运用户
    // => { lotteries: [{ lottery_history_id }, ...] }
    /*const luckyUsers = await growth.getLotteriesLuckyUsers({ page_no : 1, page_size :5 });
    const historyId = luckyUsers?.lotteries?.length ? luckyUsers.lotteries[0].history_id : '';
    if(historyId) {
        // 沾喜气
        await growth.dipLucky(historyId); // => { has_dip, dip_value, total_value, dip_action }
    }*/

    // 获取我的幸运值
    // await growth.getMyLucky();
    await juejin.logout();
}

const job = new CronJob('00 30 15 * * *', async ()=>{
    await run();
});
job.start();
