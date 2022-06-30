Vue.createApp({
    data: function () {
        return {
            hintState: "",
            totalCarryingCosts: 0,
            totalMarketValue: 0,
            totalProfitAndLossPercentage: 0,
            totalProfitAndLossPercentageString: 0,
            profitAndLossPush: 0,
            profitAndLossPercentagePush: 0,
            requireInterval: 5000,
            item: [],
            dataObject: []
        }
    },
    methods: {
        /**
         * 股票計算方法
         * @param {Array} marketPrice 輸入市價
         * @param {Number} sharePrice 輸入成交價
         * @param {Number} numberOfPiles 輸入股數
         * @param {Number} chargeDiscount 輸入手續費折扣
         * @param {Number|String} type 輸入股票類別
         * @param {Number} index 輸入欲推送資料之位置
         */
        stockCalculation(marketPrice, sharePrice, numberOfPiles, chargeDiscount, type, index) {
            let sNamePush = [];
            let marketPricePush = [];
            let averagePricePush = [];
            let numberOfPilesPush = [];
            let carryingCosts = [];
            let marketValue = [];
            let profitAndLossPush = [];
            let profitAndLossPercentagePush = [];
            let dataObject = [];
            let valueObject =
            {
                marketPrice: marketPrice,
                sharePrice: sharePrice,
                numberOfPiles: numberOfPiles,
                chargeDiscount: chargeDiscount,
                type: type
            }
            const sc = new StockCalculation(valueObject);
            sNamePush.push(this.item[index].sName)
            marketPricePush.push(sc.getMarketPrice())
            averagePricePush.push(sc.getAveragePrice());
            numberOfPilesPush.push(sc.getNumberOfPiles());
            carryingCosts.push(sc.getCarryingCosts());
            marketValue.push(sc.getMarketValue());
            profitAndLossPush.push(sc.getProfitAndLoss());
            profitAndLossPercentagePush.push(sc.getProfitAndLossPercentage());
            dataObject.push(sNamePush, marketPricePush, averagePricePush, numberOfPilesPush, carryingCosts, marketValue, profitAndLossPush, profitAndLossPercentagePush)
            this.dataObject[index] = dataObject
            if (Number(index) === this.item.length - 1) {
                this.totalCalculation()
            }
        },
        totalCalculation() {
            let totalCarryingCosts = 0
            let totalMarketValue = 0
            let profitAndLossPush = 0
            let profitAndLossPercentagePush = 0
            for (const key in this.dataObject) {
                totalCarryingCosts += Number(this.dataObject[key][4])
                totalMarketValue += Number(this.dataObject[key][5])
            }
            profitAndLossPush = totalMarketValue - totalCarryingCosts
            profitAndLossPercentagePush = Math.round(((totalMarketValue / totalCarryingCosts) * 100) * 100) / 100

            this.totalMarketValue = totalMarketValue
            this.totalCarryingCosts = totalCarryingCosts
            this.profitAndLossPush = profitAndLossPush
            this.profitAndLossPercentagePush = profitAndLossPercentagePush;
            // 利用總損益百分比所出半圓旋轉角度
            this.totalProfitAndLossPercentage = this.totalMarketValue / this.totalCarryingCosts;
            this.totalProfitAndLossPercentageString = Math.round((this.profitAndLossPercentagePush - 100) * 100) / 100 ;
            totalMarketValueCircle2.style.transform = `rotate(${this.totalProfitAndLossPercentage * 360}deg)`;
        },
        /**
         * 更換查詢日期，並送出請求後執行後續資料處理
         * @param {String} date 輸入日期(yyyymmdd)，可不傳入，預設為今日西元日期(yyyymmdd)
         * @param {String} taiwanYear 輸入日期(yyy/mm/dd)，可不傳入，預設為今日民國日期(yyy/mm/dd)
         */
        stockRun() {
            const sendReq = async () => {
                const res = await axios({
                    method: 'post',
                    url: 'http://minichihub.com:3000',
                    data: {
                        item: this.item
                    }
                })
                .catch(error => {
                    if(axios.isAxiosError(error)){
                        this.hintState = "失敗"
                    }
                })
                
                // console.log(JSON.stringify(res.data.stockNoData) === JSON.stringify(this.item.map(e =>{return e.stockNo})));
                //驗證回傳的資料是否正確，錯誤則再次請求(請求後500毫秒後驗證)，驗方法為取得的股票編號陣列與回傳的股票編號陣列是否相同
                if (JSON.stringify(res.data.stockNoData) === JSON.stringify(this.item.map(e => { return e.stockNo }))) {
                    //資料正確逐筆進入計算
                    for (const key in res.data.regularMarketPrice) {
                        this.stockCalculation(res.data.regularMarketPrice[key], this.item[key].averagePrice, this.item[key].numberOfPiles, 6, 0, key)
                    }
                    this.hintState = "成功";
                } else {
                    //資料錯誤，重新請求資料
                    setTimeout(() => {
                        sendReq()
                        this.hintState = "資料有誤，已重新請求資料";
                    }, 500)
                    // console.log("重新請求資料");
                }
            }
            sendReq()

            window.setInterval(sendReq, this.requireInterval)
        },
        async sendStock() {
            await axios({
                method: 'get',
                url: `http://minichihub.com:3000/user`
            })
                .then(response => {
                    if (response.request.readyState === 4 && response.status === 200) {
                        this.item = response.data.stockItem
                        // this.hintState = "成功"
                        this.stockRun()
                    } else if (request.readyState === 4 && request.status === 0) {
                        this.hintState = "失敗"
                    }
                    
                })
                .catch(error => {
                    if(axios.isAxiosError(error)){
                        this.hintState = "失敗"
                    }
                })
        }
    },
    mounted() {
        this.sendStock();
    }
}).mount('#app')

const totalCarryingCostsCircle = document.getElementById("totalCarryingCostsCircle");
const totalMarketValueCircle = document.getElementById("totalMarketValueCircle");
const totalMarketValueCircle2 = document.getElementById("totalMarketValueCircle2");

