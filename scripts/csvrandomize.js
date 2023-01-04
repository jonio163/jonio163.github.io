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
        let arr =[];
        let j = 0;
        let dupli = [];
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
        }
        //console.log(arr);
        htmlWrite(arr);//出力をtableに設定する
      
    }
  
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