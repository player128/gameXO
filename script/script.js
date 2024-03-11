let count = 0;
let win = false;

function alerts (text) {
    setTimeout(function () {
        alert(text)
    }, 50)
}

let draw = (element) => {
    if (win) return alert("Игра окончена!");

    if (count % 2 == 0) {
        element.textContent = "X";
    } else {
        element.textContent = "O";
    }

    let victory = isVictory(cells);

    if (victory) {
        select(victory);
        alerts(`Выйграл ${element.textContent}`);
        win = true;
    }

    if (!win && count == 8) alerts(`Ничья!`);

    count++;
}

let cells = document.querySelectorAll('#field td');
start(cells);

function start(cells) {
    cells.forEach(element => {
        element.addEventListener('click', function _draw() {
                draw(element);
                element.removeEventListener('click', _draw);
            }
        );
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