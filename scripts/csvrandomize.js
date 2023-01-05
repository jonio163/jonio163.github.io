let AnswerTable = [];
let MyAnswer = [];
let Marubatsu = [];

let fight = 2; // debug value

window.onload =function(){

    //出力場所を探す
    let output =document.getElementById("output");
    //CSVの指定
    getCsv('https://jonio163.github.io/List_SynAnt.csv');
  
    //CSVの取り込み
    function getCsv(data){
        // HTTPでファイルを読み込む
        let xhr = new XMLHttpRequest(); 
        //取得するファイルの設定
        xhr.open("GET",data,true);
        //レスポンスの確認
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {//4は完了
                if (xhr.status === 200) {//Done or load
                //console.log(xhr.responseText);
                let responce = xhr.responseText;
                csvArr(responce);
                } else {
                console.error(xhr.statusText);
                }
            }
        };
       //リクエストの要求送信
       xhr.send(null);
    }

    // 1 ~ 変数のうちいずれかの整数値をランダムに返す
    function getRandomInt(max) {
        return Math.trunc(Math.random() * max) + 1; //最初の配列はヘッダのため0を含めない
    }

    function csvArr(dataArr){
        let arr =[]; //2次元配列、実際に表示するファイル
        let j = 0;
        let dupli = []; //問題IDを管理
        let stuck = []; //csvから出力のための成形
        let list = dataArr.split('\n');
        let WordList = [];
        //帰ってきているレスポンスを配列に格納する
        for(let i = 0; i < 10  ;i++){
            let check = 0;
            let Randomer = getRandomInt(45);
            if(i > 4){
                Randomer = Randomer + 100;
            }
            dupli[i] = Randomer;
            if(i !== 0){
                for(j = 0; j < i; j++){
                    if(dupli[j] === Randomer){
                        check = 1;
                    }
                }
            }
            if(check === 1){
                i--;
                continue;
            }
            arr[i] = list[Randomer].split(',');
            arr[i][0] = "(" + (i+1) +  ")";
        }

        AnswerTable = JSON.parse(JSON.stringify(arr));

        fight = fight + 2;

        for(j = 0; j < 10; j++){
            WordList[j] = arr[j][2];
            delete arr[j][2];
            delete arr[j][3];
            delete arr[j][4];
            delete arr[j][5];
        }

        for(j = 0; j < 5; j++){
            arr[j][2] = arr[j+5][0];
            arr[j][3] = arr[j+5][1];
        }

        WordList.sort((a, b) => a.localeCompare(b), 'ja'); //五十音順に並べ替え
        arr[5] = WordList.slice();
        arr[5][0] = "語群";
        for(j = 1; j < 10; j++){
            delete arr[5][j];
        }
        arr[6] = WordList.slice();

        for(j = 0; j < 5; j++){
            stuck[j] = WordList[j+5];
            delete WordList[j+5];
            delete arr[6][j+5];
        }

        arr[7] = stuck.slice();

        delete arr[8];
        delete arr[9];
        delete arr[10];

        //console.log(arr);
        htmlWrite(arr);//出力をtableに設定する   
    }

    //alert(AnswerTable[2]);
  
    //出力のタグを設定
    function htmlWrite(dataList){
        let insert ="";
        dataList.forEach(element => {
            insert +='<tr>';
            element.forEach((childElement) =>{
                insert +=`<td>${childElement}</td>`;
            });
            insert +='</tr>'
        });
        
        //HTMLに出力
        output.innerHTML = insert;
    }
}

/*
var check = function()
    {
        var n = 0;

        for(i = 0; i < document.frm.elements["inq[]"].length; i++)
        {
            // document.frm.elements["inq[]"][i].checked //チェックを判別
            // document.frm.elements["inq[]"][i].value;  //値を取り出す

            if(document.frm.elements["inq[]"][i].checked)
            {
                // IDを利用してラベルのテキストを取得
                // document.getElementById("label_" + document.frm.elements["inq[]"][i].id).innerText
                n++;
            }
        }

        if(n === 0)
        {
            alert("チェックが１つもありません！");
            return false;
        }
        else
        {
            return true;
        }
    }
    */

    //採点パート//////////////////////////

const submitButton = document.getElementById('submit-button');
   
const clickHandler = () => {
    let score = 0;
    for(i = 0; i < 10; i++){
        const answerInput = document.getElementById(`answer-input${i+1}`);
        MyAnswer[i] = answerInput.value;
        if (AnswerTable[i][3] === answerInput.value) {
            score++;
            Marubatsu[i] = "○";
        } else if (AnswerTable[i][4] === answerInput.value) {
            score++;
            Marubatsu[i] = "○";
        }else{
            Marubatsu[i] = "×";
        }
    }

    if(score === 10){
        window.alert('正解数は' + score + '/' + 10 + 'です！満点！');  
    }else{
        window.alert('正解数は' + score + '/' + 10 + 'です');
    }
    showAllAnswers();
};
      
// ボタンクリックで正誤判定
submitButton.addEventListener('click', () => {
    clickHandler();
});
      
const showAllAnswers = () => {
    const container = document.getElementById('all-answers-container');
    container.style.display = 'block';
        
    const tbody = document.getElementById('all-answers-tbody');
    for (i=0; i < 10; i++) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>(${i+1})${AnswerTable[i][1]}</td><td>${AnswerTable[i][5]}</td><td>${Marubatsu[i]}</td><td>${MyAnswer[i]}</td>`;
        tbody.appendChild(row);
    }
};