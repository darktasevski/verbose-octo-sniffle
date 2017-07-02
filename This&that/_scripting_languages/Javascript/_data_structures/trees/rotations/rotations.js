/* right rotate 
 *
 *            X                            y
 *          /   \                        /   \ 
 *	    Y	 T3         ->          T1    x
 *	  / \                                /  \
 *       T1  T2                             T2   T3
 */
function(root){
	// identifying nodes
	y = root.left;
	t2 = y.right;

	// actual rotation
	y.right = x;
	x.left = t2;

	// new root
	return y; 
}

/* left rotate
 *
 *             X                            y
 *           /   \                        /   \
 *	    T1	  Y         ->          x       T3        
 *	          / \                  / \                 
 *	         T2  T3              T1   T2                
 */
function(root){
	// identifying nodes
	y = root.right;
	t2 = y.left;

	// actual rotation
	y.left = x;
	x.right = t2;

	// new root
	return y; 
}
