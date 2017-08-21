<?php

class Node{
    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
        $this->right = null;
        $this->left = null;
    }
}

class Tree{
    public function __construct(){
        $this->root = null;
        $this->size = 0;
    }

    public function insert($key, $value){
        // Iterative insertion:
        //$this->insertIteratively($key, $value);

        // Recursive insertion:
        $this->insertRecursively($this->root, $key, $value);

    }

    public function inOrder(){
        $this->inOrderRecursively($this->root);
    }

    //
    // Private
    //

    private function insertIteratively($key, $value){

        $newNode = new Node($key, $value);
        
        if($this->root == null){
            $this->root = $newNode;
            return;
        }

        $currentNode = $this->root;

        while(true){
            if($key > $currentNode->key){
                if($currentNode->right == null){
                    $currentNode->right = $newNode;
                    break;
                }else{
                    $currentNode = $currentNode->right;
                }
            }else{
                if($currentNode->left == null){
                    $currentNode->left = $newNode;
                    break;
                }else{
                    $currentNode = $currentNode->left;
                }
            }
        }   
    }

    private function insertRecursively(&$node, $key, $value){

        $newNode = new Node($key, $value);

        if($node == null){
            $node = $newNode;
            return;
        }

        if($key > $node->key){
            $this->insertRecursively($node->right, $key, $value);
        }else{
            $this->insertRecursively($node->left, $key, $value);
        }

    }

    private function inOrderRecursively($node){
        if($node != null){
            $this->inOrderRecursively($node->left);
            echo "Node: $node->key \n";
            $this->inOrderRecursively($node->right);
        }
    }
}


$t = new Tree();


$t->insert(1, 100);
$t->insert(2, 200);
$t->insert(3, 300);
$t->insert(4, 400);
$t->insert(5, 500);
$t->insert(6, 600);
$t->insert(7, 700);
$t->insert(8, 800);
$t->insert(9, 900);
$t->insert(10, 1000);

$t->inOrder();
