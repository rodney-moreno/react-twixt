const adjList = [[1,3], [0,2,3,4] , [1,4,5], [0,1,4], [1,2,3,5], [2,4]];
const visited = Array(6).fill(false);
const arr2 = [];
arr2.push(1);
arr2.push(2);
console.table(arr2);

const arr = new Array(10).fill([]);
arr[0].push(1);
console.table(arr);


function dfs(adjList, node) {
	visited[node] = true;
	console.log(node);
	for(const children of adjList[node]) {
		if(visited[children] !== true) {
			dfs(adjList, children);
		}
	}
}