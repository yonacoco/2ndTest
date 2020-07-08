$(document).ready(() => { 
    $('#searchBtn').on('click', ()=> handleSearch($('#input').val()));
    $('#all').on('click', handleAll);
    $("form").on('submit', () => {
        handleSearch($('#input').val());
        return false;
    });
});

function getAllCountries(cb) {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", function() {
		cb(this.response);
	});
	xhr.open("GET", "https://restcountries.eu/rest/v2/all?fields=name;topLevelDomain;capital;currencies;flag;borders");
	xhr.responseType = "json";
	xhr.send();
};

function handleAll() {
    getAllCountries((data)=> {
        createTable(data, $('#tableContainer'));
    });
}

function getCountryByName(country_name, cb) {
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("load", function() {
        cb(this.response);
	});
	xhr.open("GET", "https://restcountries.eu/rest/v2/name/"+country_name+"?fields=name;topLevelDomain;capital;currencies;flag;borders");
	xhr.responseType = "json";
	xhr.send();
};

function handleSearch(value) {
    if(value.length == 0) {
        alert("Please enter country name...");
    }else {
        getCountryByName(value, (data)=> {
            $('#input').value = "";
            createTable(data, $('#tableContainer'));
        });
    }
    
};

function createTable(rows, container) {
    var html = '<table style="border: 1px solid black;text-align:center;">';
    html += '<tr>';
    for(var j in rows[0]) {
        html += '<th>' + j + '</th>';
    }
    html += '</tr>';
    for(var i = 0; i < rows.length; i++) {
        html += '<tr>';
    for(var j in rows[i]) {
        if(j === "flag") {
            html += '<td><img width="50px" height="50px" src="' + rows[i][j] + '" /></td>';
        } 
        else if(j === "name") {
            html += '<td>' + rows[i][j] + '</td>';
        }
        else if(j === "currencies") {
            r = "";
            for(let value of rows[i][j]) {
                r += "<p>"+value["code"] + ":" + value["name"] +" " +value["symbol"] + "</p>"
            }
             html += '<td>' + r + '</td>';
        }
        else {
            html += '<td>' + rows[i][j] + '</td>';
        }
    }
    html += '</tr>';
    }
    html += '</table>';
    container.html(html) ;
};