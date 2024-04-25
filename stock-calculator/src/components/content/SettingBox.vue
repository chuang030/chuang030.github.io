<script setup>
import { reactive, ref, watch } from 'vue';
import securitiesFirmsRate from '../../data/SecuritiesFirmsRate.json'

const modelBox = reactive({
    simple: true,
    full: false,
    sttingInstructionIsShow: false
})

const modelBoxItemIsShow = () => {
    modelBox.simple = !modelBox.simple,
    modelBox.full = !modelBox.full
}

const showSttingInstruction = () => {
    modelBox.sttingInstructionIsShow = !modelBox.sttingInstructionIsShow
}

const securitiesFirms = ref(1);

const securitiesFirmsSelect = (selected) => {
    securitiesFirms.value = selected
}

const emit = defineEmits(['update'])

watch([
    modelBox,
    securitiesFirms
],
(data) => {
    emit('update', {
        modelBox: data[0],
        securitiesFirms: data[1]
    })
})

</script>

<template>
    <div class="setting-box">
        <div class="title-box">
            <h4>設置</h4>
        </div>
        <div id="model-box" class="set-model-box">
            <div class="set-model-box-item" @click="modelBoxItemIsShow()">
                <div id="simple" class="model-item-btn" :class="{ active: modelBox.simple }">
                    <p>簡單計算</p>
                </div>
                <div id="full" class="model-item-btn" :class="{ active: modelBox.full }">
                    <p>詳細計算</p>
                </div>
            </div>
            <div id="icon" class="set-model-box-item" @click="showSttingInstruction"
                :class="{ active: modelBox.sttingInstructionIsShow }"><i class="fas fa-exclamation"></i></div>
        </div>
        <div class="securities-firms-box">
            <label for="securitiesFirms">選擇券商：</label>
            <select id="securitiesFirms" name="securitiesFirms"
                v-model.number="securitiesFirms" @change="securitiesFirmsSelect(securitiesFirms)">
                <option value="0">無</option>
                <option v-for="(data, key) in securitiesFirmsRate.data" :key="key" :value="key + 1">{{ data.name }}</option>
            </select>
        </div>
    </div>
</template>

<style lang="scss"></style>