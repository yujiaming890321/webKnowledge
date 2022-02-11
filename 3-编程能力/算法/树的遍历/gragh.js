/*
 * @Author: yujiaming
 * @Date: 2021-06-07 15:42:51
 * @LastEditTime: 2021-06-07 17:41:31
 * @LastEditors: yujiaming
 */
/**
 * 队列
 */
function Queue(){
    let queue = [];
    //入队
    this.enqueue = function(element){
        queue.push(element);
    }
    //出队
    this.dequeue = function(){
        return queue.shift();
    }
    //检查队头元素
    this.front = function(){
        return queue[0];
    }
    //检查队列是否为空
    this.isEmpty = function(){
        return queue.length === 0;
    }
    //获取队列长度
    this.size = function(){
        return queue.length;
    }
    //检查队列
    this.getQueue = function(){
        return queue;
    }
}

/**
 * 栈
 */
function Stack(){
    let stack = [];
    //入栈
    this.push = function(element){
        stack.push(element);
    }
    //出栈
    this.pop = function(){
        return stack.pop();
    }
    //检查栈顶元素
    this.peek = function(){
        return stack[stack.length - 1];
    }
    //检查栈是否为空
    this.isEmpty = function(){
        return stack.length === 0;
    }
    //清空栈
    this.clear = function(){
        stack = [];
    }
    //获取栈长度
    this.size = function(){
        return stack.length;
    }
    //检查栈
    this.getStack = function(){
        return stack;
    }
}

/**
 * 顶点
 * @param {T} data 
 */
function Vertex(data = null) {
    let edges = ArrayList()
    this.addEdge = function(edge){
        edges.add(edge)
    }
    this.toString = function() {
        return data.toString()
    }
}

/**
 * 边
 * @param {Vertex} from 
 * @param {Vertex} to 
 * @param {number} weight 
 */
function Edge(from, to, weight = 0) {
    this.from = from;
    this.to = to;
    this.weight = weight;
}

/**
 * 图
 */
