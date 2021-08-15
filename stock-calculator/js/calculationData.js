
const sc = new StockCalculation();
const labelCheckbox = document.getElementsByClassName("label-checkbox");


Vue.createApp({
    data: function () {
        return {
            buyBoardLot: null,
            buyOddLot: null,
            sharePrice: null,
            securitiesFirms: 1,
            buyDiscount: 6,
            stockType: "普通",
            boardLotBaseCharge: 20,
            oddLottBaseCharge: 1,
            buyCharge: null,
            carryingCosts: null,
            costPrice: null,
            sellCharge: null,
            averagePrice: null,
            taxes: null,
            marketCosts: null,
            marketValue: null,
            anticipatedRevenue: null,
            profitAndLoss: null,
            profitAndLossPercentage: null,
            resultMsg: "",
            sttingInstructionIsShow: false,
            modelBox: {
                simple: true,
                full: false
            },
            checkboxItem: {
                commonStocks: true,
                dayTrading: false,
                exchangeTradedFunds: false
            },
            buyDiscountItem: {

            }
        }
    },
    methods: {
        securitiesFirmsSelect(v) {
            switch (v) {
                case 0:
                    this.buyDiscount = 10;
                    this.boardLotBaseCharge = 20;
                    this.oddLottBaseCharge = 1;
                    break;
                case 1:
                    this.buyDiscount = 6;
                    this.boardLotBaseCharge = 20;
                    this.oddLottBaseCharge = 1;
                    break;
                case 2:
                    this.buyDiscount = 2.8;
                    this.boardLotBaseCharge = 1;
                    this.oddLottBaseCharge = 1;
                    break;
                case 3:
                    this.buyDiscount = 6;
                    this.boardLotBaseCharge = 5;
                    this.oddLottBaseCharge = 1;
                    break;
                case 4:
                    this.buyDiscount = 6.5;
                    this.boardLotBaseCharge = 20;
                    this.oddLottBaseCharge = 1;
                    break;
                case 5:
                    this.buyDiscount = 2.8;
                    this.boardLotBaseCharge = 20;
                    this.oddLottBaseCharge = 1;
                    break;
            }
            this.stockCalculation();
        },
        isCheckboxItem(v = 0) {
            switch (v) {
                case 0:
                    this.checkboxItem.commonStocks = true;
                    this.checkboxItem.dayTrading = false;
                    this.checkboxItem.exchangeTradedFunds = false;
                    break;
                case 1:
                    this.checkboxItem.commonStocks = false;
                    this.checkboxItem.dayTrading = true;
                    this.checkboxItem.exchangeTradedFunds = false;
                    break;
                case 2:
                    this.checkboxItem.commonStocks = false;
                    this.checkboxItem.dayTrading = false;
                    this.checkboxItem.exchangeTradedFunds = true;
                    break;
            }
        },
        buyValueClear() {
            this.sharePrice = null;
            this.buyBoardLot = null;
            this.buyOddLot = null;
        },
        sellValueClear() {
            this.marketCosts = null;
        },
        modelBoxItemIsShow() {
            this.modelBox.simple = !this.modelBox.simple;
            this.modelBox.full = !this.modelBox.full;
        },
        stockCalculation() {
            sc.setMarketPrice(this.marketCosts === null ? 0 : this.marketCosts);
            sc.setCost(this.sharePrice === null ? 0 : this.sharePrice);
            sc.setNumberOfPilesDetailed(this.buyBoardLot === null ? 0 : this.buyBoardLot, this.buyOddLot === null ? 0 : this.buyOddLot);
            sc.setLowestCharge(this.boardLotBaseCharge, this.oddLottBaseCharge);
            sc.setChargeDiscount(this.buyDiscount);
            sc.setType(this.stockType);
            this.buyCharge = sc.getBuyCharge();
            this.carryingCosts = sc.getCarryingCosts();
            this.costPrice = sc.getCostPrice();
            this.sellCharge = sc.getSellCharge();
            this.averagePrice = sc.getAveragePrice();
            this.taxes = sc.getTaxes();
            this.marketValue = sc.getMarketValue();
            this.anticipatedRevenue = sc.getAnticipatedRevenue();
            this.profitAndLoss = sc.getProfitAndLoss();
            this.profitAndLossPercentage = sc.getProfitAndLossPercentage();
            this.calculationResult()
        },
        calculationResult() {
            if (
                ((this.buyBoardLot === null && this.buyBoardLot === "") &&
                    (this.buyOddLot === null && this.buyOddLot === "")) ||
                (this.sharePrice === null || this.sharePrice === "") ||
                (this.marketCosts === null || this.marketCosts === "")
            ) {
                this.resultMsg = "填寫中...";
            } else {
                if (this.profitAndLossPercentage === Infinity) {
                    if (
                        (this.buyBoardLot === 0 && this.buyOddLot === 0) ||
                        (this.buyBoardLot === "" && this.buyOddLot === "") ||
                        (this.buyBoardLot === 0 && this.buyOddLot === "") ||
                        (this.buyBoardLot === "" && this.buyOddLot === 0)
                    ) {
                        this.resultMsg = "您的股票還沒買到喔~";
                    }
                    if (this.sharePrice === 0) {
                        this.resultMsg = "買價為0也太幸運~";
                    }
                    if (this.marketCosts === 0) {
                        this.resultMsg = "賣價為0相信您不會賣~";
                    }
                    if (this.sharePrice === 0 && this.marketCosts === 0) {
                        this.resultMsg = "沒有這種交易喔~";
                    }
                } else {
                    this.resultMsg = "成功~";
                }
            }
        },
        sttingBoxTranslateY() {

        }
    },
    mounted() {

    }
}).mount('#app')
