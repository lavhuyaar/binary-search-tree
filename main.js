function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);

  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(leftArr, rightArr) {
  let sortedArr = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      sortedArr.push(leftArr.shift());
    } else if (leftArr[0] > rightArr[0]) {
      sortedArr.push(rightArr.shift());
    } else if (leftArr[0] === rightArr[0]) {
      rightArr.splice(0, 1);
    }
  }
  return [...sortedArr, ...leftArr, ...rightArr];
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = mergeSort(array);
    this.root = this.buildTree(this.array);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert(value, root = this.root) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    }
    if (value < root.value) {
      if (!root.left) {
        root.left = newNode;
      } else {
        this.insert(value, root.left);
      }
    } else {
      if (!root.right) {
        root.right = newNode;
      } else {
        this.insert(value, root.right);
      }
    }
  }

  find(value, root = this.root) {
        if(!root) return null;
        if(value === root.value) {
            return root;
        } else if(value < root.value) {
            return this.find(value, root.left)
        }
        else {
            return this.find(value, root.right)
        }
   }


//   deleteItem(value, root = this.root) {
//     if(!root) {
//         return null
//     }
//     if(root.value === value) {
//         if(!root.left && !root.right) {
//             root = null;
//         } else if(!root.left) {
//             if(!root.right.left) {
//                 root = root.right;
//             } else if (!root.right){
//                 root = root.right.left;
//                 root.right.left = null;
//             } else {
//                 root = root.right
//             }
//         } else if(!root.right) {
//             if(!root.left.left) {
//                 root = root.left.right 
//              } else {
//                 root = root.left.left; 
//              }
//         }
    
//     }
//     if(value < root.value) {
//         if(!root.left) {
//             return null
//         } else {
//             this.deleteItem(value, root.left)
//         }
//     } else {
//         if(!root.right) {
//             return null;
//         } else {
//             this.deleteItem(value, root.right)
//         }
//     }
//   }

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

  print() {
    console.log(this.root)
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(7890000);
tree.prettyPrint();
console.log(tree.find(8))
// tree.print()
