let newChars="";//使用しない文字列を抜いた文字列
const allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()=~^-\\@`[{;+:*]},<.>/?\_";
let targetChars = "";
let copyStr = "";
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

//パスワード作成関数
function createPWEvent(button,result){
    //クリックイベント
    button.addEventListener('click', ()=>{
        //createPW関数の戻り値をpassword変数に入れる
        const password= createPW();
        result.textContent = password;
        copyStr = password;
       
    });
}

//パスワードコピー関数
function copyPW(button,result){
    //クリックイベント
    button.addEventListener('click', ()=>{
        //テキストボックスが初期値の場合
        if(result.textContent=="Password"){
            alert("パスワードを作成してください");
        }
        //テキストボックスが初期値以外の場合
        else{
            alert("パスワードをコピーしました");
            if(copyStr!==""){
                navigator.clipboard.writeText(copyStr);
            }
            else{
                navigator.clipboard.writeText(result.textContent);
            }
        }
    });
}

//表示非表示切替関数
function hidePW(button,result){
    
    const arry=[];
    let hide ;
    button.addEventListener('click', ()=>{
        if(result.textContent !== hide){
            arry.push(result.textContent);
        }
        if(result.textContent=="Password"){
            alert("パスワードを作成してください");
        }
        else{
            hide = "";
            for(i=0;i<result.textContent.length;i++){
                hide+='●';
            }
            
            const isResult = arry[arry.length-1];
            const isHidden = result.textContent === isResult;
            result.textContent = isHidden ? hide : arry[arry.length-1];
            copyStr = arry[arry.length-1];
            
        }
    });
}

//複製関数
function duplicate(){
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
    
    // 新しい複製要素に含まれるパスワード作成ボタンにイベントリスナーを設定
    createPWEvent(newButton, newResult);
    
    // 新しい複製要素に含まれる表示/非表示ボタンにイベントリスナーを設定
    hidePW(newShowHideButton, newResult);
    
    // 新しい複製要素に含まれるコピー機能ボタンにイベントリスナーを設定
    copyPW(newCopyButton, newResult);
    
    // 新しい複製要素を親要素（container）に追加
    container.appendChild(newContainer);
}


//起動時に実行
document.addEventListener("DOMContentLoaded" , () =>{
    
    const createPWBtn = document.getElementById('createPassword');//オブジェクトを取得
    const copyBtn = document.getElementById('copy');//オブジェクトを取得
    const showHideBtn = document.getElementById('showHide');//オブジェクトを取得
    const printResult = document.getElementById('result');//オブジェクトを取得
    
          
    createPWEvent(createPWBtn,printResult);
    copyPW(copyBtn,printResult);
    hidePW(showHideBtn,printResult);

});

//追加ボタンクリック時のイベント
document.getElementById('add').addEventListener('click', duplicate);