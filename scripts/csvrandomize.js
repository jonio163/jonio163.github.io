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
        let arr =[]; //2次元配列
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
            /*
            for(j = 0; j < 6; j++){
                stuck[j] = arr[i][j];
                if(i < 5){
                    stuck[0] = "対義語"
                }else{
                    stuck[0] = "類義語"
                }
            }
            arr[i][0] = stuck[0];
            arr[i][1] = stuck[1];
            arr[i][2] = ' ';
            arr[i][3] = stuck[5];
            */
            
            arr[i][0] = "(" + (i+1) +  ")";


        }

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

/*
    function arrayShuffle(array) {
        for(var k = (array.length - 1); 0 < k; k--){
      
          // 0〜(k+1)の範囲で値を取得
          var r = Math.floor(Math.random() * (k + 1));
      
          // 要素の並び替えを実行
          var tmp = array[k];
          array[k] = array[r];
          array[r] = tmp;
        }
        return array;
    }
*/
   
}