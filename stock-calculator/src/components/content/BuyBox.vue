<script setup>
import { reactive, watchEffect } from 'vue'
import { StocksMoreCalculate } from '../../../libs/StockCalculate/main'
import PriceButtonController from './PriceButtonController.vue'

const props = defineProps({
    stockCalculate: {
        type: StocksMoreCalculate,
        default: null
    }
})

const emit = defineEmits(['update'])

const calculationData = reactive({
    buyBoardLot: null,
    buyOddLot: null,
    sharePrice: null,
    buyDiscount: 6,
    boardLotBaseCharge: 20,
    oddLottBaseCharge: 1,
    buyCharge: null,
    carryingCosts: null,
    costPrice: null,
    averagePrice: null,
})

watchEffect(() => {
    emit('update', {
        buyBoardLot: calculationData.buyBoardLot,
        buyOddLot: calculationData.buyOddLot,
        sharePrice: calculationData.sharePrice,
        buyDiscount: calculationData.buyDiscount,
        boardLotBaseCharge: calculationData.boardLotBaseCharge,
        oddLottBaseCharge: calculationData.oddLottBaseCharge,
        buyCharge: calculationData.buyCharge,
        carryingCosts: calculationData.carryingCosts,
        costPrice: calculationData.costPrice,
        averagePrice: calculationData.averagePrice
    })
})

const sc = props.stockCalculate

const stockCalculation = () => {
    sc.setCost(calculationData.sharePrice === null ? 0 : calculationData.sharePrice);
    sc.setNumberOfPilesDetailed(calculationData.buyBoardLot === null ? 0 : calculationData.buyBoardLot, 
                                calculationData.buyOddLot === null ? 0 : calculationData.buyOddLot);
    sc.setLowestCharge(calculationData.boardLotBaseCharge, calculationData.oddLottBaseCharge);
    sc.setChargeDiscount(calculationData.buyDiscount);
    calculationData.buyCharge = sc.getBuyCharge();
    calculationData.carryingCosts = sc.getCarryingCosts();
    calculationData.costPrice = sc.getCostPrice();
    calculationData.averagePrice = sc.getAveragePrice();
}

const priceUpdate = (data) => {
    calculationData.sharePrice = data
}

const valueClear = (data) => {
    calculationData.buyBoardLot = data.buyBoardLot
    calculationData.buyOddLot = data.buyOddLot
    calculationData.sharePrice = data.newPrice
}

</script>

<template>
    <div class="buy-box theme-style-box">
        <div class="title-box">
            <h4>買入</h4>
        </div>
        <div class="input-box">
            <div class="input-box-class">
                <label>整股：</label>
                <input type="number" id="buyBoardLot" v-model.number="calculationData.buyBoardLot"
                    @input="stockCalculation()" min="0">
                <span>張</span>
            </div>
            <div class="input-box-class">
                <label>零股：</label>
                <input type="number" id="buyOddLot" v-model.number="calculationData.buyOddLot"
                    @input="stockCalculation()" min="0" max="999">
                <span>股</span>
            </div>
            <div class="input-box-class">
                <label>買價：</label>
                <input type="number" id="sharePrice" v-model.number="calculationData.sharePrice"
                    @input="stockCalculation()" min="0">
                <span>元</span>
            </div>
            <PriceButtonController 
                :inputPrice="calculationData.sharePrice"
                @click="stockCalculation()" @priceUpdate="priceUpdate" @valueClear="valueClear"/>
        </div>
    </div>
</template>