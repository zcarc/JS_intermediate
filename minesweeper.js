var tbody = document.querySelector('#table tbody');
var dataset = [];


document.querySelector('#execute').addEventListener('click', function(){

    tbody.innerHTML = '';

    var horizontal = parseInt(document.querySelector('#horizontal').value);
    var vertical = parseInt(document.querySelector('#vertical').value);
    var mine = parseInt(document.querySelector('#mine').value);

    console.log(horizontal, vertical, mine);

    // Create mine table.
    for(var i = 0; i < horizontal; i += 1) {

        var tr = document.createElement('tr');
        var data = [];
        dataset.push(data);

        for(var j  = 0; j < vertical; j += 1) {

            var td = document.createElement('td');

            //////////////////////////////////////////////////
            // td 오른쪽 클릭 시
            td.addEventListener('contextmenu',function(e){
                //console.log('e: ', e);


                //console.log('e.currentTarget: ', e.currentTarget);


                // target은 현재 td 자체를 의미한다.
                // e.currentTarget 과 e.target은 차이가 있다.

                // e.currentTarget
                // e.target

                var parentTr = e.currentTarget.parentNode;
                var parentTbody = parentTr.parentNode;
                //console.log('parentTr: ', parentTr);
                //console.log('parentTbody: ', parentTbody);


                // console.log('parentTr.children.indexOf(e.currentTarget):', parentTr.children.indexOf(e.currentTarget));
                // children 에서는 idnexOf 함수가 존재하지 않는다.
                // 하지만 이렇게 indexOf  함수를 사용하지 못하는 경우에 사용할 수 있게끔 만들어주는 함수가 존재한다.
                // Array.prototype.indexOf.call() 이라는 함수이다.
                // 첫번째 파라미터에 배열 형식으로 되어있는 파라미터를 넣고
                // 두번째 파라미터에 인덱스를 찾고 싶은 element를 넣는다.

                var elementTd = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var elementTr = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                //console.log('elementTd: ', elementTd);
                //console.log('elementTr: ', elementTr);

                //자바스크립트에서 무조건 알아야 하는 것
                // 스코프, 실행 컨텍스트, 프로토 타입, 비동기, 클로저이다.


                // 화면에 느낌표를 넣어주고
                //e.currentTarget.textContent = '!';

                // 데이터상의 2차원 배열도 느낌표를 넣어준다.
                //dataset[elementTr][elementTd] = '!';
                // 위와 같은 방식으로 항상 화면과 데이터를 일치시켜야한다.


                //console.log('dataset[elementTr][elementTd] === "X": ', dataset[elementTr][elementTd] === 'X');

                //console.log('e.currentTarget.textContent:', e.currentTarget.textContent);
                

                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {

                    e.currentTarget.textContent = '!';

                    // 데이터를 변경하지 않아도 되는 이유는 화면만 바꾸면 되기 때문이다.
                    // 원래 데이터는 그대로 유지된 채로 빈칸, !, ? X 만 보여주고
                    // 해당 데이터로 지뢰인지 아닌지 구분해야하기 때문에 
                    // 이러한 값들을 변경한다면 어떤 데이터가 지뢰인지 알 수가 없다.
                    //dataset[elementTd][elementTr] = '!';

                } else if (e.currentTarget.textContent === '!') {

                    e.currentTarget.textContent = '?';
                    //dataset[elementTd][elementTr] = '?';

                } else if (e.currentTarget.textContent === '?') {

                    // 화면상에 '?' 인 경우 해당 그 자리에 지뢰가 있지 않은 경우
                    if(dataset[elementTr][elementTd] === 1) {
                        e.currentTarget.textContent = '';

                    } else if(dataset[elementTr][elementTd] === 'X') {
                        e.currentTarget.textContent = 'X';
                    }

                    //e.currentTarget.textContent = '';
                    //dataset[elementTd][elementTr] = '1'; // 데이터가 빈칸일 때는 문자열 '1'을 넣어줘야한다.

                }

                
            }) // td 오른쪽 클릭 시
            //////////////////////////////////////////////////

            // td 왼쪽 클릭 시
            td.addEventListener('click', function(e) {

                var parentTr = e.currentTarget.parentNode;
                var parentTbody = parentTr.parentNode;

                var elementTd = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var elementTr = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if(dataset[elementTr][elementTd] === 'X') {
                    e.currentTarget.textContent = '펑';

                } else {

                    var around = [
                        dataset[elementTr][elementTd - 1], dataset[elementTr][elementTd + 1],
                    ];

                    // 선택된 칸의 윗칸이 있을 때
                    if(dataset[elementTr - 1]) {
                        around = around.concat(dataset[elementTr - 1][elementTd - 1], dataset[elementTr - 1][elementTd], dataset[elementTr - 1][elementTd + 1]);

                    } 

                    // 선택된 칸의 아래칸이 있을 때
                    if(dataset[elementTr + 1]) {
                        around = around.concat(dataset[elementTr + 1][elementTd - 1], dataset[elementTr + 1][elementTd], dataset[elementTr + 1][elementTd + 1]);

                    }

                    // 필터는 return 조건이 true일 때 해당 요소 자체를 리턴한다.
                     e.currentTarget.textContent = around.filter(function(e){
                        return e === 'X';

                    }).length;
                }

            });


            td.textContent = '';
            tr.appendChild(td);
            
            data.push(1);

        } // vertical for문
        
        tbody.appendChild(tr);

    } // horizontal for문

    console.log('dataset: ', dataset);




    // Draw out mine location.
    var candidate = Array(horizontal * vertical).fill().map(function (Element, Index) {
        return Index;
    })
    
    //console.log(candidate);
    //console.log(candidate.length);
    
    // 피셔 예이츠 셔플 이라는 알고리즘이다.
    var fisherYatesShuffle = [];
    
    while(candidate.length > 80) {
        var math = Math.floor( Math.random() * candidate.length );
        //console.log('math: ', math);
        var value = candidate.splice( math , 1 )[0];
        fisherYatesShuffle.push(value);
    }
    
    console.log(fisherYatesShuffle);
    


 
    // Land mine.
    for(var k = 0; k < fisherYatesShuffle.length; k++) {

        // 예를 들어 53이라면 
        // 5가 horizontalLocation
        // 3이 verticalLocation
        var horizontalLocation =  Math.floor(fisherYatesShuffle[k] / 10);
        var verticalLocation = fisherYatesShuffle[k] % 10;

        

        //console.log('fisherYatesShuffle[k]: ', fisherYatesShuffle[k]);
        //console.log('fisherYatesShuffle[k] / 10: ', fisherYatesShuffle[k] / 10);
        //console.log('Math.floor(fisherYatesShuffle[k] / 10): ', horizontalLocation);
        //console.log('fisherYatesShuffle % 10: ', verticalLocation);
        tbody.children[horizontalLocation].children[verticalLocation].textContent = 'X';
        dataset[horizontalLocation][verticalLocation] = 'X';
    }

    //console.log('after Land mine dataset: ', dataset);

});


