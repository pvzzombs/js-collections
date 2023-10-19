var analysis = 0;
var empty = 0;
var playerX = 1;
var playerO = 2

var maxDepth = 6;

var player = [ playerX, playerO ];
//var player = [ playerO, playerX  ];

//console.log(player);

var WC = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

var board = [0, 0, 0,
             0, 0, 0,
             0, 0, 0];

/*for(var i=0; i<9; i++){
  board[i] = empty;
}*/

function isWin(p){
  for(var i=0; i<8; i++){
    if(board[WC[i][0]] == p &&
       board[WC[i][1]] == p &&
      board[WC[i][2]] == p){
      return true;
    }
  }
  return false;
}

function isDraw(){
  for(var i=0; i<9; i++){
    if(board[i] == empty){
      return false;
    }
  }
  return true;
}

function numOfEmptySlots(){
  var count = 0;
  for(var i=0; i<9; i++){
    if(board[i] == empty){
      count++;
    }
  }
  return count;
}

function listPossibleMoves(){
  var output = [];
  for(var i=0; i<9; i++){
    if(board[i] == empty){
      output.push(i);
    }
  }
  return output;
}

function mm(depth, alpha, beta, isMax){
  analysis++;
  if(depth == maxDepth){
    if(isMax){
      return -1;
    }else{
      return 1;
    }
  }
  if(isDraw()){
    return 0;
  }
  if(isWin(player[0])){
    return 1 * numOfEmptySlots();
  }
  if(isWin(player[1])){
    return -1 * numOfEmptySlots();
  }
  var bestScore, tempScore;
  var arr = listPossibleMoves();
  if(isMax){
    bestScore = -1000;
    for(var i=0; i<arr.length; i++){
      board[arr[i]] = player[0];
      tempScore = mm(depth+1, alpha, beta, !isMax);
      board[arr[i]] = empty;
      /*if(tempScore > bestScore){
        bestScore = tempScore;
      }*/
      bestScore = Math.max(tempScore, bestScore);
      alpha = Math.max(tempScore, alpha);
      if(alpha >= beta){
        break;
      }
    }
    return bestScore;
  }else{
    bestScore = 1000;
    if(depth == 0){
      console.log("=========");
    }
    for(var i=0; i<arr.length; i++){
      board[arr[i]] = player[1];
      tempScore = mm(depth+1, alpha, beta, !isMax);
      if(depth == 0){
        console.log("Score is " + tempScore);
      }
      board[arr[i]] = empty;
      /*if(tempScore < bestScore){
        bestScore = tempScore;
      }*/
      bestScore = Math.min(tempScore, bestScore);
      beta = Math.min(tempScore, beta);
      if(alpha >= beta){
        break;
      }
    }
    if(depth == 0){
      console.log("Depth: " + depth + ", bestScore: " + bestScore);

    }
    return bestScore;
  }
}

var l = listPossibleMoves();
var bestScore = -1000;
var bestMove = -1;
var alpha = -1000;
var beta = 1000;

//console.log(l);

for(var i=0; i<l.length; i++){
  board[l[i]] = player[0];
  var score = mm(0, alpha, beta, false);
  console.log("==" + score + ", move: " + l[i]);
  board[l[i]] = empty;
  alpha = Math.max(score, alpha);
  if(score > bestScore){
    bestMove = l[i];
    bestScore = score;
  }
  if(alpha >= beta){
    break;
  }
}

console.log("Best move is " + bestMove);
console.log("Best score is " + bestScore);
console.log("Number of board analyzed: " + analysis);
