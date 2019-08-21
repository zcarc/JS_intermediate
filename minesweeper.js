


document.querySelector('#execute').addEventListener('click', function(){

    var horizontal = parseInt(document.querySelector('#horizontal').value);
    var vertical = parseInt(document.querySelector('#vertical').value);
    var mine = parseInt(document.querySelector('#mine').value);

    console.log(horizontal, vertical, mine);

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

});