function Graph(){
    // 顶点集合
    this.vertexes = [];

    // 边集合
    this.edges = {};

    //添加顶点
    this.createVertex = function(value) {
        let matchingVertices = vertices.filter((item) => { return item == value})

        if (matchingVertices.length > 0) {
            return matchingVertices[matchingVertices.length - 1]
        }

        let vertex = new Vertex(value)
        vertices.add(vertex)
        return vertex
    }
    
    //添加顶点
    this.addVertex = function(v){
        if(!vertexes.includes(v)){
            vertexes.push(v);
            edges[v] = [];
        }
    }

    //添加边
    this.addDirectedEdge = function(fromVertexes, toVertexes, weight = 0){
        if(vertexes.includes(fromVertexes) && vertexes.includes(toVertexes)){
            let edge = new Edge(fromVertexes, toVertexes, weight)
            fromVertexes.addEdge(edge)
            edges[fromVertexes].add(edge)
        }
    }
    
    this.addUnDirectedEdge = function(fromVertexes, toVertexes, weight = 0){
        addDirectedEdge(fromVertexes, toVertexes, weight)
        addDirectedEdge(toVertexes, fromVertexes, weight)
    }

    //打印邻接表
    this.print = function(){
        vertexes.forEach(element => {
            let string = element + " -> ";
            let prefix = "[";
            let suffix = "]";
            string = string + prefix
            edges[element].forEach(element2 => {
                string += element2;
            });
            string = string + suffix
            console.log(string);
        });
    }
    
    //广度优先遍历需要用到的函数，将每个顶点颜色初始化为white
    function initColor(){
        var color = {};
        vertexes.forEach(element => {
            color[element] = 'white';
        });
        return color;
    }

    //广度优先遍历
    //用颜色标记状态 white -> 未探索  grey -> 已发现  black -> 已探索
    this.bfs = function(v , callback){
        //初始化颜色
        var color = initColor();
        //创建队列
        var queue = new Queue();
        queue.enqueue(v);

        while(!queue.isEmpty()){
            //正在遍历的顶点now
            var now = queue.dequeue();
            //遍历now相连的每个顶点
            edges[now].forEach(element => {
                if(color[element] === 'white'){
                    queue.enqueue(element);
                    color[element] = 'grey';
                }
            });
            color[now] = 'black';
            if(callback){
                callback(now);
            }
        }
    }

    //获取最短路径
    this.shortestPath = function(from , to){
        //路径栈，从to不断寻找回溯点，在寻找过程中推进栈，最后后进先出拿出来
        var path = new Stack(),
        //包含 pre 回溯点 和 d 距离 的对象obj
        obj = this.BFS(from);
        while(to !== from){
            path.push(to);
            to = obj.pre[to];
        }
        path.push(to);

        var s = path.pop();
        while(!path.isEmpty()){
            s += ' => ';
            s += path.pop();
        }
        return s;
    }
    
    //获取最短路径需要用到的改良的广度优先算法
    //回溯点 pre
    //距离   d
    this.BFS = function(v , callback){
        //初始化颜色
        var color = initColor();
        //创建队列
        var queue = new Queue();
        queue.enqueue(v);

        var d = {},
        pre = {};
        //初始化d和pre
        vertexes.forEach(element => {
            d[element] = 0;
            pre[element] = null;
        });

        while(!queue.isEmpty()){
            //正在遍历的顶点now
            var now = queue.dequeue();
            //遍历now相连的每个顶点
            edges[now].forEach(element => {
                if(color[element] === 'white'){
                    queue.enqueue(element);
                    color[element] = 'grey';

                    pre[element] = now;
                    d[element] = d[now] + 1;
                }
            });
            color[now] = 'black';
            if(callback){
                callback(now);
            }
        }
        return {
            pre: pre,
            d: d
        };
    }

    //深度优先遍历
    this.dfs = function(v , callback){
        var color = initColor();
        dfs(v , color , callback);
    }

    //深度优先遍历需要用到的遍历函数
    function dfs(v , color , callback){
        color[v] = 'grey';
        edges[v].forEach(element => {
            if(color[element] === 'white'){
                dfs(element , color , callback);
            }
        });
        color[v] = 'black';
        if(callback){
            callback(v);
        }
    }
}

// var graph = Graph();
// var vertexA = "A"
// var vertexB = "B"
// var vertexC = "B"
// var vertexD = "B"
// var vertexE = "B"
// var vertexF = "B"
// var vertexG = "B"

// graph.addVertex(vertexA);
// graph.addVertex(vertexB);
// graph.addVertex(vertexC);
// graph.addVertex(vertexD);
// graph.addVertex(vertexE);
// graph.addVertex(vertexF);
// graph.addVertex(vertexG);

// graph.addUnDirectedEdge(vertexA, vertexB, )

let planeGraph = new Graph()
let hk = planeGraph.createVertex("Hong Kong")
let ny = planeGraph.createVertex("New York")
let mosc = planeGraph.createVertex("Moscow")
let ld = planeGraph.createVertex("London")
let pairs = planeGraph.createVertex("Pairs")
let am = planeGraph.createVertex("Amsterdam")
let sf = planeGraph.createVertex("San Francisco")
let ja = planeGraph.createVertex("Juneau Alaska")
let tm = planeGraph.createVertex("Timbuktu")

planeGraph.addUnDirectedEdge(hk, sf, 500.0)
planeGraph.addUnDirectedEdge(hk,mosc,900.0)
planeGraph.addDirectedEdge(sf, ja, 300.0)
planeGraph.addUnDirectedEdge(sf, ny, 150.0)
planeGraph.addDirectedEdge(mosc,ny, 750.0)
planeGraph.addDirectedEdge(ld, mosc, 200.0)
planeGraph.addUnDirectedEdge(ld, pairs, 70.0)
planeGraph.addDirectedEdge(sf,pairs, 800.0)
planeGraph.addUnDirectedEdge(pairs, tm, 250.0)
planeGraph.addDirectedEdge(am, pairs, 50.0)

planeGraph.print()