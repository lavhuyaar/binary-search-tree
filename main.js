//Merge sort method that sorts the unsorted array
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2); //Middle index of the array
  const leftArr = arr.slice(0, mid); //Sub-array with elements at the indices less than the middle index
  const rightArr = arr.slice(mid); //Sub-array with elements at the remaining indices

  return merge(mergeSort(leftArr), mergeSort(rightArr)); //Recursively sort the left and right subarrays by calling mergeSort on each.
}

//Merge function which take two sub-arrays as parameter and returns a merged and sorted array
function merge(leftArr, rightArr) {
  let sortedArr = [];
   //While loop with the condition of having at least one element in both the sub-arrays
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      sortedArr.push(leftArr.shift()); //Remove and pushes the first element of left sub-array to empty sortedArray if smaller than the first element of right sub-array
    } else if (leftArr[0] > rightArr[0]) {
      sortedArr.push(rightArr.shift()); //Remove and pushes the first element of right sub-array to empty sortedArray if smaller than the first element of left sub-array
    } else if (leftArr[0] === rightArr[0]) {
      //If first element of both sub-arrays are equal, then to avoid duplicate elements, one of the element is deleted/removed
      rightArr.splice(0, 1); //Removes the duplicate element from right sub-array, ensuring a sortedArray with no duplicate elements
    }
  }
  return [...sortedArr, ...leftArr, ...rightArr];
  //Sorted array (left sub-array and right sub-array joined to it if not empty)
}

//Nodes(leaves, branches or roots) of the binary tree
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

//Binary Search Tree
class Tree {
  //Takes an unsorted array as the parameter and creates tree
  constructor(array) {
    this.array = mergeSort(array); //Sorts the passed array
    this.root = this.buildTree(this.array); //Creates a binary tree using the sorted elements of array
  }

  //Creates a binary tree recursively, takes sorted array as the parameter
  buildTree(arr) {
    if (arr.length === 0) return null; //Returns null if array is empty

    const mid = Math.floor(arr.length / 2); //Middle index of the array
    const root = new Node(arr[mid]); //New node created with the element at middle index of the array

    root.left = this.buildTree(arr.slice(0, mid)); //Recursively creates left branches and sub-branches with elements smaller than the element of middle index
    root.right = this.buildTree(arr.slice(mid + 1)); //Recursively creates right branches and sub-branches with elements larger than the element of middle index

    return root; //Returns an accurate binary tree
  }

  //Inserts node with the passed value to the tree
  insert(value, root = this.root) {
    //Creates the node having passed value as value
    const newNode = new Node(value);

    //Base Case of recursion, stops when the node is inserted in the tree
    if (!this.root) {
      //Incase the tree is empty or current node/root doesn't exist
      this.root = newNode; //The current node/root is created
    }
    if (value < root.value) {
      //If passed value is smaller than value of current root
      if (!root.left) {
        //And there is no left branch/leaf of current root
        root.left = newNode; //The leaf node is created at the left of current root
      } else {
        //If there is already a left branch/leaf of current root
        this.insert(value, root.left); //Calls insert() recursively with value and left branch/leaf of current root as parameters
      }
    } else {
      //If passed value is larger than value of current root
      if (!root.right) {
        //And there is no right branch/leaf of current root
        root.right = newNode; //The leaf node is created at the right of current root
      } else {
        //If there is already a right branch/leaf of current root
        this.insert(value, root.right); //Calls insert() recursively with value and right branch/leaf of current root as parameters
      }
    }
  }

  //Finds and returns root of the passed value
  find(value, root = this.root) {
    if (!root) return null; //Returns null if the tree is empty or the node with passed value is not found
    if (value === root.value) {
      return root; //Returns root if passed value is equal to the value of current node(root)
    } else if (value < root.value) {
      return this.find(value, root.left); //Recursively calls find() with the passed value and left leaf/branch of root node (if passed value is smaller than value of the current root)
    } else {
      return this.find(value, root.right); //Recursively calls find() with the passed value and right leaf/branch of root node (if passed value is larger than value of the current root)
    }
  }

  //Deletes node with the value of passed value
  deleteItem(value, root = this.root) {
    if (!root) return null; //Returns null if the tree is empty or value not found in the tree
    if (value < root.value) {
      root.left = this.deleteItem(value, root.left); //Recursively visits the left node of the root if the value is smaller
    } else if (value > root.value) {
      root.right = this.deleteItem(value, root.right); //Recursively visits the right node of the root if the value is larger
    } else {
      //If the leaf/root with passed value is found
      if (!root.left) return root.right; //If root/node has only right branch/leaf
      if (!root.right) return root.left; //If root/node has only left branch/leaf

      //If root/node has two branches/leaves
      let succ = this.getSuccessor(root); //Transverse to the smallest leaf of right branch (successor root)
      root.value = succ.value; //Replaces the value of root with successor root's value
      root.right = this.deleteItem(succ.value, root.right); //Recursively deletes the successor root
    }
    return root; //Returns the updated tree
  }

  getSuccessor(curr) {
    curr = curr.right; //Transverses to the right value of current root (which has both branches/leaves)
    while (curr && curr.left) {
      //Loops to get the smallest leaf of the current node/root
      curr = curr.left;
    }
    return curr; //Returns smallest leaf
  }

  //Prints the tree in an understanding visual format
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  //Prints the tree
  print() {
    console.log(this.root);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(7890000);
tree.prettyPrint();
// console.log(tree.find(1))
tree.deleteItem(23);
tree.deleteItem(7890000);
console.log(`----------------------`);
tree.prettyPrint();
tree.deleteItem(8);
console.log(`----------------------`);
tree.prettyPrint();
// tree.print()
