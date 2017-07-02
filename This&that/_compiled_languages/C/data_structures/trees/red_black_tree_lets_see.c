// I guess its works :)


// something cool here is that that I use an array to house the two children of the node, and then I can clean up the semetric code!!!

// see http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_rbtree.aspx

#include <stdio.h>
#include <stdlib.h>

//-------------------------------------------------------------------- structs
typedef struct node {
    int red;
    int data;
    struct node *link[2];
} Node;

typedef struct tree {
    struct node *root;
} Tree;



//-------------------------------------------------------------------- helper function
int is_red(Node *root) {
    return root != NULL && root->red == 1;
}

//-------------------------------------------------------------------- single rotation
Node *single_rotation(Node *root, int dir) {
    Node *save = root->link[!dir];

    root->link[!dir] = save->link[dir];
    save->link[dir] = root;

    root->red = 1;
    save->red = 0;

    return save;
}
//-------------------------------------------------------------------- double rotation
Node *double_rotation(Node *root, int dir) {
    root->link[!dir] = single_rotation(root->link[!dir], !dir);

    return single_rotation(root, dir);
}
//-------------------------------------------------------------------- tester
int assert_rb_tree(Node *root)
{
    int lh, rh;  // left and right height ?

    if (root == NULL) {
        return 1;
    } else {
        // left and right node ?
        Node *ln = root->link[0];
        Node *rn = root->link[1];

        /* Consecutive red links */
        if (is_red(root)) {
            if (is_red(ln) || is_red(rn)) {
                puts("Red violation");
                return 0;
            }
        }

        lh = assert_rb_tree(ln);
        rh = assert_rb_tree(rn);

        /* Invalid binary search tree */
        if ((ln != NULL && ln->data >= root->data) || (rn != NULL && rn->data <= root->data)) {
            puts("Binary tree violation");
            return 0;
        }

        /* Black height mismatch */
        if (lh != 0 && rh != 0 && lh != rh) {
            puts("Black violation");
            return 0;
        }

        /* Only count black links */
        if (lh != 0 && rh != 0) {
            return is_red(root) ? lh : lh + 1;
        } else {
            return 0;
        }
    }
}

//-------------------------------------------------------------------- create a red node
Node * make_node(int data) {
    Node * rn = (Node *)malloc(sizeof *rn);

    if (rn != NULL) {
        rn->data = data;
        rn->red = 1; /* 1 is red, 0 is black */
        rn->link[0] = NULL;
        rn->link[1] = NULL;
    }

    return rn;
}


//--------------------------------------------------------------------
Node *jsw_remove_balance(Node *root, int dir, int *done) {
    Node *p = root;
    Node *s = root->link[!dir];

    /* Case reduction, remove red sibling */
    if (is_red(s)) {
        root = single_rotation(root, dir);
        s = p->link[!dir];
    }

    if (s != NULL) {
        if (!is_red(s->link[0]) && !is_red(s->link[1])) {
            if (is_red(p)) {
                *done = 1;
            }

            p->red = 0;
            s->red = 1;
        } else {
            int save = p->red;
            int new_root = (root == p);

            if (is_red(s->link[!dir])) {
                p = single_rotation(p, dir);
            } else {
                p = double_rotation(p, dir);
            }

            p->red = save;
            p->link[0]->red = 0;
            p->link[1]->red = 0;

            if (new_root)
            {
                root = p;
            }
            else
            {
                root->link[dir] = p;
            }

            *done = 1;
        }
    }

    return root;
}

//--------------------------------------------------------------------
// int jsw_insert(Tree *tree, int data)
// {
//     if (tree->root == NULL)
//     {
//         /* Empty tree case */
//         tree->root = make_node(data);

//         if (tree->root == NULL)
//         {
//             return 0;
//         }
//     }
//     else
//     {
//         Node head = { 0 }; /* False tree root */

//         Node *g, *t;     /* Grandparent & parent */
//         Node *p, *q;     /* Iterator & parent */
//         int dir = 0, last;

//         /* Set up helpers */
//         t = &head;
//         g = p = NULL;
//         q = t->link[1] = tree->root;

//         /* Search down the tree */
//         for (;;)
//         {
//             if (q == NULL)
//             {
//                 /* Insert new node at the bottom */
//                 p->link[dir] = q = make_node(data);

//                 if (q == NULL)
//                 {
//                     return 0;
//                 }
//             }
//             else if (is_red(q->link[0]) && is_red(q->link[1]))
//             {
//                 /* Color flip */
//                 q->red = 1;
//                 q->link[0]->red = 0;
//                 q->link[1]->red = 0;
//             }

//             /* Fix red violation */
//             if (is_red(q) && is_red(p))
//             {
//                 int dir2 = t->link[1] == g;

//                 if (q == p->link[last])
//                 {
//                     t->link[dir2] = single_rotation(g, !last);
//                 }
//                 else
//                 {
//                     t->link[dir2] = double_rotation(g, !last);
//                 }
//             }

//             /* Stop if found */
//             if (q->data == data)
//             {
//                 break;
//             }

//             last = dir;
//             dir = q->data < data;

//             /* Update helpers */
//             if (g != NULL)
//             {
//                 t = g;
//             }

//             g = p, p = q;
//             q = q->link[dir];
//         }

//         /* Update root */
//         tree->root = head.link[1];
//     }

