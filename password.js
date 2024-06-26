function button1Click(){//パスワード作成ボタンを押したときに実行される関数
    
    password ="";//パスワードを格納する文字列
    hidden="";//非表示パスワード
    let newChars="";//使用しない文字列を抜いた文字列
    const allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()=~^-\\@`[{;+:*]},<.>/?\_";
    const targetChars = document.getElementById('text').value.split("");
    const len=document.getElementById('strLength');
    
  
      for(i=0;i<10;i++){
        newChars= [...allChars].filter(char => !targetChars.includes(char)).join("");
        
      }
      
    if(newChars==""){
      alert("パスワードを作成できません");
    }
    else{
      button1Count++;
      for(i=0;i<len.value;i++){
        password +=newChars[Math.floor(Math.random() * newChars.length)];
          hidden +=".";
      }

      if(showHide%2==1){
        document.getElementById("result").textContent = `${password}`;
      }
      else{
        document.getElementById("result").textContent = `${hidden}`;
      }
    }
  }

function button2Click(){//コピーボタンを押したときに実行される関数
  if(button1Count==0){
    alert("パスワードを作成してください");
  }
  else{
    alert("パスワードをコピーしました");
    navigator.clipboard.writeText(password);
  }
}

function button3Click(){//表示/非表示ボタンを押したときに実行される関数
  if(button1Count==0){
    alert("パスワードを作成してください");
  }
  else{
    showHide ++;
    if(showHide%2==1){
      document.getElementById("result").textContent = `${password}`;
    }
    else{
    document.getElementById("result").textContent = `${hidden}`;
    }
  }
}



let password;
let hidden;
let showHide = 0;
let button1Count =0;
let i = 0;
let num1=0;

const button1 = document.getElementById('createPassword');
button1.addEventListener('click', button1Click);

const button2 = document.getElementById('copy');
button2.onclick = button2Click;

const button3 = document.getElementById('showHide');
button3.onclick = button3Click;

function cloneButton() {
  const clone = button1.cloneNode(true);
  clone.id = ""; // 新しいボタンのIDをクリア
  document.getElementById('buttons-container').appendChild(clone);
  clone.addEventListener('click', button1Click); // 新しいボタンにイベントリスナーを追加
}

// 複製ボタンの取得とイベントリスナーの追加
const cloneButtonElement = document.getElementById('add');
cloneButtonElement.addEventListener('click', cloneButton);