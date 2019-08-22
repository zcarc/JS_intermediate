


document.querySelector('#execute').addEventListener('click', function(){

    var horizontal = parseInt(document.querySelector('#horizontal').value);
    var vertical = parseInt(document.querySelector('#vertical').value);
    var mine = parseInt(document.querySelector('#mine').value);

    console.log(horizontal, vertical, mine);

    // Create mine table.
    var tbody = document.querySelector('#table tbody');
    var dataset = [];
    for(var i = 0; i < horizontal; i += 1) {

        var tr = document.createElement('tr');
        var data = [];
        dataset.push(data);
        for(var j  = 0; j < vertical; j += 1) {
            var td = document.createElement('td');
            td.textContent = 3;
            tr.appendChild(td);
            
            data.push(1);
        }
        tbody.appendChild(tr);

    }

    console.log(dataset);




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


