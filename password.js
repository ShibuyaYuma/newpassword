let newChars="";//使用しない文字列を抜いた文字列

let showHide = 0;
let clickCreatePWBtn = 0;
const allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()=~^-\\@`[{;+:*]},<.>/?\_";
let targetChars = "";
const len = document.getElementById('strLength');


function createPW(){
    let str = "";
    targetChars = document.getElementById('text').value.split("");
    newChars= [...allChars].filter(char => !targetChars.includes(char)).join("");
    if(newChars==""){
        alert("パスワードを作成できません");
    }
    else{
        for(i=0;i<len.value;i++){
            const randomIndex = Math.floor(Math.random() * newChars.length);
            str +=newChars[randomIndex];
        }
        
        return str;
    }
}

function createPWEvent(button,result){
    
    button.addEventListener('click', ()=>{
        
        clickCreatePWBtn ++;
        const password= createPW();
        if(showHide%2==1){
            let hide ="";
            for(i=0;i<len.value;i++){
                hide +=".";
            }
            result.textContent = hide;
        }
        else{
            result.textContent = password;
        }
    });
}

function copyPW(button,result){
    //alert("CPP");
    button.addEventListener('click', ()=>{
        
        if(result.textContent=="Password"){
            alert("パスワードを作成してください");
        }
        else{
            alert("パスワードをコピーしました");
            navigator.clipboard.writeText(result.textContent);
        }
    });
}

function hidePW(button,result){
    button.addEventListener('click', ()=>{
        if(result.textContent=="Password"){
            alert("パスワードを作成してください");
        }
        else{
            showHide++;
            printResult();
        }
    });
}

function duplicate(button,result){
    // 親要素（container）を取得
    const container = document.getElementById('container');
        
    // 元の要素（password-container）を取得
    const original = document.querySelector('.password-container');
    
    // 元の要素を複製
    const newContainer = original.cloneNode(true);
    
    // 新しい複製要素に含まれるボタンと結果表示要素を取得
    const newButton = newContainer.querySelector('#createPassword');
    const newResult = newContainer.querySelector('#result');
    const newShowHideButton = newContainer.querySelector('#showHide');
    const newCopyButton = newContainer.querySelector('#copy');
    
    // 新しい複製要素に含まれる結果表示要素の内容を空欄にリセット
    newResult.textContent = "Password";
    
    // 新しい複製要素に含まれるパスワード生成ボタンにイベントリスナーを設定
    createPWEvent(newButton, newResult);
    
    // 新しい複製要素に含まれる表示/非表示ボタンにイベントリスナーを設定
    hidePW(newShowHideButton, newResult);
    
    // 新しい複製要素に含まれるコピー機能ボタンにイベントリスナーを設定
    copyPW(newCopyButton, newResult);
    
    // 新しい複製要素を親要素（container）に追加
    container.appendChild(newContainer);
}

document.addEventListener("DOMContentLoaded" , () =>{
    
    const createPWBtn = document.getElementById('createPassword');//オブジェクトを取得
    const copyBtn = document.getElementById('copy');//オブジェクトを取得
    const showHideBtn = document.getElementById('showHide');//オブジェクトを取得
    const printResult = document.getElementById('result');//オブジェクトを取得
    
          
    createPWEvent(createPWBtn,printResult);
    copyPW(copyBtn,printResult);
    hidePW(showHideBtn,printResult);

});

document.getElementById('add').addEventListener('click', duplicate);