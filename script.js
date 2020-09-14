// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==


let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/":['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна'],
     "crushdrummers.ru":['Барабанное шоу','Заказать барабанное шоу','Шоу барабанщиков в Москве']
};
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let yandexInput = document.getElementsByName('text')[0];
let keywords = sites[site];
let keyword = keywords[getRandom(0,keywords.length-1)];
let btn = document.getElementsByClassName('button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited')[0];
let nextPage = document.getElementsByClassName('pager__item_kind_next')[0];
let i=0;
let links = document.links;

if (btn != undefined){
    document.cookie = "site="+site;
}else if (location.hostname == "yandex.ru"){
    site = getCookie("site");
}else{
    site = location.hostname;
}

    if (btn != undefined){
        document.cookie = "site="+site;
        let timerId = setInterval(()=>{
            yandexInput.value += keyword[i];
            i++;
        if (i==keyword.length){
            clearInterval(timerId);
            btn.click();
        }
    },1000);
}else if(location.hostname == site){
    setInterval(()=>{
        let index = getRandom(0,links.length);
        if (getRandom(0,101)>=80){
        location.href = 'https://yandex.ru/';
        }
        else if(links[index].href.indexOf(site) != -1)
            links[index].click();
    },getRandom(3000,7000));
}else{
    let nextYandexPage = true;
    for(i=0; i<links.length; i++){
        if(links[i].href.indexOf(site ) != -1){
            let link = links[i];
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
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
