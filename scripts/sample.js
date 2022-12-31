const myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

let iceCream = 'チョコレート';
if (iceCream !== 'チョコレート') { // 比較演算子は"==="、否定は"!=="
  alert('やった、チョコレートアイス大好き！');
} else {
  //alert('あれれ、でもチョコレートは私のお気に入り......');
}

let myHTML = document.querySelector('html');
myHTML.addEventListener('click', function () {
  alert('痛っ! つつかないで!');
});

function multiply(num1,num2) {
    let result = num1 * num2;
    return result;
  }