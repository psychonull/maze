function maze(x,y) {

  var n=x*y-1;
  if (n<0) {alert("illegal maze dimensions");return;}
  var horiz =[]; for (var j= 0; j<x+1; j++) horiz[j]= [],
      verti =[]; for (var j= 0; j<y+1; j++) verti[j]= [],
      here = [Math.floor(Math.random()*x), Math.floor(Math.random()*y)],
      path = [here],
      unvisited = [];
  for (var j = 0; j<x+2; j++) {
    unvisited[j] = [];
    for (var k= 0; k<y+1; k++)
      unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
  }
  while (0<n) {
    var potential = [[here[0]+1, here[1]], [here[0],here[1]+1],
        [here[0]-1, here[1]], [here[0],here[1]-1]];
    var neighbors = [];
    for (var j = 0; j < 4; j++)
      if (unvisited[potential[j][0]+1][potential[j][1]+1])
        neighbors.push(potential[j]);
    if (neighbors.length) {
      n = n-1;
      next= neighbors[Math.floor(Math.random()*neighbors.length)];
      unvisited[next[0]+1][next[1]+1]= false;
      if (next[0] == here[0]){
        horiz[next[0]][(next[1]+here[1]-1)/2]= true;
      }
      else{ 
        if(verti[(next[0]+here[0]-1)/2])
          verti[(next[0]+here[0]-1)/2][next[1]]= true;
      }
      path.push(here = next);
    } else 
      here = path.pop();
  }
  return {x: x, y: y, horiz: horiz, verti: verti};
}

module.exports = maze;
window.maze = maze;