class Node {
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
const a = new Node('a');
const b = new Node('b');
const c = new Node('c');
const e = new Node('e');
const d = new Node('d');
a.left = b;
a.right = c;
c.right = e;
c.left = d;
const sort = (root) =>{
    const stack = [root];
    const result = [];
    while (stack.length > 0){
        const current = stack.pop();
        result.push(current.val); 
        
        if (current.right){
            stack.push(current.right);
        }
        if (current.left){
        stack.push(current.left);
        }
        
    }
    console.log(result);
    return result;

} 
sort(a);