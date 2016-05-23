var board, turn, Class, notClass;
var canEat, canMove;

getFirstPlayer();
updateBoard();

/* function to copy contents of board in website to 
the variable board. Provides easy access to all elements
of the board without using the document.getElementBy which
offers a slower loading time. */
function updateBoard(){
	var row = $("#board tbody").children();
	board = [];
	for (var i = 0; i < row.length; i++) {
		board.push(row.eq(i).children());
	}
}

/* function to randomly get which player goes first. */
function getFirstPlayer(){
	var randomnumber = Math.floor(Math.random() * (2));
	if (randomnumber == 0){
		turn = "blue";
		alert("RED FIRST!");
		switchPlayers();
	}
	else{
		turn = "red";
		alert("BLUE FIRST!");
		switchPlayers();
	}

}

/* function to switch current players. Players are often
denoted by a color and class. */
function switchPlayers(){
	alert("SWITCH");
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
	updateBoard();
	$(".highlighted").removeClass(" highlighted");
	$(".selected").removeClass(" selected");
}

/* function to add a class to a specified cell in the board
using row and column  */
function addClassToCell(row, col, val){
	if (row > 7 || row < 0 || col > 7 || col < 0)
		return false;
	$($("#board tbody").children().eq(row).children()[col]).toggleClass(" " + val);
	updateBoard();
}

/* function to select the circle chosen */
function setSelected(item){
	alert("clicked!");
	$( ".selected" ).removeClass(" selected");
	$(item).toggleClass("selected");
	checkAllMoves(item);
}

/* functions when a redcircle is clicked*/
$(".redcircle").click(function(){
	if (turn!="red")
		return false;
	if ($(".selected").length > 0)
		return false;
	setSelected(this);
});

/* functions when a blue circle is clicked */
$(".bluecircle").click(function(){
	if (turn!="blue")
		return false;
	if ($(".selected").length > 0)
		return false;
	setSelected(this);
});

/* functions when a white_square is clicked */
$(".white_square").click(function(){
	// cannot choose a square with a chip
	if ($(".selected").length < 1)
		return false;
	if ($(this).children().size() > 2)
		return false;
	$(".clicked").removeClass("clicked");
	$(this).toggleClass("clicked");

	var squareCol = $(this).parent().children().index($(this));
	var squareRow = $(this).parent().parent().children().index($(this).parent());

	if ($(".selected").hasClass("dama")){
		if (canEat)
			backTrackChip(squareRow, squareCol);
		else if (canMove)
			moveChip(this);
	}
	else{
		if (canEat)
			eatChip(squareRow, squareCol);
		else if (canMove)
			moveChip(this);
	}
})


/* checks all moves of a regular chip */
function checkAllMoves(selected){
	canMove = false;
	alert("checking moves");
	//get corresponding column of selected item
	selectCol = $(selected).parent().parent().children().index($(selected).parent());
	//get corresponding row of selected item
	selectRow =  $(selected).parent().parent().parent().children().index($(selected).parent().parent());
	if ($(selected).hasClass("dama")){
		canEat = checkDamaEat(selectRow, selectCol);
		if (!canEat){
			canMove = checkDamaMoves(selectRow, selectCol);
			if (!canMove){
				alert("Dama chip has no moves!");
				$(".selected").removeClass(" selected");
			}
		}
		else{

		}		
	}
	else{	
		canEat = checkRegularEat(selectRow, selectCol);
		if (!canEat){
			canMove = regularMoves(selectRow, selectCol, board);
			if (!canMove){
				alert("Chip has no moves!");
				$(".selected").removeClass(" selected");
			}
		}
		else{ // when a chip can eat another chip

		}
	}
}

