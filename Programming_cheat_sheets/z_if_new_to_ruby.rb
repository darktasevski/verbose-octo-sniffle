#---------------------------------------------------------------------- 
# commentatios (que nao serao tratados como codigo)

#---------------------------------------------------------------------- 
puts "hello"  # resultado: hello


#---------------------------------------------------------------------- variaveis
nome = "brian spinos"
puts nome # resultado:  brian spinos
#---------------------------------------------------------------------- funcoes
# criando uma funcao:
def andar
    puts "estou andando" 
end

# usando uma funcao:
walk  # resultado:  estou andando

#---------------------------------------------------------------------- funcoes com parametros

# parametros sao os dados que voce da para a funcao
def cumprimentar(nome)
    puts "bom dia #{nome}, tudo joia?" 
end

cumprimentar("brian") # resultado: bom dia brian, tudo joia?

#---------------------------------------------------------------------- retorno das funcoes
def calcularSoma(n1, n2)
    puts "calculando..."
    return n1 + n2
end

resultado = calcularSoma(10, 20)

puts resultado # resultado:  30  (30 foi o que a funcao nos devolveu, dai podemos guarda-la numa variavel!)

#---------------------------------------------------------------------- classes
# classes (usadas para criar varios objetos do mesmo tipo)
class Pessoa
    def falar
        puts "estou falando"
    end

    def caminhar
        puts "estou caminhando"
    end
end

brian = Pessoa.new # criando um objeto
brian.falar # resultado: estou falando
brian.caminhar # estou caminhando

erich = Pessoa.new # criando um objeto
erich.falar # resultado: estou falando
erich.caminhar # estou caminhando 

#---------------------------------------------------------------------- 
