// ==UserScript==
// @name         Bot for yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

let keywords = ['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна'];
let keyword = keywords[getRandom(0,keywords.length)];
let btn = document.getElementsByClassName('button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited')[0];

if (btn != undefined){
    document.getElementsByName('text')[0].value = keyword;
    document.getElementsByClassName('button mini-suggest__button button_theme_websearch button_size_ws-head i-bem button_js_inited')[0].click();
}else{
    let links = document.links;

    for(let i=0; i<links.length; i++){
        if(links[i].href.indexOf("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") != -1){
            console.log("Ссылка найдена "+links[i]);
            links[i].click();
            break;
        }
    }
}

function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
