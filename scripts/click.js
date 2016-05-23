var turn = "red";
var notClass = "bluecircle";
var Class = "redcircle";
var selectCol;
var selectRow;
var board;
var counter = 0;
var tempScore;
var Player1 = 0;
var Player2 = 0;
var Eating = false;
updateBoard();


function addClassToCell(r, c, val){
	if (r > 7 || r < 0 || c > 7 || c < 0)
		return false;
	console.log(r + "    " + c);
	$(".clicked").removeClass("clicked");
	$($("#board tbody").children().eq(r).children()[c]).toggleClass(" " + val);
	updateBoard();
}

function updateBoard(){
	var row = $("#board tbody").children();
	board = [];
	for (var i = 0; i < row.length; i++) {
		board.push(row.eq(i).children());
	}
}

$( ".bluecircle" ).click(function() {
	counter=0;
	Eating = 0;

	if (turn!="blue"){
		return false;
	}

	if ($(".selected").length > 0)
		return false;

	$( ".bluecircle" ).removeClass("selected");
	$(this).toggleClass("selected");
	tempScore = ($(".selected").text());
	checkAllMoves(this);
	return false;
});

$( ".redcircle" ).click(function() {
	counter = 0;
	Eating = 0;


	if (turn=="blue"){
		return false;
	}

	if ($(".selected").length > 0)
		return false;


	$( ".redcircle" ).removeClass("selected");

	$(this).toggleClass("selected");
	
	checkAllMoves(this);
	tempScore = ($(".selected").text());
	return false;
});


function nonEatingMoves(selectRow, selectCol){
	var canMove = checkMoves(selectRow, selectCol);
	if (!canMove){
		$(".selected").removeClass(" selected");
		alert("NO POSSIBLE MOVES!");
	}
	else{
		//
	}
}


function doThis3(){
	alert("Has Possible Move");
	
}

function switchPlayers(){
	if (turn == "red"){
		turn = "blue";
		Class = "bluecircle";
		notClass = "redcircle";
	}
	else{
		turn = "red";
		Class = "redcircle";
		notClass = "bluecircle";	
	}
	console.log(turn + " " + Class + "  " + notClass);
	updateBoard();
}

function checkDamaEatingMoves(row, col){
	updateBoard();
	var eats = false;
	for (var i = 1, j = 1; row+i<=6 && col+j<6; i++, j++){
		if (board[row+i][col+j].children.length >= 2){
			if ((($(board[row+i][col+j].children[0]).hasClass(notClass)))
				&& (!($(board[(row+i)+1][(col+j)+1].children[0]).hasClass(notClass)))
				&& (!($(board[(row+i)+1][(col+j)+1].children[0]).hasClass(Class)))){
				addClassToCell((row+i)+1, (col+j)+1, " highlighted");
				eats = true;
				console.log();
			}
			for (var a = (row+i)+2, b = (col+j)+2; a <= 7 || b <= 7; a++, b++) {
				if (board[a][b].children.length < 2)
					addClassToCell(a, b, " highlighted");
				else
					break;
			};
		break;
		}
	}


	for (var i = 1, j = -1; row+i<=6 && col+j>1; i++, j--){
		if (!board[row+i][col+j].children.length >= 2){
			if ((($(board[row+i][col+j].children[0]).hasClass(notClass)))
				&& (!($(board[(row+i)+1][(col+j)-1].children[0]).hasClass(notClass)))
			 	&& (!($(board[(row+i)+1][(col+j)-1].children[0]).hasClass(Class)))
				){
				addClassToCell((row+i)+1, (col+j)-1, " highlighted");
				eats = true;
				for (var a = (row+i)+2, b = (col+j)-2; a <= 7 || b >= 0; a++, b--) {
					if (board[a][b].children.length < 2)
						addClassToCell(a, b, " highlighted");
					else
						break;
				};
				break;
			}
		}
	}
	for (var i = -1, j = 1; row+i>1 && col+j<=6; i--, j++){
		if (board[row+i][col+j].children.length >= 2){
			if ((($(board[row+i][col+j].children[0]).hasClass(notClass)))
				&& (!($(board[(row+i)-1][(col+j)+1].children[0]).hasClass(notClass)))
				&& (!($(board[(row+i)-1][(col+j)+1].children[0]).hasClass(Class)))
				){
				addClassToCell((row+i)-1, (col+j)+1, " highlighted");
				eats = true;
				for (var a = (row+i)-2, b = (col+j)+2; a >= 0 || b <= 7; a--, b++) {
					if (board[a][b].children.length < 2)
						addClassToCell(a, b, " highlighted");
					else
						break;
				};	
				break;
			}
		}
	}
	for (var i = -1, j = -1; row+i>1 && col+j>1; i--, j--){
		if (board[row+i][col+j].children.length >= 2){
			if ((($(board[row+i][col+j].children[0]).hasClass(notClass)))
				&& (!($(board[(row+i)-1][(col+j)-1].children[0]).hasClass(notClass)))
				&& (!($(board[(row+i)-1][(col+j)-1].children[0]).hasClass(Class)))){
				addClassToCell((row+i)-1, (col+j)-1, " highlighted");
				eats = true;
				for (var a = (row+i)-2, b = (col+j)-2; a >= 0 || b >= 0; a--, b--) {
					if (board[a][b].children.length < 2)
						addClassToCell(a, b, " highlighted");
					else
						break;
				};
				break;
			}
		}
	}
	alert("Eating!" + eats);
	return eats;
}

