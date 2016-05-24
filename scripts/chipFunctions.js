/* checks if the item on the baord has regular moves or if it 
can move from one box to a next observing the rules*/
	var offset = turn=="red"?1:-1;

function regularMoves(row, col, board){
	var canMove = false;
	console.log(row + "  " + col);
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
