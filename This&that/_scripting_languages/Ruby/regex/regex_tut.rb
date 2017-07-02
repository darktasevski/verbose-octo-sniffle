x = "some string"

x =~ /./ # boolean


/./ # any character, except new line


/mike|joe(\sSmith|\sDoe)/ # either nike or joe, and either Smith or Doe after

/^abc$/m # multi-line

/ship?/ # p is optional

/pirate\s(ship)?/ # ship is optional

/abc{2}/ repeat?

/abc{2, 10}/ range of repetition ?


/\bok\b/ # ok, but not okiedokie

/[^\d]/ # Not a digit


#------- number of characters
/x?/
/x*/
/x+/
/foo(enclose something here)bar/



#------- types of characters


/./ # letter
/\letter/  # letter






#------- start and end of line or string


#------- range of characters (or except)

/[a-z]/

/[a-zA-Z]/

/[^abc]/

/[abc]/
