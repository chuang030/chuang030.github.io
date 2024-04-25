<script setup>
import { reactive, watchEffect } from 'vue'
import { StocksMoreCalculate } from '../../../libs/StockCalculate/main'

const props = defineProps({
    modelBox: {
        type: Object,
        default: null
    },
    // buyDiscount: {
    //     type: Number,
    //     default: null
    // },
    // boardLotBaseCharge: {
    //     type: Number,
    //     default: null
    // },
    // oddLottBaseCharge: {
    //     type: Number,
    //     default: null
    // }
    stockCalculate: {
        type: StocksMoreCalculate,
        default: null
    }
})

const emit = defineEmits(['update'])

const calculationData = reactive({
    buyDiscount: null,
    boardLotBaseCharge: null,
    oddLottBaseCharge: null,
    // stockType: props.stockType
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

watchEffect(() => {
    modelBox.simple = props.modelBox.simple
    modelBox.full = props.modelBox.full
    modelBox.sttingInstructionIsShow = props.modelBox.sttingInstructionIsShow
    // calculationData.buyDiscount = props.buyDiscount
    // calculationData.boardLotBaseCharge = props.boardLotBaseCharge
    // calculationData.oddLottBaseCharge = props.oddLottBaseCharge
    // calculationData.stockType = props.stockType

    calculationData.buyDiscount = props.stockCalculate.getChargeDiscount() * 10
    calculationData.boardLotBaseCharge = props.stockCalculate.getBoardLotLowestCharge()
    calculationData.oddLottBaseCharge = props.stockCalculate.getOddLotLowestCharge()

})

const isCheckboxItem = (v = 0) => {
    switch (v) {
        case 0:
            checkboxItem.commonStocks = true;
            checkboxItem.dayTrading = false;
            checkboxItem.exchangeTradedFunds = false;
            break;
        case 1:
            checkboxItem.commonStocks = false;
            checkboxItem.dayTrading = true;
            checkboxItem.exchangeTradedFunds = false;
            break;
        case 2:
            checkboxItem.commonStocks = false;
            checkboxItem.dayTrading = false;
            checkboxItem.exchangeTradedFunds = true;
            break;
    }
}
</script>

<template>
    <div class="set-type-box theme-style-box">
        <div class="title-box">
            <h4>手續費及交易形式</h4>
        </div>
        <div class="discount-and-type-box">

            <div id="discount-box" class="set-type-box-class">
                <div class="set-type-box-class-item">
                    <p>手續費折扣</p>
                    <label for=""></label>
                    <!-- <select name="buy-discount" id="buy-discount" v-model.number="calculationData.buyDiscount"
                        @change="stockCalculation()"> -->
                        <!-- <option value="10">無</option> -->
                        <!-- <option v-for="value in 10" :value=""></option> -->
                        <!-- <option value="9.5">9.5折</option>
                        <option value="9">9折</option>
                        <option value="8.5">8.5折</option>
                        <option value="8">8折</option>
                        <option value="7.5">7.5折</option>
                        <option value="7">7折</option>
                        <option value="6.5">6.5折</option>
                        <option value="6" selected>6折</option>
                        <option value="5.5">5.5折</option>
                        <option value="5">5折</option>
                        <option value="4.5">4.5折</option>
                        <option value="4">4折</option>
                        <option value="3.5">3.5折</option>
                        <option value="3">3折</option>
                        <option value="2.8">2.8折</option>
                        <option value="2.5">2.5折</option>
                        <option value="2">2折</option>
                        <option value="1.5">1.5折</option>
                        <option value="1">1折</option> -->
                    <!-- </select> -->
                </div>
                <div id="lowestCharge" class="set-type-box-class-item" :class="{ active: modelBox.full }">
                    <p>最低手續費</p>
                    <label for="Charge">整股<span>：</span></label>
                    <input type="number" id="boardLotBaseCharge"
                        name="boardLotBaseCharge" v-model.number="calculationData.boardLotBaseCharge" @input="stockCalculation()">
                    <span>元</span>
                    <label for="Charge">零股<span>：</span></label>
                    <input type="number" id="oddLottBaseCharge"
                        name="oddLottBaseCharge" v-model.number="calculationData.oddLottBaseCharge" @input="stockCalculation()">
                    <span>元</span>
                </div>
            </div>
            <div id="stock-type" class="set-type-box-class" :class="{ active: modelBox.full }">
                <p>交易形式</p>
                <form name="set-type-box-form" id="set-type-box-form" @change="stockCalculation()">
                    <div class="form-item">
                        <label for="commonStocks" class="label-checkbox"
                            :class="{ active: checkboxItem.commonStocks }">普通</label>
                        <input type="radio" name="commonStocks" id="commonStocks" class="checkboxItem" value="普通"
                            v-model="calculationData.stockType" @click="isCheckboxItem(0)">
                    </div>
                    <div class="form-item">
                        <label for="dayTrading" class="label-checkbox"
                            :class="{ active: checkboxItem.dayTrading }">當沖</label>
                        <input type="radio" name="dayTrading" id="dayTrading" class="checkboxItem" value="當沖"
                            v-model="calculationData.stockType" @click="isCheckboxItem(1)">
                    </div>
                    <div class="form-item">
                        <label for="exchangeTradedFunds" class="label-checkbox"
                            :class="{ active: checkboxItem.exchangeTradedFunds }">ETF</label>
                        <input type="radio" name="exchangeTradedFunds" id="exchangeTradedFunds" class="checkboxItem"
                            value="ETF" v-model="calculationData.stockType" @click="isCheckboxItem(2)">
                    </div>
                </form>
            </div>
        </div>
        <div class="type-detail-box" v-show="modelBox.full">
            <h4>證券交易稅</h4>
            <p>普通<span>：</span></p>
            <span>0.3%</span>
            <p>當沖<span>：</span></p>
            <span>0.15%</span>
            <p>ETF<span>：</span></p>
            <span>0.1%</span>
        </div>
    </div>
</template>
