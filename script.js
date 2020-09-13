// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==

let yandexInput = document.getElementsByName('text')[0];
let keywords = ['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна'];
let keyword = keywords[getRandom(0,keywords.length-1)];
let btn = document.getElementsByClassName('button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited')[0];
let nextPage = document.getElementsByClassName('pager__item_kind_next')[0];
let i=0;
let links = document.links;

if (window.location.href.indexOf('yandex.ru') != -1){
    if (btn != undefined){
        let timerId = setInterval(()=>{
            yandexInput.value += keyword[i];
            i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btn.click();
        }
    },1000);
}else{
    let nextYandexPage = true;
    for(i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            nextYandexPage = false;
            links[i].removeAttribute('target');
            setTimeout(()=>{links.click();},getRandom(1000,4000));
            links[i].click();
            break;
        }
    }
    if (nextYandexPage && window.location.href.indexOf('&p=9&') == -1){
        setTimeout(()=>{nextPage.click();},getRandom(1000,4000));
    }
}
}else{
    setInterval(()=>{location.href = 'https://yandex.ru/';},getRandom(3000,7000));
}
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
