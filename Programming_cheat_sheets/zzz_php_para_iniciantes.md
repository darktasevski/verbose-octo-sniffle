# PHP para iniciantes

Use este link pra executar codigo PHP: [sandbox.onlinephpfunctions.com](http://sandbox.onlinephpfunctions.com/)

###### echo
```php
<?php


    echo "oi";

?>
```
```
o resultado será :  oi
```


###### Variaveis
```php
<?php

$meuNome = "Fulano";

echo $meuNome; 

?>
```
```
O resultado será :  Fulano
```

###### Interpolação
```php
<?php

$meuNome = "Fulano";

echo "oi $meuNome, como vai?"; 

?>
```
```
o resultado será :  oi Fulano, como vai?
```

###### matematica
```php
<?php
    $soma = 1 + 1;

    echo $soma;
?>
```
```
O resultado será :  2
```


###### funçōes
```php
<?php
    function dizerOi(){
        echo "oi";
    }

    dizerOi();
?>
```
```
O resultado será :  oi
```


###### funçōes com parametros
```php
<?php
    function dizerOi($nome, $idade){
        echo "oi $nome, voce tem $idade anos";
    }

    dizerOi("Fulano", 20);
?>
```
```
O resultado será :  oi Fulano, voce tem 20 anos
```


###### retornando um valor de uma função
```php
<?php
    function somaDeDoisNumeros($primeiroNumero, $segundoNumero){
        $resposta = $primeiroNumero + $segundoNumero;

        return $resposta;
    }

    $resultado = somaDeDoisNumeros(2, 2);

    echo $resultado;
?>
```
```
O resultado será :  4
```

###### classes
```php
<?php
    class Pessoa{
        function __construct($nome, $idade){
            $this->nome = $nome;
            $this->idade = $idade;
        }

        function dizerOi(){
            echo "Oi, meu nome é $this->nome, eu tenho $this->idade anos.";
        }
    }

    $fulano = new Pessoa("Fulano", 20);
    $fulano->dizerOi();
    
    $ciclano = new Pessoa("Ciclano", 25);
    $ciclano->dizerOi();
?>
```
```
O resultado será :  
    Oi, meu nome é Fulano, eu tenho 20 anos.
    Oi, meu nome é Ciclano, eu tenho 25 anos.
```


###### Condiçōes
```php
<?php

$idade = 16;

$podeDirigir = "Nao";

if($idade < 18){
    $podeDirigir = "Nao";
}else{
    $podeDirigir = "Sim";
}

echo $podeDirigir;
?>
```
```
O resultado será :  Nao
```
