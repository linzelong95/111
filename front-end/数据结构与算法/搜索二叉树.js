// https://juejin.cn/post/6870444463823683598
// https://juejin.cn/post/6844904063650234375

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function insertNode(oldNode, newNode) {
  if (newNode.val < oldNode.val) {
    if (oldNode.left === null) {
      oldNode.left = newNode;
    } else {
      insertNode(oldNode.left, newNode);
    }
  } else {
    if (oldNode.right === null) {
      oldNode.right = newNode;
    } else {
      insertNode(oldNode.right, newNode);
    }
  }
}

function BinarySearchTree() {
  this.root = null;
}

// 插入
BinarySearchTree.prototype.insert = (val) => {
  const newNode = new TreeNode(val);
  if (this.root === null) {
    this.root = newNode;
  } else {
    insertNode(this.root, newNode);
  }
};

// 前序遍历
BinarySearchTree.prototype.preOrder = function (cb) {
  function preOrderNode(node) {
    if (node !== null) {
      // 1处理key，将node.key通过callback函数进行累加
      cb(node.val);
      // 2处理经过的左子树
      preOrderNode(node.left, cb);
      // 3处理经过的右子树
      preOrderNode(node.right, cb);
    }
  }
  preOrderNode(this.root);
};

// 中序遍历
BinarySearchTree.prototype.midOrder = function (cb) {
  function midOrderNode(node) {
    if (node !== null) {
      //  1. 中序遍历左节点
      midOrderNode(node.left);
      //  2. 找到根节点
      cb(node.val);
      //  3. 中序遍历右节点
      midOrderNode(node.right);
    }
  }
  midOrderNode(this.root);
};

// 后序遍历
BinarySearchTree.prototype.postOrder = function (cb) {
  function postOrderNode(node) {
    if (node !== null) {
      //  1. 后序遍历左子树节点
      postOrderNode(node.left);
      //  2. 后序遍历右子树节点
      postOrderNode(node.right);
      //  3. 找到根节点
      cb(node.val);
    }
  }
  postOrderNode(this.root);
};

/**
 * 最大值max
 * 在当右子树为null时，所在的元素为最大
 */
BinarySearchTree.prototype.max = () => {
  let node = this.root;
  let val = null;
  while (node) {
    val = node.val;
    node = node.right;
  }
  return val;
};

/**
 * 最小值min
 * 在当左子树为null时，所在的元素为最小
 */
BinarySearchTree.prototype.min = () => {
  let node = this.root;
  let val = null;
  while (node) {
    val = node.val;
    node = node.left;
  }
  return val;
};

// 层序遍历
BinarySearchTree.prototype.levelOrder = function () {
  const res = [];
  function levelOrderNode(node, level) {
    if (!node) return null;
    // 当前层数组初始化
    res[level] = res[level] || [];
    res[level].push(node.val);
    // 下一层 +1
    levelOrderNode(node.left, level + 1);
    levelOrderNode(node.right, level + 1);
  }
  levelOrderNode(this.root, 0);
  return res;
};

/**
 * 搜索是否存在某个key
 */
BinarySearchTree.prototype.search = (val) => {
  let current = this.root;
  while (current) {
    if (val < current.val) {
      current = current.left;
    } else if (val > current.val) {
      current = current.right;
    } else {
      return true;
    }
  }
  return false;
};

/**
 * 删除某个key
 * 1 若key为叶子节点，key的父节点指向null
 * 2 若key后只有一个节点，这key的父节点指向key的子节点
 * 3.若key后有两个节点，需要考虑前驱或者后继节点来填补，再调整后续的节点变动
 * 4.二叉搜索树中，一个节点的前驱节点就是左子树的最右节点，也是左子树的最大节点，这就是中序遍历时，那个前驱节点的位置了。同理，后继也是一样。
 */

BinarySearchTree.prototype.remove = function (val) {
  function findMaxNode(root) {
    // 找最大值,往左走一步,然后一路往右走到头
    let res = root.left;
    while (res.right != null) {
      res = res.right;
    }
    return res;
  }

  function findMinNode(root) {
    // 找最小值,往右走一步,然后一路往左走到头
    let res = root.right;
    while (res.left != null) {
      res = res.left;
    }
    return res;
  }

  function deleteNode(root) {
    if (root == null) {
      return null;
    }
    if (root.val == val) {
      // 如果两个子节点都是null,说明是叶子节点,直接删除即可
      if (root.left == null && root.right == null) {
        root = null;
      } else if (root.right != null) {
        // 如果右子树不为空,找到后继节点,替换
        root.val = findMinNode(root).val;
        root.right = deleteNode(root.right, root.val);
      } else {
        // 如果左子树不为空,找到前驱节点,替换
        root.val = findMaxNode(root).val;
        root.left = deleteNode(root.left, root.val);
      }
    } else if (val < root.val) {
      // 处理左子树
      root.left = deleteNode(root.left, val);
    } else {
      // 处理右子树
      root.right = deleteNode(root.right, val);
    }
    return root;
  }
  return deleteNode(this.root);
};

// ---------------
// 前序遍历（迭代）
var preOrderTraversal = function (root) {
  if (!root) return [];
  const stack = [root];
  const res = [];
  while (stack.length) {
    // 出栈
    const cur = stack.pop();
    res.push(cur.val);
    // 子节点存在压入栈中，先右再左
    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }
  return res;
};

// 中序遍历(迭代)
var inOrderTraversal = function (root) {
  if (!root) return [];
  const stack = [];
  let cur = root;
  const res = [];
  while (stack.length || cur) {
    // 左节点都先压入栈
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    const node = stack.pop();
    res.push(node.val);
    if (node.right != null) {
      cur = node.right;
    }
  }
  return res;
};

// 后序遍历(迭代)
var postOrderTraversal = function (root) {
  if (!root) return null;
  const res = [];
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    // 总是头部插入，先被插入的在后面。
    res.unshift(cur.val);
    cur.left && stack.push(cur.left);
    cur.right && stack.push(cur.right);
  }

  return res;
};

// 层序遍历（迭代）
var levelOrder = function (root) {
  if (root == null) return [];
  const ans = [];
  let level = 0;
  const queue = [root];
  while (queue.length) {
    ans.push([]);
    const len = queue.length;
    // 通过遍历，提前执行完一层的所有元素，层级level就可以+1
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      ans[level].push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    level++;
  }
  return ans;
};
