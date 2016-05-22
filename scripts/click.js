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

	if (turn!="blue"){
		return false;
	}

	if ($(".selected").length > 0)
		return false;

	$( ".bluecircle" ).removeClass("selected");
	$(this).toggleClass("selected");
	
	checkAllMoves(this);
	return false;
});

$( ".redcircle" ).click(function() {
	counter = 0;

	if (turn=="blue"){
		return false;
	}

	if ($(".selected").length > 0)
		return false;


	$( ".redcircle" ).removeClass("selected");

	console.log(selectCol + "   " + selectRow);
	$(this).toggleClass("selected");
	
	checkAllMoves(this);
//	tempScore = ($(".selected").text());
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
}

function checkAllMoves(selected){
	selectCol = $(selected).parent().parent().children().index($(selected).parent());
	selectRow =  $(selected).parent().parent().parent().children().index($(selected).parent().parent());
	console.log("all moves " + selectRow + "  " + selectCol + " " + turn + " " + Class + "  " + notClass);
	var canEat = checkEatMoves(selectRow, selectCol);
	if (!canEat){
		Eating = false;
		nonEatingMoves(selectRow, selectCol);
	}
	else{
		console.log("CAN EAT!");
		Eating = true;
		alert("eatChip");
	}
}

$(".white_square").on('click', function () {
	if (Eating == true){
		alert("in doThis");
		doThis(this);
	}
	else{
		alert("in doThis3");
		if ($(this).children().size() > 1){
			alert ("error");
			return false;
		}
		if (!verifySquare(this)){
			return false;
			alert("Wrong Square");
		}
		else{
			moveChip(this);
			alert("moved");
			$(".selected").removeClass(" selected");
		}
	}
	switchPlayers();
	
});


function doThis(item){
	alert("Click square");
	$(item).toggleClass("clicked");
	var squareCol = $(item).parent().children().index($(item));
	var squareRow = $(item).parent().parent().children().index($(item).parent());
	console.log("inside " + squareCol + " " + squareRow);
	willEat(squareCol, squareRow);
	$(".selected").removeClass(" selected");
	$(".clicked").removeClass(" clicked");
	$(".highlighted").removeClass(" highlighted");
}

function checkSuccessionEat(){
	selectCol = $(selected).parent().parent().children().index($(selected).parent());
	selectRow =  $(selected).parent().parent().parent().children().index($(selected).parent().parent());
	var canEat = checkEatMoves(selectRow, selectCol);
	if (!canEat){
		return;
	}
	else{
		//eat the chip
		//checkSuccessionEatAgain
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
	//switchPlayers();
	updateBoard();
}



// $(".white_square").click(function(){
	
// 	if ($(this).children().size() > 1)
// 		return false;

// 	$( ".white_square" ).removeClass("clicked");
// 	$(this).toggleClass("clicked");
// 	var squareCol = $(this).parent().children().index($(this));
// 	var squareRow = $(this).parent().parent().children().index($(this).parent());
// 	var offset = 0;

// 	console.log("clicked");

// 	var count = willEat(squareRow, squareCol);

// 	if (!$(this).hasClass("highlighted"))
// 		return false;
	
// 	var selected = $( ".redcircle.selected, .bluecircle.selected" ).detach();
// 	if (selected.length == 0)
// 		return false;
// 	selected.prependTo(this);
// 	selected.removeClass("selected");
// 	checkDama(selected, squareRow, squareCol);
// 	updateBoard();

// 	if (turn == "red"){ 
// 		turn = "blue";
// 		notClass = "redcircle";
// 		Class = "bluecircle";
// 	}
// 	else{
// 		turn = "red";
// 		notClass = "bluecircle";
// 		Class = "redcircle"
// 	}

// 	$(".highlighted").removeClass(	" highlighted");
// });

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

	// if(hasEaten){
	// 	console.log("counter " + counter);
	// 	eatChip(squareRow, squareCol, $(nameClass));
	// 	tempScore = calculateUtility($(nameClass));
	// }
	// if (counter>0 && !hasEaten && count == 3){
	// 	console.log("NA FALSE NA NI");
	// 	console.log("Player 1" + Player1);
	// 	console.log("Player 2" + Player2);
	// 	$( ".redcircle.selected, .bluecircle.selected" ).removeClass("selected");
	// 	if (turn == "red"){ 
	// 		Player1 += tempScore;
	// 		turn = "blue";
	// 		notClass = "redcircle";
	// 		Class = "bluecircle";
	// 	}
	// 	else{
	// 		Player2 += tempScore;
	// 		turn = "red";
	// 		notClass = "bluecircle";
	// 		Class = "redcircle";
	// 	}
	// 	$("#Player1Score").empty();
	// 	$("#Player1Score").append(Player1);
	// 	$("#Player2Score").empty();
	// 	$("#Player2Score").append(Player2);
	// 	console.log("Player 1 update " + Player1);
	// 	console.log("Player 2 update " + Player2);
	// 	return false;
	// }
	// else{
	// 	return false;
	// }
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

function eatChip(squareRow, squareCol, remove){
	tempScore = calculateUtility(remove);
	var selected = $(".selected").detach();
	selected.prependTo($(".clicked"));
	var rem = remove.detach();
	updateBoard();
	selectRow = squareRow;
	selectCol = squareCol;
	checkDama(selected, squareRow, squareCol);	
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
		&& (board[row+1][col+1].children[0].className == notClass)
		&& (board[row+2][col+2].children[0].className != notClass)
		&& (board[selectRow+2][selectCol+2].children[0].className != Class)
		){
		addClassToCell(row+2, col+2, " highlighted");
		canMove = true;
	}
	if ((row+2 < 8) && (col-2 >= 0)
		&& (board[row+1][col-1].children[0].className == notClass)
		&& (board[row+2][col-2].children[0].className != notClass)
		&& (board[row+2][col-2].children[0].className != Class)
		){
		addClassToCell(row+2, col-2, " highlighted");
		canMove = true;
	}
	if ((row-2 >= 0) && (col+2 < 8)
		&& (board[row-1][col+1].children[0].className == notClass)
		&& (board[row-2][col+2].children[0].className != notClass)
		&& (board[row-2][col+2].children[0].className != Class)
		){
		addClassToCell(row-2, col+2, " highlighted");
		canMove = true;
	}
	if ((row-2 >= 0) && (col-2 >= 0)
		&& (board[row-1][col-1].children[0].className == notClass) 
		&& (board[row-2][col-2].children[0].className != notClass)
		&& (board[row-2][col-2].children[0].className != Class)
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

	if (row+offset<7){
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


