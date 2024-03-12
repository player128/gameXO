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
            if (count % 2 == 0) {
                element.textContent = "X";
            } else {
                element.textContent = "O";
            }
        
            let victory = isVictory(cells);
        
            if (victory) {
                select(victory);
                alerts(`Выйграл ${element.textContent}`);
                reload();
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
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
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