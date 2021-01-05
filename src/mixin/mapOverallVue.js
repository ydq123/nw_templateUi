import Vue from 'vue';
const { plugins } = window;
const navigator = window.navigator;
// 定义原生方法
Vue.prototype.Geolocation = {
    async getCurrentPosition(options = {}) {
        console.log(options);
        return [];
    },
    watchPosition(options = {}, callback) {
        console.log(options, callback);
    }
};
// 设置手机常量与否
Vue.prototype.toKeepScreenOnOrNot = function (state) {
    const onDeviceReady = function () {
        state ? window.plugins.insomnia.keepAwake() : window.plugins.insomnia.allowSleepAgain();
    };
    document.addEventListener('deviceready', onDeviceReady, false);
};
// 手机状态栏
Vue.prototype.toTransparentStatusBar = function () {
    const onDeviceReady = function () {
        if (window.StatusBar.isVisible) {
            window.StatusBar.overlaysWebView(true);
            window.StatusBar.styleDefault();
        }
    };
    document.addEventListener('deviceready', onDeviceReady, false);
};
// 设置手机常量与否
Vue.prototype.appDownload = function (appUrl, fileURL) {
    alert('app下载' + appUrl + fileURL);
};
// Toast弹框 https://capacitorjs.com/docs/apis/toast
Vue.prototype.Toast = {
    async show(msg, configs = {}) {
        return await plugins.toast.showWithOptions({
            message: msg,
            duration: configs.duration || 'short',
            position: configs.position || 'bottom',
            addPixelsY: -40 // added a negative value to move it up a bit (default 0)
        });
    }
};
// Modals 弹框 https://capacitorjs.com/docs/apis/modals
Vue.prototype.Modals = {
    // alert 警告弹框
    async alert(title, msg, yes, configs = {}) {
        await navigator.notification.alert(msg, function () {
            if (yes) {
                yes();
            }
        }, title, configs.buttonTitle);
    },
    // confirm 确认弹框
    async confirm(title, msg, yes, configs = {}) {
        const buttonLabels = [configs.ok || '确认', configs.cancel || '取消'];
        const confirmCallback = function (buttonIndex) {
            if (yes) {
                yes(buttonIndex === 1); // ConfirmResult{value : boolean;}
            }
        };
        await navigator.notification.confirm(msg, confirmCallback, title, buttonLabels);
    },
    // prompt 询问弹框
    async prompt(title, msg, yes, configs = {}) {
        const defaultText = configs.inputText || '';
        const buttonLabels = [configs.ok || '确认', configs.cancel || '取消'];
        const promptCallback = function (buttonIndex, value) {
            if (yes) {
                yes({ cancelled: buttonIndex !== 1, value }); // PromptResult{cancelled : boolean; value : string;}
            }
        };
        await navigator.notification.prompt(msg, promptCallback, title, buttonLabels, defaultText);
    }
};