function checkDamaMoves(row, col){
	for (var i = 1, j = 1; row+i<=7 && col+j<=7 && board[row+i][col+j].children.length < 2; i++, j++){
		addClassToCell(row+i, col+j, " highlighted");
	}
	for (var i = 1, j = -1; row+i<=7 && col+j>=0 && board[row+i][col+j].children.length < 2; i++, j--){
		addClassToCell(row+i, col+j, " highlighted");
	}
	for (var i = -1, j = 1; row+i>=0 && col+j<=7 && board[row+i][col+j].children.length < 2; i--, j++){
		addClassToCell(row+i, col+j, " highlighted");
	}
	for (var i = -1, j = -1; row+i>=0 && col+j<=7 && board[row+i][col+j].children.length < 2; i--, j--){
		addClassToCell(row+i, col+j, " highlighted");
	}
	return;
}

function checkAllMoves(selected){
	selectCol = $(selected).parent().parent().children().index($(selected).parent());
	selectRow =  $(selected).parent().parent().parent().children().index($(selected).parent().parent());
	//console.log("all moves " + selectRow + "  " + selectCol + " " + turn + " " + Class + "  " + notClass);
	if ($(".selected").hasClass("dama")){
		var canEat = checkDamaEatingMoves(selectRow, selectCol);
		if (!canEat){
			checkDamaMoves(selectRow, selectCol);
		}
		else{
			alert("EATING!");
			Eating = 2;
		}
	}
	else{
		var canEat = checkEatMoves(selectRow, selectCol);
		if (!canEat){
			Eating = 0;
			nonEatingMoves(selectRow, selectCol);
		}
		else{
			console.log("CAN EAT!");
			Eating = 1;
			//alert("eatChip");
		}
	}
}

$(".white_square").on('click', function () {
	if (Eating == 1){
//		alert("in doThis");
		doThis(this);
	}
	else if (Eating == 0){
//		alert("in doThis3");
		if ($(this).children().size() > 1){
			//alert ("error");
			return false;
		}
		else{
			moveChip(this);
			//alert("moved");
			$(".selected").removeClass(" selected");
		}
	} else if (Eating == 2){
		alert("WOOOO");
		eatChipDama(this);
	} else{

	}

});


function doThis(item){
	$(item).toggleClass("clicked");
	var squareCol = $(item).parent().children().index($(item));
	var squareRow = $(item).parent().parent().children().index($(item).parent());
	//console.log("inside " + squareCol + " " + squareRow);
	willEat(squareRow, squareCol);
	$(".clicked").removeClass(" clicked");
}

function eatChipDama(item){
	$(item).toggleClass("clicked");
	var squareCol = $(item).parent().children().index($(item));
	var squareRow = $(item).parent().parent().children().index($(item).parent());
	//console.log("inside " + squareCol + " " + squareRow);
	//willEatDama(squareRow, squareCol);
	backTrackChip(squareRow, squareCol);
	$(".clicked").removeClass(" clicked");
	$(".selected").removeClass(" selected");
	switchPlayers();
}

function checkSuccessionEat(selected){
	selectCol = $(".selected").parent().parent().children().index($(".selected").parent());
	selectRow =  $(".selected").parent().parent().parent().children().index($(".selected").parent().parent());
	var canEat = checkEatMoves(selectRow, selectCol);
	if (!canEat){
		$(".selected").removeClass(" selected");
		$(".clicked").removeClass(" clicked");
		$(".highlighted").removeClass(" highlighted");
		if (turn=="red"){
			$("#Player1Score").empty();
			$("#Player1Score").append(tempScore);
			console.log(tempScore);
		}
		else{
			$("#Player2Score").empty();
			$("#Player2Score").append(tempScore);
			console.log(tempScore);
		}
		switchPlayers();
	}
	else{
		willEat(selectRow, selectCol);
	}
}

