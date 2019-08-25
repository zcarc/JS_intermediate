var tbody = document.querySelector('#table tbody');
var dataset = [];


document.querySelector('#execute').addEventListener('click', function(){

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

            td.addEventListener('contextmenu',function(e){
                console.log('e: ', e);

                // 아래의 두개의 값은 동일하다.
                console.log('e.currentTarget: ', e.currentTarget);
                console.log('td: ', td);


                // target은 현재 td 자체를 의미한다.
                // e.currentTarget 과 e.target은 차이가 있다.

                // e.currentTarget
                // e.target

                var parentOfTd = e.currentTarget.parentNode;
                var parentOfTr = parentOfTd.parentNode;
                console.log('parentOfTd: ', parentOfTd);
                console.log('parentOfTr: ', parentOfTr);


                // console.log('parentOfTd.children.indexOf(e.currentTarget):', parentOfTd.children.indexOf(e.currentTarget));
                // children 에서는 idnexOf 함수가 존재하지 않는다.
                // 하지만 이렇게 indexOf  함수를 사용하지 못하는 경우에 사용할 수 있게끔 만들어주는 함수가 존재한다.
                // Array.prototype.indexOf.call() 이라는 함수이다.
                // 첫번째 파라미터에 배열 형식으로 되어있는 파라미터를 넣고
                // 두번째 파라미터에 인덱스를 찾고 싶은 element를 넣는다.

                var column = Array.prototype.indexOf.call(parentOfTd.children, e.currentTarget);
                var row = Array.prototype.indexOf.call(parentOfTr.children, parentOfTd);

                console.log('column: ', column);
                console.log('row: ', row);

                //자바스크립트에서 무조건 알아야 하는 것
                // 스코프, 실행 컨텍스트, 프로토 타입, 비동기, 클로저이다.


                // 화면에 느낌표를 넣어주고
                e.currentTarget.textContent = '!';

                // 데이터상의 2차원 배열도 느낌표를 넣어준다.
                dataset[row][column] = '!';

                // 위와 같은 방식으로 항상 화면과 데이터를 일치시켜야한다.


                console.log('dataset[row][column]: ', dataset[row][column]);

                
            })

            td.textContent = 3;
            tr.appendChild(td);
            
            data.push(1);
        }
        tbody.appendChild(tr);

    }

    console.log('dataset: ', dataset);




    // Draw out mine location.
    var candidate = Array(horizontal * vertical).fill().map(function (Element, Index) {
        return Index;
    })
    
    console.log(candidate);
    console.log(candidate.length);
    
    // 피셔 예이츠 셔플 이라는 알고리즘이다.
    var fisherYatesShuffle = [];
    
    while(candidate.length > 80) {
        var math = Math.floor( Math.random() * candidate.length );
        console.log('math: ', math);
        var value = candidate.splice( math , 1 )[0];
        fisherYatesShuffle.push(value);
    }
    
    console.log(fisherYatesShuffle);
    


 
    // Land mine.
    for(var k = 0; k < fisherYatesShuffle.length; k++) {

        var horizontalLocation =  Math.floor(fisherYatesShuffle[k] / 10);
        var verticalLocation = fisherYatesShuffle[k] % 10;

        

        console.log('fisherYatesShuffle[k]: ', fisherYatesShuffle[k]);
        console.log('fisherYatesShuffle[k] / 10: ', fisherYatesShuffle[k] / 10);
        console.log('Math.floor(fisherYatesShuffle[k] / 10): ', horizontalLocation);
        console.log('fisherYatesShuffle % 10: ', verticalLocation);
        tbody.children[horizontalLocation].children[verticalLocation].textContent = 'X';
        dataset[horizontalLocation][verticalLocation] = 'X';
    }

    console.log('after Land mine dataset: ', dataset);

});



// 마우스 오른쪽 클릭 이벤트
// contextmenu 이벤트
// tbody.querySelectorAll('td').forEach(function (item){
//     item.addEventListener('contextmenu', function(){
//         console.log('오른쪽 클릭');
//     })
// })
