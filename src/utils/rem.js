// 导出函数 设置html标签的字体大小
export let initRoot = () => {
    let init = ()=> {
        let root = document.documentElement;
        let winWidth = document.documentElement.clientWidth || window.innerWidth;
        if(winWidth > 750 ){
           winWidth = 750;
        }
        root.style['fontSize'] = winWidth / 375 * 37.5 + "px";
    }
    window.addEventListener('resize',init);
    init();
 }