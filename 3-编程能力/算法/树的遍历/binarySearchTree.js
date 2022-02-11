(function () {
  class TreeNode {
    constructor(key) {
      this.key = key//节点值
      this.left = null//左侧节点
      this.right = null//右侧节点
    }
  }

  function defaultCompare(key, nodeKey) {
    return key < nodeKey
  }
  const printNode = (value) => console.log(value)

  class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
      this.compareFn = compareFn;//用来比较节点得值
      this.root = null //根节点
    }
    /**
     * 向树中插入一个新的键。
     * @param {*} key 
     */
    insert(key) {
      if (this.root === null) {//如果为空直接插入根节点
        this.root = new TreeNode(key)
      } else {//不为空递归插入
        this.insertNode(this.root, key)
      }
    }

    insertNode(node, key) {
      if (this.compareFn(key, node.key)) { // 如果小于当前节点 插入左节点
        if (node.left == null) { // 如果左节点为空
          node.left = new TreeNode(key); // 插入
        } else {//如果不为空传入当前节点在调用insert
          this.insertNode(node.left, key); // 递归插入左节点
        }
      } else {//如果大于 插入右节点
        if (node.right == null) { // 为空插入 
          node.right = new TreeNode(key); // 
        } else {
          this.insertNode(node.right, key); // 不为空递归
        }
      }
    }
    
    /**
     * 通过中序遍历方式遍历所有节点。
     * @param {*} callback 
     */
    inOrderTraverse(callback) {
      console.log('----中序遍历----')
      this.inOrderTraverseNode(this.root, callback)
    }
    inOrderTraverseNode(node, callback) {
      if (node != null) {//检查节点
        //访问左侧节点 递归会先找到最底层节点
        //为空时停止执行 并执行callbakc
        //此时left均为空 返回上一个节点
        this.inOrderTraverseNode(node.left, callback)
        callback(node.key)
        //上一个节点右节点
        //同左节点逻辑
        this.inOrderTraverseNode(node.right, callback)
      }
    }

    //通过先序遍历方式遍历所有节点。
    preOrderTraverse(callback) {
      console.log('----先序遍历----')
      this.preOrderTraverseNode(this.root, callback)
    }
    preOrderTraverseNode(node, callback) {
      if (node != null) {
        callback(node.key)
        this.preOrderTraverseNode(node.left, callback)
        this.preOrderTraverseNode(node.right, callback)
      }
    }

    //通过后序遍历方式遍历所有节点。
    postOrderTraverse(callback) {
      console.log('----后序遍历----')
      this.postOrderTraverseNode(this.root, callback)
    }
    postOrderTraverseNode(node, callback) { 
      if (node != null) {
        this.postOrderTraverseNode(node.left, callback)
        this.postOrderTraverseNode(node.right, callback)
        callback(node.key)
      }
    }
    //返回树中最小的值/键。
    min() { 
      return this.minNode(this.root)
    }
    minNode(node){
      //遍历寻找左侧节点中最后一个节点
      let current = node
      while (current != null && current.left != null) {
        current = current.left
      }
      return current
    }
    // 返回树中最大的值/键。
    max() {
      return this.maxNode(this.root)
    }
    maxNode(node) {
      let current = node
      while (current != null && current.left != null) {
        current = current.right
      }
      return current
    }

    //在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false。
    search(key){
      return this.searchNode(this.root, key)
    }
    searchNode(node, key){
      if(node === null){
        return false
      }
      // debugger
      if(key < node.key){
        return this.searchNode(node.left, key)
      }else if(key > node.key){
        return this.searchNode(node.right, key)
      }else{
        return true
      }
    }

    //从树中移除某个键
    remove(key) {
      this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key){
      if(node == null){
        return null
      }
      //遍历寻找节点
      if(key < node.key){
        node.left = this.removeNode(mode.left, key)
        return node
      }else if(key > node.key){
        node.right = this.removeNode(node.right, key)
        return node
      } else {
        //找到
        //第一种情况，没有左侧或没有右侧的节点 直接删除，由于引用的原因
        //reutrn null来清除父节点的指针
        if(node.left == null && node.right == null){
          node = null
          return node
        }
        //第二种，该节点有一个左边 或二者一个右边节点
        //通过return 改变引用
        if(node.left == null){
          node = node.right
          return node
        }else if(node.right == null){
          node = node.left
          return node
        }
        //第三种，该节点有两个节点
        const aux = this.minNode(node.right)
        node.key = aux.key
        node.right = this.removeNode(node.right, aux.key)
        return node
      }
    }

    //打印数据
    toString() {
      console.log(this.root)
    }
  }

  const initFunc = () => {
    console.log(domName)
    let tree = new BinarySearchTree()
    tree.insert(11)
    tree.insert(7)
    tree.insert(15)
    tree.insert(5)
    tree.insert(3)
    tree.insert(9)
    tree.insert(8)
    tree.insert(10)
    tree.insert(13)
    tree.insert(12)
    tree.insert(14)
    tree.insert(20)
    tree.insert(18)
    tree.insert(25)
    tree.insert(6)

    console.log("tree.toString(): ", tree.toString())
    console.log("tree.inOrderTraverse(printNode): ", tree.inOrderTraverse(printNode))
    console.log("tree.min():", tree.min())
    console.log("tree.max():", tree.max())
    console.log("tree.search(12):", tree.search(12))
  }
  let domName = 'binarySearchTree'
  document.getElementById(domName).addEventListener('click', initFunc)
})()