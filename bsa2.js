class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    (this.key = key),
      (this.value = value),
      (this.parent = parent),
      (this.left = null),
      (this.right = null);
  }

  // Services
  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error("Key Error");
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }

  //helpers
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _isValidBST(node, min, max) {
    if (node === null) {
      return true;
    }
    if ((max !== null && node.val > max) || (min !== null && node.val < min)) {
      return false;
    }

    if (
      !this._isValidBST(node.left, min, node.val) ||
      !this._isValidBST(node.right, node.val, max)
    ) {
      return false;
    }
    return true;
  }

  validate(node) {
    return this._isValidBST(node, null, null);
  }

  maxHeight(node) {
    if (!node) return 0;
    let leftHeight = this.maxHeight(node.left);
    let rightHeight = this.maxHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  minHeight(node) {
    if (!node) return 0;
    let leftHeight = this.minHeight(node.left);
    let rightHeight = this.minHeight(node.right);

    return Math.min(leftHeight, rightHeight) + 1;
  }

  isBalanced(node) {
    if (typeof node === "undefined") {
      return undefined;
    }
    return this.maxHeight(node) - this.minHeight(node) >= 1;
  }

  nthLargest(node, k) {
    let result = null;
    let count = 0;

    while (node !== null) {
      if (node.right === null) {
        count++;
        if (count === k) {
          return (result = node);
        }
        node = node.left;
      } else {
        const successor = node.right;
        while (successor.left !== null && successor.left !== node) {
          successor = successor.left;

          if (successor.left === null) {
            successor.left = node;
            node = node.right;
          } else {
            successor.left = null;
            count++;
            if (count === k) {
              return (result = node);
            }
            node = node.left;
          }
        }
      }
      return result;
    }
  }

  dfsInOrder(values = []) {
    if (this.left) {
      values = this.left.dfsInOrder(values);
    }
    values.push(this.value);
    if (this.right) {
      values = this.right.dfsInOrder(values);
    }
    return values;
  }

  dfsPreOrder(values = []) {
    values.push(this.value);
    if (this.left) {
      values = this.left.dfsPreOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPreOrder(values);
    }
    return values;
  }

  dfsPostOrder(values = []) {
    if (this.left) {
      values = this.left.dfsPostOrder(values);
    }
    if (this.right) {
      values = this.right.dfsPostOrder(values);
    }
    values.push(this.value);
    return values;
  }
}

function main() {
  const travTree = new BinarySearchTree();

  travTree.insert(25, 25);
  travTree.insert(15, 15);
  travTree.insert(50, 50);
  travTree.insert(10, 10);
  travTree.insert(24, 24);
  travTree.insert(35, 35);
  travTree.insert(70, 70);
  travTree.insert(4, 4);
  travTree.insert(12, 12);
  travTree.insert(18, 18);
  travTree.insert(31, 31);
  travTree.insert(44, 44);
  travTree.insert(66, 66);
  travTree.insert(90, 90);
  travTree.insert(22, 22);

  console.log(travTree.dfsInOrder());
  console.log(travTree.dfsPreOrder());
  console.log(travTree.dfsPostOrder());
}

main();
