const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  root() {
    return this.head;
  }

  add(value) {
    this.head = addWithin(this.head, value);

    function addWithin(node, value) {
      if (!node) return new Node(value);

      if (node.data === value) return node;

      if (value < node.data) {
        node.left = addWithin(node.left, value);
      } else {
        node.right = addWithin(node.right, value);
      }
      return node;
    }
  }

  has(value) {
    return SearchWithin(this.head, value);
    function SearchWithin(node, value) {
      if (!node) return false;

      if (node.data === value) return true;

      return value < node.data ? SearchWithin(node.left, value) : SearchWithin(node.right, value);
    }
  }

  find(value) {
    return SearchWithin(this.head, value);
    function SearchWithin(node, value) {
      if (!node) return null;

      if (node.data === value) return node;

      return value < node.data ? SearchWithin(node.left, value) : SearchWithin(node.right, value);
    }
  }

  remove(value) {
    this.head = removeNode(this.head, value);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.head) {
      return;
    }

    let node = this.head;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.head) {
      return;
    }

    let node = this.head;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

function test() {
  const tree = new BinarySearchTree();
  tree.add(9);
  tree.add(14);
  tree.add(2);
  tree.add(6);
  tree.add(128);
  tree.add(8);
  tree.add(31);
  tree.add(54);
  tree.add(1);
  console.log(JSON.stringify(tree, null, 2));
  tree.remove(14);
  tree.remove(8);
  tree.remove(9);
  // console.log(tree.has(14));
  // console.log(tree.has(8));
  // console.log(tree.has(9));
  // console.log(tree.has(2));
  // console.log(tree.has(6));
  console.log(tree.has(128));
  // console.log(tree.has(31));
  // console.log(tree.has(54));
  // console.log(tree.has(1));
  console.log(JSON.stringify(tree, null, 2));
}
test();

module.exports = {
  BinarySearchTree,
};
