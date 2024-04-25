<script setup>
import { reactive, ref } from 'vue';
import SettingBox from './SettingBox.vue';
import SttingInstruction from './sttingInstruction.vue';
import BuyBox from './buyBox.vue';
import SellBox from './SellBox.vue';
import DiscountAndTypeBox from './DiscountAndTypeBox.vue';
import { StocksMoreCalculate } from '../../../libs/StockCalculate/main'

const calculationData = reactive({
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
})

const modelBox = reactive({
    simple: true,
    full: false,
    sttingInstructionIsShow: false
})

const checkboxItem = reactive({
    commonStocks: true,
    dayTrading: false,
    exchangeTradedFunds: false
})

const sc = new StocksMoreCalculate()
sc.setType("普通");
sc.setLowestCharge(calculationData.boardLotBaseCharge, calculationData.oddLottBaseCharge)
sc.setChargeDiscount(calculationData.buyDiscount)

const settingBoxUpdate = (data) => {
    modelBox.simple = data.modelBox.simple
    modelBox.full = data.modelBox.full
    modelBox.sttingInstructionIsShow = data.modelBox.sttingInstructionIsShow
    calculationData.securitiesFirms = data.securitiesFirms
}

const buyBoxUpdate = (data) => {
    calculationData.buyBoardLot = data.buyBoardLot
    calculationData.buyOddLot = data.buyOddLot
    calculationData.sharePrice = data.sharePrice
    calculationData.buyDiscount = data.buyDiscount
    calculationData.boardLotBaseCharge = data.boardLotBaseCharge
    calculationData.oddLottBaseCharge = data.oddLottBaseCharge
    calculationData.buyCharge = data.buyCharge
    calculationData.carryingCosts = data.carryingCosts
    calculationData.costPrice = data.costPrice
    calculationData.averagePrice = data.averagePrice
}

const sellBoxUpdate = (data) => {
    calculationData.sellCharge = data.sellCharge
    calculationData.taxes = data.taxes
    calculationData.marketCosts = data.marketCosts
    calculationData.marketValue = data.marketValue
    calculationData.anticipatedRevenue = data.anticipatedRevenue
    calculationData.profitAndLoss = data.profitAndLoss
    calculationData.profitAndLossPercentage = data.profitAndLossPercentage
}
</script>

<template>
    <div id="content" class="content">
        <SettingBox @update="settingBoxUpdate" />
        <SttingInstruction :isShow="modelBox.sttingInstructionIsShow" />
        <BuyBox :stockCalculate="sc" @update="buyBoxUpdate" />
        <SellBox :stockCalculate="sc" @update="sellBoxUpdate" />
        <DiscountAndTypeBox 
        :stockCalculate="sc"
        :modelBox="modelBox" />
        

    </div>
</template>

<style lang="scss"></style>