/* checks if the item on the baord has regular moves or if it 
can move from one box to a next observing the rules*/
function regularMoves(row, col, board){
	var offset = turn=="red"?1:-1;

	var canMove = false;
	// checks if the move has already reached the edge of the board
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

/* function to move a regular chip to a selected square in the parameter */
function moveChip(square){
	if (!verifyChip(square)){
		alert("not verified");
		return false;
	}
	var selected = $( ".redcircle.selected, .bluecircle.selected" ).detach();
	if (selected.length == 0)
		return false;
	selected.prependTo($(square));
	selectRow =  $(".selected").parent().parent().parent().children().index($(".selected").parent().parent());
	checkDama(selected, selectRow);
	selected.removeClass(" selected");
	$(".selected").removeClass(" selected");
	$(".highlighted").removeClass(" highlighted");
	switchPlayers();
}

/* checks eating moves of regular chips */
function checkRegularEat(row, col){
	var canMove = false;
	// lower right quadrant
	if ((row+2 < 8) && (col+2 < 8)
		&& ($(board[row+1][col+1].children[0]).hasClass(notClass))
		&& (board[row+2][col+2].children.length < 2)
		){
		addClassToCell(row+2, col+2, " highlighted");
		canMove = true;
	}
	// lower left quadrant
	if ((row+2 < 8) && (col-2 >= 0)
		&& ($(board[row+1][col-1].children[0]).hasClass(notClass))
		&& (board[row+2][col-2].children.length < 2)
		){
		addClassToCell(row+2, col-2, " highlighted");
		canMove = true;
	}
	// upper right quadrant 
	if ((row-2 >= 0) && (col+2 < 8)
		&& ($(board[row-1][col+1].children[0]).hasClass(notClass))
		&& (board[row-2][col+2].children.length < 2)
		){
		addClassToCell(row-2, col+2, " highlighted");
		canMove = true;
	}
	// upper left quadrant
	if ((row-2 >= 0) && (col-2 >= 0)
		&& ($(board[row-1][col-1].children[0]).hasClass(notClass))
		&& (board[row-2][col-2].children.length < 2)
		){
		addClassToCell(row-2, col-2, " highlighted");
		canMove = true;
	}
	return canMove;
}

/* function to check if the square clicked is a legit move
based on the highlighted class (if highlighted = legit) */
function verifyChip(square){
	if ($(square).hasClass("highlighted"))
		return true;	
	return false;
}

/* moves chip to correct position and then removes the eaten
chip from the board */
function removeChip(squareRow, squareCol, remove){
	var selected = $(".selected").detach();
	selected.prependTo($(".clicked"));
	var rem = remove.detach();
	updateBoard();
	selectRow = squareRow;
	selectCol = squareCol;
	$(".clicked").removeClass(" clicked");
	$(".highlighted").removeClass(" highlighted");
	checkDama(selected, selectRow);
	checkSuccessionEat();
}

/* determines which chip is to be eaten and calls removechip()
to remove the chip*/
function eatChip(squareRow, squareCol){
	if ((selectRow+2 == squareRow) && (selectCol+2 == squareCol)){
		removeChip(squareRow, squareCol, $(board[selectRow+1][selectCol+1].children[0]));
	}
	else if ((selectRow+2 == squareRow) && (selectCol-2 == squareCol)){
		removeChip(squareRow, squareCol, $(board[selectRow+1][selectCol-1].children[0]));
	}
	else if ((selectRow-2 == squareRow) && (selectCol+2 == squareCol)){
		removeChip(squareRow, squareCol, $(board[selectRow-1][selectCol+1].children[0]));
	}
	else if ((selectRow-2 == squareRow) && (selectCol-2 == squareCol)){
		removeChip(squareRow, squareCol, $(board[selectRow-1][selectCol-1].children[0]));
	}
	else{
		return;
	}
}

function checkSuccessionEat(){
	selectCol = $(".selected").parent().parent().children().index($(".selected").parent());
	selectRow =  $(".selected").parent().parent().parent().children().index($(".selected").parent().parent());
	var canEat = checkRegularEat(selectRow, selectCol);
	if (!canEat){
		switchPlayers();
		$(".selected").removeClass(" selected");
		$(".clicked").removeClass(" clicked");
		$(".highlighted").removeClass(" highlighted");
	}
	else{
		eatChip(selectRow, selectCol);
	}
}

/* checks if the chip is already a dama :) */
function checkDama(chip, row){
	if (turn=='red' && row==7){
		chip.addClass('dama');	
	}
	if (turn=='blue' && row==0){
		chip.addClass('dama');
	}
}

function checkDamaMoves(row, col){
	canMove = false;
	for (var i = 1, j = 1; row+i<=7 && col+j<=7 && board[row+i][col+j].children.length < 2; i++, j++){
		addClassToCell(row+i, col+j, " highlighted");
		canMove = true;
	}
	for (var i = 1, j = -1; row+i<=7 && col+j>=0 && board[row+i][col+j].children.length < 2; i++, j--){
		addClassToCell(row+i, col+j, " highlighted");
		canMove = true;
	}
	for (var i = -1, j = 1; row+i>=0 && col+j<=7 && board[row+i][col+j].children.length < 2; i--, j++){
		addClassToCell(row+i, col+j, " highlighted");
		canMove = true;
	}
	for (var i = -1, j = -1; row+i>=0 && col+j>=0 && board[row+i][col+j].children.length < 2; i--, j--){
		addClassToCell(row+i, col+j, " highlighted");
		canMove = true;
	}
	return canMove;
}

function checkDamaEat(row, col){
	updateBoard();
	var eats = false;
	for (var i = 1, j = 1; row+i<=6 && col+j<=6; i++, j++){
		if (board[row+i][col+j].children.length >= 2){
			if ((($(board[row+i][col+j].children[0]).hasClass(notClass)))
				&& ((board[(row+i)+1][(col+j)+1].children.length < 2))
				){
				addClassToCell((row+i)+1, (col+j)+1, " highlighted");
				eats = true;
				for (var a = (row+i)+2, b = (col+j)+2; a <= 7 && b <= 7; a++, b++) {
					if (board[a][b].children.length < 2)
						addClassToCell(a, b, " highlighted");
					else
						break;
				};
				break;
			}
		}
	}
	for (var i = 1, j = -1; row+i<=6 && col+j>=1; i++, j--){
		if (!board[row+i][col+j].children.length >= 2){
			if ((($(board[row+i][col+j].children[0]).hasClass(notClass)))
				&& (!($(board[(row+i)+1][(col+j)-1].children[0]).hasClass(notClass)))
			 	&& ((board[(row+i)+1][(col+j)-1].children.length < 2))
				){
				addClassToCell((row+i)+1, (col+j)-1, " highlighted");
				eats = true;
				for (var a = (row+i)+2, b = (col+j)-2; a <= 7 && b >= 0; a++, b--) {
					if (board[a][b].children.length < 2)
						addClassToCell(a, b, " highlighted");
					else
						break;
				};
				break;
			}
		}
	}
	for (var i = -1, j = 1; row+i>=1 && col+j<=6; i--, j++){
		if (board[row+i][col+j].children.length >= 2){
			if ((($(board[row+i][col+j].children[0]).hasClass(notClass)))
				&& ((board[(row+i)-1][(col+j)+1].children.length < 2))
				){
				addClassToCell((row+i)-1, (col+j)+1, " highlighted");
				eats = true;
				for (var a = (row+i)-2, b = (col+j)+2; a >= 0 && b <= 7; a--, b++) {
					if (board[a][b].children.length < 2)
						addClassToCell(a, b, " highlighted");
					else
						break;
				};	
				break;
			}
		}
	}
	for (var i = -1, j = -1; row+i>=1 && col+j>=1; i--, j--){
		if (board[row+i][col+j].children.length >= 2){
			if ((($(board[row+i][col+j].children[0]).hasClass(notClass)))
				&& ((board[(row+i)-1][(col+j)-1].children.length < 2))
				){
				addClassToCell((row+i)-1, (col+j)-1, " highlighted");
				eats = true;
				for (var a = (row+i)-2, b = (col+j)-2; a >= 0 && b >= 0; a--, b--) {
					if (board[a][b].children.length < 2)
						addClassToCell(a, b, " highlighted");
					else
						break;
				};
				break;
			}
		}
	}
	return eats;
}

function backTrackChip(squareRow, squareCol){
	console.log(squareRow, squareCol);
	if ((selectRow > squareRow) && (selectCol > squareCol)){
		console.log("BACKTRACK 1");
		for (var i = squareRow, j = squareCol; i < selectRow && j < selectCol; i++, j++) {
			console.log("BACKTRACK 1" + i + " " + j);
			if (board[i][j].children.length >= 2){
				alert("GOT IT 1!");
				damaEat(squareRow, squareCol, $(board[i][j].children[0]));
				break;
			}
		};
	}
	else if ((selectRow < squareRow) && (selectCol > squareCol)){
		console.log("BACKTRACK 2");
		for (var i = squareRow, j = squareCol; i > selectRow && j < selectCol; i--, j++) {
			console.log("BACKTRACK 2" + i + " " + j);
			if (board[i][j].children.length >= 2){
				alert("GOT IT 2!");
				damaEat(squareRow, squareCol, $(board[i][j].children[0]));
				break;
			}
		};
	}
	// if less than ang square sa select ++
	else if ((selectRow > squareRow) && (selectCol < squareCol)){
		console.log("BACKTRACK 3");
		for (var i = squareRow, j = squareCol; i < selectRow && j > selectCol; i++, j--) {
			console.log("BACKTRACK 3" + i + " " + j);
			if (board[i][j].children.length >= 2){
				alert("GOT IT 3!");
				damaEat(squareRow, squareCol, $(board[i][j].children[0]));
				break;
			}
		};
	}
	else if ((selectRow < squareRow) && (selectCol < squareCol)){
		console.log("BACKTRACK 4");
		for (var i = squareRow, j = squareCol; i > selectRow && j > selectCol; i--, j--) {
			console.log("BACKTRACK 4" + i + " " + j);
			if (board[i][j].children.length >= 2){
				alert("GOT IT 4!");
				damaEat(squareRow, squareCol, $(board[i][j].children[0]));
				break;
			}
		};
	}

	updateBoard();
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
	checkSuccessionDama();
}

function checkSuccessionDama(){
	selectCol = $(".selected").parent().parent().children().index($(".selected").parent());
	selectRow =  $(".selected").parent().parent().parent().children().index($(".selected").parent().parent());
	$(".selected").removeClass(" highlighted");
	canEat = checkDamaEat(selectRow, selectCol);
	if (!canEat){
		$(".selected").removeClass(" selected");
		$(".clicked").removeClass(" clicked");
		$(".highlighted").removeClass(" highlighted");
		switchPlayers();
	}
	else{
//		backTrackChip(squareRow, squareCol);
	}
}