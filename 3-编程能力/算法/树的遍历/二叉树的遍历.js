/*
 * @Author: yujiaming
 * @Date: 2021-06-04 10:14:01
 * @LastEditTime: 2021-06-10 11:50:05
 * @LastEditors: yujiaming
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/** 前序遍历 */
/* ------------------------------------------------ */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var preOrderTraversal = function (root) {
  const result = []
  if (!root) {
    return result
  }
  function preOrder(root, result) {
    if (root) {
      result.push(root.val)
      preOrder(root.left, result)
      preOrder(root.right, result)
    }
  }
  preOrder(root, result)
  return result
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preOrderTraversal = function (root) {
  const result = []
  const stack = []
  if (!root) {
    return result
  }
  /** 前序遍历顺序是 中 左 右 */
  stack.push(root)
  while (stack.length) {
    const cur = stack.pop()
    result.push(cur.val)
    /**
     * pop 取栈顶（最后一个元素），我们想遍历的顺序是 left ——> right，所以先push right后push left
     */
    if (cur.right) {
      stack.push(cur.right)
    }
    if (cur.left) {
      stack.push(cur.left)
    }
  }
  return result
}

/** 中序遍历 */
/* ------------------------------------------------ */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inOrderTraversal = function (root) {
  const result = []
  if (!root) {
    return result
  }
  function inOrder(root, result) {
    if (root) {
      inOrder(root.left, result)
      result.push(root.val)
      inOrder(root.right, result)
    }
  }
  inOrder(root, result)
  return result
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inOrderTraversal = function (root) {
  const result = []
  const stack = []
  if (!root) {
    return result
  }
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    result.push(root.val)
    root = root.right
  }
  return result
}

/** 后序遍历 */
/* ------------------------------------------------ */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postOrderTraversal = function (root) {
  const result = []
  const stack = []
  if (!root) {
    return result
  }
  function postOrder(root, result) {
    if (root) {
      postOrder(root.left, result)
      postOrder(root.right, result)
      result.push(root.val)
    }
  }
  postOrder(root, result)
  return result
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postOrderTraversal = function (root) {
  const result = []
  const stack = []
  if (!root) {
    return result
  }

  let prev = null
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (!root.right || root.right == prev) {
      result.push(root.val)
      prev = root
      root = null
    } else {
      stack.push(root)
      root = root.right
    }
  }
  return result
}
