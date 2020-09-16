/**
 * DOM元素工具类
 * @author john.gao
 * @date 2020/09/16
 */
export default {
    requestFullscreen(element) {
        if (window.ActiveXObject) {
            let wsShell = new ActiveXObject('WScript.Shell');
            wsShell.SendKeys('{F11}');
        } else if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
    },
    exitFullscreen(element) {
        if (window.ActiveXObject) {
            var wsShell = new ActiveXObject('WScript.Shell');
            wsShell.SendKeys('{F11}');
        } else if (element.requestFullScreen) {
            document.exitFullscreen();
        } else if (element.msRequestFullscreen) {
            document.msExitFullscreen();
        } else if (element.webkitRequestFullScreen) {
            document.webkitCancelFullScreen();
        } else if (element.mozRequestFullScreen) {
            document.mozCancelFullScreen();
        }
    }
}