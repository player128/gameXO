let count = 0;

function alerts (text) {
    setTimeout(function () {
        alert(text)
    }, 50)
}

function reload () {
    setTimeout(function () {
        location.reload();
    }, 50)
}

let cells = document.querySelectorAll('.field td');
start(cells);

function start(cells) {
    cells.forEach(element => {
        element.addEventListener('click', function step() {
            let stepText = document.querySelector('.step span');
            console.log(stepText);
            if (count % 2 == 0) {
                element.textContent = "X";
                stepText.textContent = "O";
            } else {
                element.textContent = "O";
                stepText.textContent = "X";
            }

            let select_size = document.querySelector('.select-size');
            let value = select_size.value;
            if (value == 'random') random_size ();

            let victory = isVictory(cells);
        
            if (victory) {
                select(victory);
                line(victory);
                alerts(`Выйграл ${element.textContent}`);
                //reload();
            } else if (count == 8){
                alerts(`Ничья!`);
                reload();
            }
        
            count++;
            
            element.removeEventListener('click', step);
        });
    });
}

function isVictory(cells) {
	let combs = [
		[0, 1, 2],// vert
		[3, 4, 5],//vert
		[6, 7, 8],//vert
		[0, 3, 6],//hor
		[1, 4, 7],//hor
		[2, 5, 8],//hor
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let comb of combs) {
		if (
			cells[comb[0]].textContent == cells[comb[1]].textContent &&
			cells[comb[1]].textContent == cells[comb[2]].textContent &&
			cells[comb[0]].textContent != ''
		) {
			return [comb[0], comb[1], comb[2]];
		}
	}
	
	return false;
}

function select(elements) {
    elements.forEach(e => {
        cells[e].classList.add('select');
    });
}

let select_size = document.querySelector('.select-size');
select_size.addEventListener('change', function () {
    let value = this.value;
    let table = document.querySelector('.field');

    if (value == "min") {
        table.classList.add('field__min');
    } else {
        table.classList.remove('field__min');
    }
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max + min);
  }

function random_size () {
    let table_size = document.querySelectorAll('.field td');
    let size = getRandomInt(50, 150);

    table_size.forEach(e => {
        e.style.width = size + 'px';
        e.style.height = size + 'px';
        e.style.fontSize = size * 0.6 + 'px';
    });
}

function line(arr) {
    let element = cells[arr[0]];
    element.classList.add('line');

    let number = "" + arr[0] + arr[1] + arr[2];

    if (number == "036" || number == "147" || number == "258")  element.classList.add('horizon');
    else if (number == "048") element.classList.add('diagonal-main'); 
    else if (number == "246") element.classList.add('diagonal'); 
}