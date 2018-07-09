var cards = ['img/0C.png', 'img/0D.png', 'img/0H.png', 'img/0S.png',
    'img/2C.png', 'img/2D.png', 'img/2H.png', 'img/2S.png',
    'img/3C.png', 'img/3D.png', 'img/3H.png', 'img/3S.png',
    'img/4C.png', 'img/4D.png', 'img/4H.png', 'img/4S.png',
    'img/5C.png', 'img/5D.png', 'img/5H.png', 'img/5S.png',
    'img/6C.png', 'img/6D.png', 'img/6H.png', 'img/6S.png',
    'img/7C.png', 'img/7D.png', 'img/7H.png', 'img/7S.png',
    'img/8C.png', 'img/8D.png', 'img/8H.png', 'img/8S.png',
    'img/9C.png', 'img/9D.png', 'img/9H.png', 'img/9S.png',
    'img/AC.png', 'img/AD.png', 'img/AH.png', 'img/AS.png',
    'img/JC.png', 'img/JD.png', 'img/JH.png', 'img/JS.png',
    'img/KC.png', 'img/KD.png', 'img/KH.png', 'img/KS.png',
    'img/QC.png', 'img/QD.png', 'img/QH.png', 'img/QS.png'
]

function getscore() {
    var get_score = localStorage.getItem("score");
    document.getElementById('score').innerHTML = document.getElementById('score').innerHTML + get_score;
}
var current_game_array = [];
var score = 0;

function currentCards() {
    var total_numbers = 53,
        array_total_numbers = [],
        temp;
    while (total_numbers--) {
        array_total_numbers.push(total_numbers);
    }
    while (array_total_numbers.length) {
        temp = Math.floor(Math.random() * (array_total_numbers.length - 1));
        current_game_array.push(cards[temp]);
        array_total_numbers.splice(temp, 1);
    }
    current_game_array.splice(8, 44);
    total_numbers = 9;
    while (total_numbers--) {
        current_game_array.push(current_game_array[total_numbers]);
    }

}
Array.prototype.card_shuffle = function() {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard() {
    pair_flipped_count = 0;
    score = 0;
    var output = '';
    current_game_array.card_shuffle();
    for (var i = 0; i < current_game_array.length; i++) {
        output += '<div class="card-container" ><div class="card" id="card_' + i + '" data-tid = "Card" onclick="flipCard(this,\'' + current_game_array[i] + '\')">\
				<div class="front" data-tid = "Card-flipped"><img src="' + current_game_array[i] + '"\
				alt="' + current_game_array[i] + '" /></div>\
				<div class="back"><img src="img/back.png"\
				alt="back" /></div></div>\</div>';
    }
    document.getElementById('deck').innerHTML = output;
}
var memory_values = [];
var card_id = [];
var pair_flipped_count = 0;

function flipCard(card, val) {
    if (memory_values.length < 2) {
        if (memory_values.length == 0) {
            memory_values.push(val);
            card_id.push(card.id);
            document.getElementById(card_id[0]).getElementsByClassName('back')[0].style.transition = 'transform 0.5s ease-in-out';
            document.getElementById(card_id[0]).getElementsByClassName('back')[0].style.transform = 'rotateY(0deg)';
            document.getElementById(card_id[0]).getElementsByClassName('front')[0].style.transition = 'transform 0.5s ease-in-out';
            document.getElementById(card_id[0]).getElementsByClassName('front')[0].style.transform = 'rotateY(-180deg)';

        } else if (memory_values.length == 1 && card_id[0] != card.id) {
            memory_values.push(val);
            card_id.push(card.id);
            document.getElementById(card_id[1]).getElementsByClassName('back')[0].style.transition = 'transform 0.5s ease-in-out';
            document.getElementById(card_id[1]).getElementsByClassName('back')[0].style.transform = 'rotateY(0deg)';
            document.getElementById(card_id[1]).getElementsByClassName('front')[0].style.transition = 'transform 0.5s ease-in-out';
            document.getElementById(card_id[1]).getElementsByClassName('front')[0].style.transform = 'rotateY(-180deg)';

            if (memory_values[0] == memory_values[1]) {
                pair_flipped_count += 1;
                score += (9 - pair_flipped_count) * 42;
                document.getElementById('currentScore').innerHTML = score;
                document.getElementById(card_id[0]).getElementsByClassName('front')[0].style.transition = 'opacity 0.5s ease-in-out 0.5s';
                document.getElementById(card_id[0]).getElementsByClassName('front')[0].style.opacity = '0';
                document.getElementById(card_id[0]).getElementsByClassName('back')[0].style.transition = 'opacity 0.5s ease-in-out';
                document.getElementById(card_id[0]).getElementsByClassName('back')[0].style.opacity = '0';
                document.getElementById(card_id[0]).style.cursor = 'default';
                document.getElementById(card_id[1]).getElementsByClassName('front')[0].style.transition = 'opacity 0.5s ease-in-out 0.5s';
                document.getElementById(card_id[1]).getElementsByClassName('front')[0].style.opacity = '0';
                document.getElementById(card_id[1]).getElementsByClassName('back')[0].style.transition = 'opacity 0.5s ease-in-out';
                document.getElementById(card_id[1]).getElementsByClassName('back')[0].style.opacity = '0';
                document.getElementById(card_id[1]).style.cursor = 'default';

                memory_values = [];
                card_id = [];

                if (pair_flipped_count == 9) {
                    localStorage.setItem("score", score);
                    document.location.replace("endGamePage.html");
                }
            } else {

                function flipBack() {

                    document.getElementById(card_id[0]).getElementsByClassName('front')[0].style.transition = 'transform 0.5s ease-in-out';
                    document.getElementById(card_id[0]).getElementsByClassName('front')[0].style.transform = 'rotateY(0deg)';
                    document.getElementById(card_id[0]).getElementsByClassName('back')[0].style.transition = 'transform 0.5s ease-in-out';
                    document.getElementById(card_id[0]).getElementsByClassName('back')[0].style.transform = 'rotateY(180deg)';

                    document.getElementById(card_id[1]).getElementsByClassName('front')[0].style.transition = 'transform 0.5s ease-in-out';
                    document.getElementById(card_id[1]).getElementsByClassName('front')[0].style.transform = 'rotateY(0deg)';
                    document.getElementById(card_id[1]).getElementsByClassName('back')[0].style.transition = 'transform 0.5s ease-in-out';
                    document.getElementById(card_id[1]).getElementsByClassName('back')[0].style.transform = 'rotateY(180deg)';

                    memory_values = [];
                    card_id = [];
                }
                setTimeout(flipBack, 700);
                score -= pair_flipped_count * 42;
                document.getElementById('currentScore').innerHTML = score;

            }
        }
    }
}