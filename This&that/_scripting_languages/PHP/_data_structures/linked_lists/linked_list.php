<?php

/**
 * Simple linked list implementation in PHP 5.5.5
 */
class Node{

    public $key;
    public $value;
    public $next;

    public function __construct($key, $value){
        $this->key = $key;
        $this->value = $value;
        $this->next = null;
    }
}

class LinkedList{
    public $head;
    public $tail;

    public function __construct(){
        $this->head = null;
        $this->tail = null;
    }

    public function append($key, $value){
        $newNode = new Node($key, $value);

        if($this->head == null){
            $this->head = $newNode;
            $this->tail = $newNode;
        }else{
            $this->tail->next = $newNode;
            $this->tail = $newNode;
        }
    }

    public function prepend($key, $value){
        $newNode = new Node($key, $value);

        if($this->head == null){
            $this->head = $newNode;
            $this->tail = $newNode;
        }else{
            $oldHead = $this->head;

            $newNode->next = $oldHead;

            $this->head = $newNode;
        }
    }

    public function display(){
        $currentNode = $this->head;

        while($currentNode){
            echo $currentNode->value . ' ';
            $currentNode = $currentNode->next;
        }

        echo "\n";
    }

    public function remove($key){
        $currentNode = $this->head;
        $prev = null;


        /**
         * Case #1: if there is a head node and it has the key to be deleted,
         * set the head to point to the next node (removing the head from the linked list!)
         */
        if($currentNode != null && $currentNode->key == $key){
            $this->head = $currentNode->next;
            return;
        }

        /**
         * Case #2: Its not the head.
         * while the node does not have the key, keep traversing
         */
        while($currentNode != null && $currentNode->key != $key){
            $prev = $currentNode;
            $currentNode = $currentNode->next;
        }

        /**
         * If key was not present in linked list (since we reached the end of the list)
         */
        if($currentNode == null) return;
 
        /**
         * Else, if we found the node, remove it!
         */
        $prev->next = $currentNode->next;
        // $currentNode = $currentNode->next; // could we do this instead?

    }
}

$linkedList = new LinkedList();

$linkedList->append("name", "brian");
$linkedList->append("age", "27");
$linkedList->prepend("address", "foobar");

$linkedList->display(); // foobar brian 27

$linkedList->remove("name"); 

$linkedList->display(); // foobar 27

