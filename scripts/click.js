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


updateBoard();

$( ".redcircle" ).click(function() {
	counter = 0;

	if (turn!="red")
		return false;

	if ($(".selected").length > 0)
		return false;

	$( ".redcircle" ).removeClass("selected");
	selectCol = $(this).parent().parent().children().index($(this).parent());
	selectRow =  $(this).parent().parent().parent().children().index($(this).parent().parent());

	console.log(selectCol + "   " + selectRow);
	$(this).toggleClass("selected");
	
	checkAllMoves(selectRow, selectCol);

	tempScore = ($(".selected").text());
	return false;
});


function checkAllMoves(selectRow, selectCol){
	var canEat = checkEatMoves(selectRow, selectCol);

	if (!canEat){
		alert("Cant Eat");
		var canMove = checkMoves(selectRow, selectCol);
		if (!canMove){
			$(".selected").removeClass(" selected");
			alert("NO POSSIBLE MOVES!");
		}
	}
	else{


		//board[selectRow-1][selectCol+1].children[0]
	}
}

$( ".bluecircle" ).click(function() {
	counter = 0;


	if (turn!="blue")
		return false;
	
	if ($(".selected").length > 0)
		return false;

	$( ".bluecircle" ).removeClass("selected");
	
	selectCol = $(this).parent().parent().children().index($(this).parent());
	selectRow =  $(this).parent().parent().parent().children().index($(this).parent().parent());

	console.log(selectCol + "   " + selectRow);
	$(this).toggleClass("selected");
	
	checkAllMoves(selectRow, selectCol);

	tempScore = ($(".selected").text());
	return false;
});

$(".white_square").click(function(){
	
	if ($(this).children().size() > 1)
		return false;

	$( ".white_square" ).removeClass("clicked");
	$(this).toggleClass("clicked");
	var squareCol = $(this).parent().children().index($(this));
	var squareRow = $(this).parent().parent().children().index($(this).parent());
	var offset = 0;

	console.log("clicked");

	var count = willEat(squareRow, squareCol);

	if (!$(this).hasClass("highlighted"))
		return false;
	
	var selected = $( ".redcircle.selected, .bluecircle.selected" ).detach();
	if (selected.length == 0)
		return false;
	selected.prependTo(this);
	selected.removeClass("selected");
	checkDama(selected, squareRow, squareCol);
	updateBoard();

	if (turn == "red"){ 
		turn = "blue";
		notClass = "redcircle";
		Class = "bluecircle";
	}
	else{
		turn = "red";
		notClass = "bluecircle";
		Class = "redcircle"
	}

	$(".highlighted").removeClass(" highlighted");
});

function willEat(squareRow, squareCol){
	console.log("EATING");
	var hasEaten = false;
	var currCol, currRow, nameClass;
	console.log(selectRow + "    " + selectCol + "   " + squareRow + "     " + squareCol + "    " + notClass);

	if ((selectRow+2 == squareRow) && (selectCol+2 == squareCol) 
		&& (selectRow+2 < 8) && (selectCol+2 < 8)
		&& (board[selectRow+1][selectCol+1].children[0].className == notClass)
		&& (board[selectRow+2][selectCol+2].children[0].className != notClass)
		&& (board[selectRow+2][selectCol+2].children[0].className != Class)
		){
		hasEaten = true;
		currCol = squareCol;
		currRow = squareRow;
		counter++;
		nameClass = board[selectRow+1][selectCol+1].children[0];
	}
	if ((selectRow+2 == squareRow) && (selectCol-2 == squareCol) 
		&& (selectRow+2 < 8) && (selectCol-2 >= 0)
		&& (board[selectRow+1][selectCol-1].children[0].className == notClass)
		&& (board[selectRow+2][selectCol-2].children[0].className != notClass)
		&& (board[selectRow+2][selectCol-2].children[0].className != Class)
		){
		hasEaten = true;
		currRow = squareRow;
		currCol = squareCol;
		nameClass = board[selectRow+1][selectCol-1].children[0];
		counter++;
	}
	if ((selectRow-2 == squareRow) && (selectCol+2 == squareCol) 
		&& (selectRow-2 >= 0) && (selectCol+2 < 8)
		&& (board[selectRow-1][selectCol+1].children[0].className == notClass)
		&& (board[selectRow-2][selectCol+2].children[0].className != notClass)
		&& (board[selectRow-2][selectCol+2].children[0].className != Class)
		){
		hasEaten = true;
		currRow = squareRow;
		currCol = squareCol;
		nameClass = board[selectRow-1][selectCol+1].children[0];
		counter++;
	}
	if ((selectRow-2 == squareRow) && (selectCol-2 == squareCol) 
		&& (selectRow-2 >= 0) && (selectCol-2 >= 0)
		&& (board[selectRow-1][selectCol-1].children[0].className == notClass) 
		&& (board[selectRow-2][selectCol-2].children[0].className != notClass)
		&& (board[selectRow-2][selectCol-2].children[0].className != Class)
		){
		hasEaten = true;
		currRow = squareRow;
		currCol = squareCol;
		nameClass = board[selectRow-1][selectCol-1].children[0];
		counter++;
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
	console.log("EAT CHIP!" + squareRow + "  " + squareCol);
	tempScore = calculateUtility(remove);
	addClassToCell(squareRow, squareCol, " clicked");
	var selected = $(".selected").detach();
	selected.prependTo($(".clicked"));
	var rem = remove.detach();
	updateBoard();
	selectRow = squareRow;
	selectCol = squareCol;
	checkDama(selected, squareRow, squareCol);
	willEat(squareRow+2, squareCol+2, 0);	
	willEat(squareRow-2, squareCol+2, 1);	
	willEat(squareRow+2, squareCol-2, 2);	
	willEat(squareRow-2, squareCol-2, 3);	
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


