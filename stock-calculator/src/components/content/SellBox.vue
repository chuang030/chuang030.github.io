<script setup>
import { computed, reactive, ref, watchEffect } from 'vue'
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
    sellCharge: null,
    taxes: null,
    marketCosts: null,
    marketValue: null,
    anticipatedRevenue: null,
    profitAndLoss: null,
    profitAndLossPercentage: null
})

watchEffect(() => {
    emit('update', {
        sellCharge: calculationData.sellCharge,
        taxes: calculationData.taxes,
        marketCosts: calculationData.marketCosts,
        marketValue: calculationData.marketValue,
        anticipatedRevenue: calculationData.anticipatedRevenue,
        profitAndLoss: calculationData.profitAndLoss,
        profitAndLossPercentage: calculationData.profitAndLossPercentage
    })
})

const sc = props.stockCalculate

const stockCalculation = () => {
    sc.setMarketPrice(calculationData.marketCosts === null ? 0 : calculationData.marketCosts);
    sc.setType(calculationData.stockType);
    calculationData.sellCharge = sc.getSellCharge();
    calculationData.taxes = sc.getTaxes();
    calculationData.marketValue = sc.getMarketValue();
    calculationData.anticipatedRevenue = sc.getAnticipatedRevenue();
    calculationData.profitAndLoss = sc.getProfitAndLoss();
    calculationData.profitAndLossPercentage = sc.getProfitAndLossPercentage();
}

const priceUpdate = (data) => {
    calculationData.marketCosts = data
}
const valueClear = (data) => {
    calculationData.marketCosts = data.newPrice
}

</script>

<template>
    <div class="sell-box theme-style-box">
        <div class="title-box">
            <h4>賣出</h4>
        </div>
        <div class="input-box">
            <div class="input-box-class">
                <label>賣價：</label>
                <input type="number" id="marketCosts" v-model.number="calculationData.marketCosts"
                    @input="stockCalculation()" min="0">
                <span>元</span>
            </div>
            <PriceButtonController 
                :inputPrice="calculationData.marketCosts"
                @click="stockCalculation()" @priceUpdate="priceUpdate" @valueClear="valueClear" />

        </div>
    </div>
</template>