function verifySquare(square){
	if (!$(square).hasClass("highlighted")){
		alert("cannot go there!");
		return false;
	}
	return true;
}

function moveChip(square){
	var selected = $( ".redcircle.selected, .bluecircle.selected" ).detach();
	if (selected.length == 0)
		return false;
	selected.prependTo($(square));
	selected.removeClass("selected");
 	var squareCol = $(square).parent().children().index($(square));
 	var squareRow = $(square).parent().parent().children().index($(square).parent());
	checkDama(selected, squareRow, squareCol);
	$(".highlighted").removeClass(" highlighted");
	switchPlayers();
	updateBoard();
}




function willEatDama(squareRow, squareCol){
	//console.log("willEat");
	//console.log("inside " + squareCol + " " + squareRow + " " + selectCol + " " + selectRow);
	//quadrant 1
	if ((selectRow > squareRow) && (selectCol > squareCol)){
		damaEat(squareRow, squareCol, $(board[squareRow+1][squareCol+1].children[0]));
	}
	if ((selectRow < squareRow) && (selectCol > squareCol)){
		damaEat(squareRow, squareCol, $(board[squareRow-1][squareCol+1].children[0]));
	}
	if ((selectRow > squareRow) && (selectCol < squareCol)){
		damaEat(squareRow, squareCol, $(board[squareRow+1][squareCol-1].children[0]));
	}
	if ((selectRow < squareRow) && (selectCol < squareCol)){
		damaEat(squareRow, squareCol, $(board[squareRow-1][squareCol-1].children[0]));
	}

	updateBoard();
}

function backTrackChip(squareRow, squareCol){
	console.log("BACKTRACK " + squareRow + " " + squareCol +"select " +  selectRow + " " + selectCol);
	if ((selectRow > squareRow) && (selectCol > squareCol)){
		console.log("BACKTRACK 1");
		for (var i = squareRow, j = squareCol; i < selectRow && j < selectCol; i++, j++) {
			console.log("BACKTRACK 1" + i + " " + j);
			if (board[i][j].children.length >= 2){
				damaEat(squareRow, squareCol, $(board[i][j].children[0]));
			}
		};
	}
	else if ((selectRow < squareRow) && (selectCol > squareCol)){
		console.log("BACKTRACK 2");
		for (var i = squareRow, j = squareCol; i > selectRow && j < selectCol; i--, j++) {
			console.log("BACKTRACK 2" + i + " " + j);
			if (board[i][j].children.length >= 2){
				damaEat(squareRow, squareCol, $(board[i][j].children[0]));
			}
		};
	}
	// if less than ang square sa select ++
	else if ((selectRow > squareRow) && (selectCol < squareCol)){
		console.log("BACKTRACK 3");
		for (var i = squareRow, j = squareCol; i < selectRow && j > selectCol; i++, j--) {
			console.log("BACKTRACK 3" + i + " " + j);
			if (board[i][j].children.length >= 2){
				damaEat(squareRow, squareCol, $(board[i][j].children[0]));
			}
		};
	}
	else if ((selectRow < squareRow) && (selectCol < squareCol)){
		console.log("BACKTRACK 4");
		for (var i = squareRow, j = squareCol; i > selectRow && j > selectCol; i--, j--) {
			console.log("BACKTRACK 4" + i + " " + j);
			if (board[i][j].children.length >= 2){
				damaEat(squareRow, squareCol, $(board[i][j].children[0]));
			}
		};
	}

	updateBoard();
}

function willEat(squareRow, squareCol){
	console.log("willEat");
	console.log("inside " + squareCol + " " + squareRow + " " + selectCol + " " + selectRow);
	if ((selectRow+2 == squareRow) && (selectCol+2 == squareCol)){
		console.log("selected 1");
		console.log(board[selectRow+1][selectCol+1].children[0]);
		eatChip(squareRow, squareCol, $(board[selectRow+1][selectCol+1].children[0]));
	}
	else if ((selectRow+2 == squareRow) && (selectCol-2 == squareCol)){
		console.log("selected 2");
		console.log(board[selectRow+1][selectCol-1].children[0]);
		eatChip(squareRow, squareCol, $(board[selectRow+1][selectCol-1].children[0]));
	}
	else if ((selectRow-2 == squareRow) && (selectCol+2 == squareCol)){
		console.log("selected 3");
		console.log(board[selectRow-1][selectCol+1].children[0]);
		eatChip(squareRow, squareCol, $(board[selectRow-1][selectCol+1].children[0]));
	}
	else if ((selectRow-2 == squareRow) && (selectCol-2 == squareCol)){
		console.log("selected 4");
		console.log(board[selectRow-1][selectCol-1].children[0]);
		eatChip(squareRow, squareCol, $(board[selectRow-1][selectCol-1].children[0]));
	}
	else{
		return;
	}

	updateBoard();
}