// addEventListener 를 단 대상과 실제로 eventListener가 발생하는 그 Target은 다를 수 있다.
// eventListener를 단 대상이 currentTarget이고 이벤트가 실제로 발생하는 얘가 target이다.
tbody.addEventListener('contextmenu', function(e){
    console.log('e.currentTarget: ', e.currentTarget);
    console.log('e.target: ', e.target);
    
})


// 8-7. 스코프
// var x = 'global';

// function ex(){
//     var x = 'local';
//     x = 'change';
// }

// ex();
// console.log(x);


// 8-8. 스코프 체인 : 스코프 간의 상하관계를 스코프 체인이라고 부른다.
var name = 'zero';
function outer() {
    console.log('외부', name); // 외부 zero
    function inner() {
        var enemy = 'nero';
        console.log('내부', name);
    }
    inner();
}
// inner() 함수 내부에 name이 없으면
// 바깥으로 나가서 outer에서 찾는다.
// outer에서도 없으면 outer 바깥의 전체범위에서 찾는다.

outer();

// enemy는 inner() 함수 내부에는 있지만 
// 전체범위 내에서 함수 내에 있는 변수에는 접근할 수 없다.
// console.log(enemy);


// 8-9. 렉시컬 스코프 : 정적 범위 변수나 함수가 정의된 뒤로 그 변수나 함수의 범위는 정적이고 변하지 않는다.
// 동적 스코프인 경우는 최근에 할당 받은 변수를 호출하지만 정적 스코프는 그렇지 않다.
var name = 'zero';

function log() {
    console.log(name);
}

function wrapper() {
    var name = '비밀번호(바보)';
    log();
}

wrapper();

// 8-10. 클로저
// for(var i = 0; i < 100; i++){ // 0.00000001초 만에 i는 100이 된다.

//     // 익명함수인 비동기함수는 실행되는 그 순간에 i의 값이 정해지는데
//     // 비동기이기때문에 for문은 이미 100번을 돌았고
//     // i * 1000 이 부분은 순차적으로 증가는하나 
//     //
//     // console.log(i)는 익명함수가 호출되는 순간 i의 값을 찾아서 호출한다.
//     setTimeout(function () {
//          console.log(i);
//     }, i * 1000);

// }



// 8-11. 클로저 문제 해결법
// for(var i = 0; i < 100; i++){


//     function closure(j){

//         // 매개변수 j는 함수 내에서 변수를 선언한 것과 같은 의미이다.
//         // 예를 들어 var k = 0; 이라고 초기화했다면 
//         // 직접 초기화한 변수와 매개변수 j는 같은 스코프로 사용된다.
//         setTimeout(function(){
//             console.log('j: ', j);
//         }, j * 1000);

//     }

//     closure(i);
// }


// 즉시실행 함수를 사용해서 클로저 문제 해결
for(var i = 0; i < 100; i++){


    (function closure(j){

        // 매개변수 j는 함수 내에서 변수를 선언한 것과 같은 의미이다.
        // 예를 들어 var k = 0; 이라고 초기화했다면 
        // 직접 초기화한 변수와 매개변수 j는 같은 스코프로 사용된다.
        setTimeout(function(){
            console.log('j: ', j);
            console.log('j * 1000: ', j * 1000);
        }, j * 1000);

    })(i);

}