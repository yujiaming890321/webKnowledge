function bubbleSort(arr) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      // 相邻元素两两对比
      if (arr[j] > arr[j + 1]) {
        // 元素交换
        let temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

function selectionSort(arr) {
  // 选多少次
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    // 在arr[i + 1, ] 中找最小值索引， i+1 代表有序的下一个数，我们默认第一个元素是最小的
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex != i) {
      // 交换
      let temp = arr[minIndex]
      arr[minIndex] = arr[i]
      arr[i] = temp
    }
  }
}

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j
    let temp = arr[i]
    for (j = i; j > 0 && arr[j - 1] > temp; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = temp
  }
}

function mergeSort(arr) {
  let temp = new Array(arr.length) //在排序前，先建好一个长度等于原数组长度的临时数组，避免递归中频繁开辟空间
  sort(arr, 0, arr.length - 1, temp)
}

function sort(arr, left, right, temp) {
  if (left < right) {
    let mid = Math.floor((left + right) / 2)
    sort(arr, left, mid, temp) //左边归并排序，使得左子序列有序
    sort(arr, mid + 1, right, temp) //右边归并排序，使得右子序列有序
    merge(arr, left, mid, right, temp) //将两个有序子数组合并操作
  }
}

function merge(arr, left, mid, right, temp) {
  let i = left //左序列指针
  let j = mid + 1 //右序列指针
  let t = 0 //临时数组指针
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[t++] = arr[i++]
    } else {
      temp[t++] = arr[j++]
    }
  }
  while (i <= mid) {
    //将左边剩余元素填充进temp中
    temp[t++] = arr[i++]
  }
  while (j <= right) {
    //将右序列剩余元素填充进temp中
    temp[t++] = arr[j++]
  }
  t = 0
  //将temp中的元素全部拷贝到原数组中
  while (left <= right) {
    arr[left++] = temp[t++]
  }
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) {
    return
  }
  const mid = partition(arr, left, right)
  quickSort(arr, left, mid - 1)
  quickSort(arr, mid + 1, right)
}

/**
 * 将数组arr分为两部分，前一部分整体小于后一部分
 */
function partition(arr, left, right) {
  // 交换数组最左元素与数组的中间元素
  let midIndex = Math.floor((left + right) / 2)
  swap(arr, left, midIndex)
  // 基准元素
  const pivot = arr[left]
  let i = left + 1
  let j = right
  while (true) {
    while (i <= right && arr[i] < pivot) {
      i++
    }
    while (j >= left && arr[j] > pivot) {
      j--
    }
    if (i > j) {
      break
    } else {
      swap(arr, i, j)
      i++
      j--
    }
  }
  swap(arr, left, j)
  return j
}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function countingSort(arr, maxValue) {
  let bucket = new Array(maxValue + 1)
  let bucketLen = maxValue + 1
  let sortedIndex = 0
  let arrLen = arr.length

  for (let i = 0; i < arrLen; i++) {
    if (!bucket[arr[i]]) {
      bucket[arr[i]] = 0
    }
    bucket[arr[i]]++
  }

  for (let j = 0; j < bucketLen; j++) {
    while (bucket[j] > 0) {
      arr[sortedIndex++] = j
      bucket[j]--
    }
  }

  return arr
}

function bucketSort(arr, bucketSize = 20) {
  if (arr.length === 0) {
    return arr
  }

  let minValue = arr[0]
  let maxValue = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < minValue) {
      // 输入数据的最小值
      minValue = arr[i]
    } else if (arr[i] > maxValue) {
      // 输入数据的最大值
      maxValue = arr[i]
    }
  }

  // 桶的初始化
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  let buckets = new Array(bucketCount)
  for (let i = 0; i < buckets.length; i++) {
    buckets[i] = []
  }

  // 利用映射函数将数据分配到各个桶中
  for (i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i])
  }

  arr.length = 0
  for (let i = 0; i < buckets.length; i++) {
    // 对每个桶进行排序，这里使用了插入排序
    insertSort(buckets[i])
    for (let j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j])
    }
  }

  return arr
}

function radixSort(arr, maxDigit = 5) {
  let counter = []
  let mod = 10
  let dev = 1
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      let bucket = parseInt((arr[j] % mod) / dev)
      if (counter[bucket] == null) {
        counter[bucket] = []
      }
      counter[bucket].push(arr[j])
    }
    let pos = 0
    for (let j = 0; j < counter.length; j++) {
      let value = null
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value
        }
      }
    }
  }
  return arr
}

function heapSort(array) {
  makeMaxHeap(array)
  // makeMinHeap(array)
  // 上述逻辑，建堆结束
  // 下面，开始排序逻辑
  for (let j = array.length - 1; j > 0; j--) {
    // 元素交换,作用是去掉大顶堆
    // 把大顶堆的根元素，放到数组的最后；换句话说，就是每一次的堆调整之后，都会有一个元素到达自己的最终位置
    swap(array, 0, j)
    // 元素交换之后，毫无疑问，最后一个元素无需再考虑排序问题了。
    // 接下来我们需要排序的，就是已经去掉了部分元素的堆了，这也是为什么此方法放在循环里的原因
    // 而这里，实质上是自上而下，自左向右进行调整的
    adjustMaxHeap(array, 0, j)
    // adjustMinHeap(array, 0, j)
  }
  return array
}

function makeMaxHeap(array) {
  //这里元素的索引是从0开始的,所以最后一个非叶子结点array.length/2 - 1
  for (let i = array.length / 2 - 1; i >= 0; i--) {
    adjustMaxHeap(array, i) //调整堆
  }
}

function makeMinHeap(array) {
  //这里元素的索引是从0开始的,所以最后一个非叶子结点array.length/2 - 1
  for (let i = array.length / 2 - 1; i >= 0; i--) {
    adjustMinHeap(array, i) //调整堆
  }
}

function adjustMaxHeap(array, i, length = array.length) {
  // 先把当前元素取出来，因为当前元素可能要一直移动
  let temp = array[i]
  for (let k = 2 * i + 1; k < length; k = 2 * k + 1) {
    //2*i+1为左子树i的左子树(因为i是从0开始的),2*k+1为k的左子树
    // 让k先指向子节点中最大的节点
    if (k + 1 < length && array[k] < array[k + 1]) {
      //如果有右子树,并且右子树大于左子树
      k++
    }
    //如果发现结点(左右子结点)大于根结点，则进行值的交换
    if (array[k] > temp) {
      swap(array, i, k)
      // 如果子节点更换了，那么，以子节点为根的子树会受到影响,所以，循环对子节点所在的树继续进行判断
      i = k
    } else {
      //不用交换，直接终止循环
      break
    }
  }
}

function adjustMinHeap(array, i, length = array.length) {
  // 先把当前元素取出来，因为当前元素可能要一直移动
  let temp = array[i]
  for (let k = 2 * i + 1; k < length; k = 2 * k + 1) {
    //2*i+1为左子树i的左子树(因为i是从0开始的),2*k+1为k的左子树
    // 让k先指向子节点中最大的节点
    if (k + 1 < length && array[k] > array[k + 1]) {
      //如果有右子树,并且右子树小于左子树
      k++
    }
    //如果发现结点(左右子结点)小于于根结点，则进行值的交换
    if (array[k] < temp) {
      swap(array, i, k)
      // 如果子节点更换了，那么，以子节点为根的子树会受到影响,所以，循环对子节点所在的树继续进行判断
      i = k
    } else {
      //不用交换，直接终止循环
      break
    }
  }
}