//     /* Make root black */
//     tree->root->red = 0;

//     return 1;
// }


//-------------------------------------------------------------------- insert recursive (helper)
Node *jsw_insert_r(Node *root, int data)
{
    if (root == NULL)
    {
        root = make_node(data);
    }
    else if (data != root->data)
    {
        int dir = root->data < data;

        root->link[dir] = jsw_insert_r(root->link[dir], data);

        if (is_red(root->link[dir]))
        {
            if (is_red(root->link[!dir]))
            {
                /* Case 1 */
                root->red = 1;
                root->link[0]->red = 0;
                root->link[1]->red = 0;
            }
            else
            {
                /* Cases 2 & 3 */
                if (is_red(root->link[dir]->link[dir]))
                {
                    root = single_rotation(root, !dir);
                }
                else if (is_red(root->link[dir]->link[!dir]))
                {
                    root = double_rotation(root, !dir);
                }
            }
        }
    }

    return root;
}
//-------------------------------------------------------------------- insert function
int jsw_insert(Tree *tree, int data)
{
    tree->root = jsw_insert_r(tree->root, data);
    tree->root->red = 0;

    return 1;
}
//-------------------------------------------------------------------- remove recursive (helper)
Node *jsw_remove_r(Node *root, int data, int *done)
{
    if (root == NULL)
    {
        *done = 1;
    }
    else
    {
        int dir;

        if (root->data == data)
        {
            if (root->link[0] == NULL || root->link[1] == NULL)
            {
                Node *save = root->link[root->link[0] == NULL];

                /* Case 0 */
                if (is_red(root))
                {
                    *done = 1;
                }
                else if (is_red(save))
                {
                    save->red = 0;
                    *done = 1;
                }

                free(root);

                return save;
            }
            else
            {
                Node *heir = root->link[0];

                while (heir->link[1] != NULL)
                {
                    heir = heir->link[1];
                }

                root->data = heir->data;
                data = heir->data;
            }
        }

        dir = root->data < data;
        root->link[dir] = jsw_remove_r(root->link[dir], data, done);

        if (!*done)
        {
            root = jsw_remove_balance(root, dir, done);
        }
    }

    return root;
}
//--------------------------------------------------------------------
// int jsw_remove(Tree *tree, int data)
// {
//     int done = 0;

//     tree->root = jsw_remove_r(tree->root, data, &done);

//     if (tree->root != NULL)
//     {
//         tree->root->red = 0;
//     }

//     return 1;
// }

//-------------------------------------------------------------------- remove function
int jsw_remove(Tree *tree, int data)
{
    if (tree->root != NULL)
    {
        Node head = { 0 }; /* False tree root */
        Node *q, *p, *g; /* Helpers */
        Node *f = NULL;  /* Found item */
        int dir = 1;

        /* Set up helpers */
        q = &head;
        g = p = NULL;
        q->link[1] = tree->root;

        /* Search and push a red down */
        while (q->link[dir] != NULL)
        {
            int last = dir;

            /* Update helpers */
            g = p, p = q;
            q = q->link[dir];
            dir = q->data < data;

            /* Save found node */
            if (q->data == data)
            {
                f = q;
            }

            /* Push the red node down */
            if (!is_red(q) && !is_red(q->link[dir]))
            {
                if (is_red(q->link[!dir]))
                {
                    p = p->link[last] = single_rotation(q, dir);
                }
                else if (!is_red(q->link[!dir]))
                {
                    Node *s = p->link[!last];

                    if (s != NULL)
                    {
                        if (!is_red(s->link[!last]) && !is_red(s->link[last]))
                        {
                            /* Color flip */
                            p->red = 0;
                            s->red = 1;
                            q->red = 1;
                        }
                        else
                        {
                            int dir2 = g->link[1] == p;

                            if (is_red(s->link[last]))
                            {
                                g->link[dir2] = double_rotation(p, last);
                            }
                            else if (is_red(s->link[!last]))
                            {
                                g->link[dir2] = single_rotation(p, last);
                            }

                            /* Ensure correct coloring */
                            q->red = g->link[dir2]->red = 1;
                            g->link[dir2]->link[0]->red = 0;
                            g->link[dir2]->link[1]->red = 0;
                        }
                    }
                }
            }
        }

        /* Replace and remove if found */
        if (f != NULL)
        {
            f->data = q->data;
            p->link[p->link[1] == q] = q->link[q->link[0] == NULL];
            free(q);
        }

        /* Update root and make it black */
        tree->root = head.link[1];

        if (tree->root != NULL)
        {
            tree->root->red = 0;
        }
    }

    return 1;
}

//-------------------------------------------------------------------- print in order
void inorder(node *temp) {
   if (temp != NULL) {
      inorder(temp->link[0]);
      printf("%d ", temp->data);
      inorder(temp->link[1]);
   }
}




//-------------------------------------------------------------------- main
int main(){
    printf("inorder:\n");

    Tree * tree;

    jsw_insert(tree, 1);
    jsw_insert(tree, 100);
    jsw_insert(tree, 99);
    jsw_insert(tree, 88);
    jsw_insert(tree, 10);
    jsw_insert(tree, 12);
    jsw_insert(tree, 13);
    jsw_insert(tree, 15);


    jsw_remove(tree, 10);

    inorder(tree->root);

    assert_rb_tree(tree->root);

    return 0;
}