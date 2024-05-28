<script setup>
import { ref } from 'vue';

const navBarState = ref(false);

const navButtonClick = () => {
    navBarState.value = !navBarState.value;
}
</script>

<template>
    <header>
        <div id="nav-open-btn" class="nav-open-btn" @click="navButtonClick()">
            <i class="fas fa-bars"></i>
        </div>
        <div id="nav-bar" class="nav-bar" :class="{'nav-open' : navBarState}" >
            <nav>
                <div class="nav-title"><span><img src="images/icon/TitleIcon.webp" alt=""></span>
                    <p>メニュー</p>
                </div>
                <ul>
                    <li class="active">
                        <a href="javascript:void(0)"><span><img src="/images/icon/Home.webp" alt=""></span>　損益計算</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)"><span><img src="/images/icon/MoneyRecord.webp" alt=""></span>　筆記</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)"><span><img src="/images/icon/Account.webp" alt=""></span>　分帳戶</a>
                    </li>
                    <li>
                        <a href="javascript:void(0)"><span><img src="/images/icon/Description.webp" alt=""></span>　本站說明</a>
                    </li>
                    <li id="nav-close-btn">
                        <a href="javascript:void(0)" @click="navButtonClick()">關閉</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <div id="active-background " class="active-background" :class="{'active' : navBarState}"></div>
</template>

<style lang="scss">
    .nav-open-btn{
        width: 100%;
    }

    div[class="nav-bar nav-open"] {
        transform: scale(1);
        z-index: 110;
    }

    div[class="active-background active"] {
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }
</style>