function calculateUtility(nameClass){
	var x = tempScore;
	var y = (nameClass.text());
	var symbol = ($(".clicked span").text());
	var result = 0;

	switch(symbol){
		case '+':
			result = parseInt(x)+parseInt(y);
			break;
		case '-':
			result = parseInt(x)-parseInt(y);
			break;
		case '\xD7':
			result = parseInt(x)*parseInt(y);
			break;
		case '\xF7':
			result = parseInt(x)/parseInt(y);
			break;	
		default:
			alert("noooooo");
			console.log(symbol);
			break;
	}
	console.log(Player1);
	console.log(Player2);
	return result;
}

function damaEat(squareRow, squareCol, remove){
	alert("eating chip " + squareRow + " " + squareCol);
	//tempScore = calculateUtility(remove);
	var selected = $(".selected").detach();
	selected.prependTo($(".clicked"));
	var rem = remove.detach();
	selectRow = squareRow;
	selectCol = squareCol;
	$(".highlighted").removeClass(" highlighted");
	updateBoard();
}

function eatChip(squareRow, squareCol, remove){
	tempScore = calculateUtility(remove);
	var selected = $(".selected").detach();
	selected.prependTo($(".clicked"));
	var rem = remove.detach();
	updateBoard();
	selectRow = squareRow;
	selectCol = squareCol;
	checkDama(selected, squareRow, squareCol);
	$(".highlighted").removeClass(" highlighted");
	checkSuccessionEat();

}

function checkDama(chip, row, col){
	console.log('here');
	console.log(row);
	console.log(col);
	if (turn=='red' && row==7){
		console.log(chip); 
		chip.addClass('dama');
		
	}

	if (turn=='blue' && row==0){
		chip.addClass('dama');
	}

}

function checkEatMoves(row, col){

	var canMove = false;

	if ((row+2 < 8) && (col+2 < 8)
		&& ($(board[row+1][col+1].children[0]).hasClass(notClass))
		&& (!($(board[row+2][col+2].children[0]).hasClass(notClass)))
		&& (!($(board[row+2][col+2].children[0]).hasClass(Class)))
		){
		addClassToCell(row+2, col+2, " highlighted");
		canMove = true;
	}
	if ((row+2 < 8) && (col-2 >= 0)
		&& ($(board[row+1][col-1].children[0]).hasClass(notClass))
		&& (!($(board[row+2][col-2].children[0]).hasClass(notClass)))
		&& (!($(board[row+2][col-2].children[0]).hasClass(Class)))
		){
		addClassToCell(row+2, col-2, " highlighted");
		canMove = true;
	}
	if ((row-2 >= 0) && (col+2 < 8)
		&& ($(board[row-1][col+1].children[0]).hasClass(notClass))
		&& (!($(board[row-2][col+2].children[0]).hasClass(notClass)))
		&& (!($(board[row-2][col+2].children[0]).hasClass(Class)))
		){
		addClassToCell(row-2, col+2, " highlighted");
		canMove = true;
	}
	if ((row-2 >= 0) && (col-2 >= 0)
		&& ($(board[row-1][col-1].children[0]).hasClass(notClass))
		&& (!($(board[row-2][col-2].children[0]).hasClass(notClass)))
		&& (!($(board[row-2][col-2].children[0]).hasClass(Class)))
		){
		addClassToCell(row-2, col-2, " highlighted");
		canMove = true;
	}

	return canMove;
}

function checkMoves(row, col){
	if (turn == "red")
		offset = 1;
	else
		offset = -1;

	var canMove = false;

	console.log(row + "  " + col);
// 1 3
	if (row+offset<=7 && row+offset>=0){
		if (col<7 && (board[row+offset][col+1].children.length < 2)){
			addClassToCell(row+offset, col+1, " highlighted");
			canMove = true;
		}
		if (col>0 && (board[row+offset][col-1].children.length < 2)){
			addClassToCell(row+offset, col-1, " highlighted");
			canMove = true;
		}
	}	
	return canMove;
}