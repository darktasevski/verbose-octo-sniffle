# Trie 


# Letter node
class Node 
	attr_accessor :letter, :is_word, :next

	def initialize(letter)
		@letter = letter
		@is_word = false
		@next = nil
	end
end


class Trie
	attr_accessor :head

	def initialize
		@head = create_node_array
	end

	def create_node_array
		array = []
		('a'..'z').to_a.each do |letter|
			node = Node.new(letter)
			array.push(node)
		end

		return array
	end

	def check_word(word)
		word.downcase! # we dont want to deal with uppercase letters
		if word[/[a-zA-Z]+/] != word
			return false # invalid word
		end

		letters_from_word = word.split("")
		letter_count = letters_from_word.count
		last_letter_index = letter_count - 1

		current_alphabet_array = @head

		word_exists = false

		letters_from_word.each_with_index do |letter, index|  # index is zero based
			
			i = 0
			current_letter_node = current_alphabet_array[i]

			# find letter_node
			while current_letter_node.letter != letter
				i += 1
				current_letter_node = current_alphabet_array[i]
			end

			if current_letter_node.next == nil
				word_exists = false
				break
			end
			
			# mark last letter as `is_word`
			if index == last_letter_index && current_letter_node.is_word == true
				word_exists = true
				break
			end

			current_alphabet_array = current_letter_node.next
		end

		return word_exists
	end

	def add_word(word)
		word.downcase! # we dont want to deal with uppercase letters
		if word[/[a-zA-Z]+/] != word
			return nil # invalid word
		end

		letters_from_word = word.split("")
		letter_count = letters_from_word.count
		last_letter_index = letter_count - 1

		current_alphabet_array = @head

		letters_from_word.each_with_index do |letter, index|  # index is zero based
			
			i = 0
			current_letter_node = current_alphabet_array[i]

			# find letter_node
			while current_letter_node.letter != letter
				i += 1
				current_letter_node = current_alphabet_array[i]
			end

			if current_letter_node.next == nil
				current_letter_node.next = create_node_array
			end
			
			# mark last letter as `is_word`
			if index == last_letter_index
				current_letter_node.is_word = true
			end

			current_alphabet_array = current_letter_node.next
		end

		return true # return true if we were able to add the word
	end

end

trie = Trie.new
trie.add_word('brian') # true
trie.check_word('brian') # true
trie.check_word('Brian') # true
trie.check_word('brian2') # false (invalid word)


trie.add_word('erich') # true
trie.check_word('erich') # true
trie.check_word('Erich') # true
trie.check_word('erich2') # false (invalid word)
