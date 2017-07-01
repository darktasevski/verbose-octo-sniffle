
http://perldoc.perl.org/perlpod.html

Pod is a simple-to-use markup language used for writing documentation for Perl, Perl programs, and Perl modules. Pod markup consists of three basic kinds of paragraphs: ordinary, verbatim, and command.

## Ordinary Paragraphs ##

Most paragraphs in your documentation will be ordinary blocks of text, like this one. You can simply type in your text without any markup whatsoever, and with just a blank line before and after. When it gets formatted, it will undergo minimal formatting, like being rewrapped, probably put into a proportionally spaced font, and maybe even justified.

You can use formatting codes in ordinary paragraphs, for bold, italic, code-style , hyperlinks, and more. Such codes are explained in the "Formatting Codes" section, below.

## Verbatim Paragraph ##

Verbatim paragraphs are usually used for presenting a codeblock or other text which does not require any special parsing or formatting, and which shouldn't be wrapped.

A verbatim paragraph is distinguished by having its first character be a space or a tab. (And commonly, all its lines begin with spaces and/or tabs.) It should be reproduced exactly, with tabs assumed to be on 8-column boundaries. There are no special formatting codes, so you can't italicize or anything like that. A \ means \, and nothing else.

## Command Paragraphs ##

All command paragraphs start with = (equals sign).

### Beginning and Ending ###

Perl pod blocks should begin with `=pod` and end with `=cut`, signifying to Pod parser that the pod block has begun and ended. These command paragraphs only signal the beginning and end of a pod block.

### Headings ###

To create headings 1 through 4, begin your command paragraph with `=headN`, where N is the number of the heading 1 through 4. For example, to make a first-order heading (the largest possible,) write `=head1`, then on the next line begin your paragraph that you want under the heading.

### Other Formats ###

Pod also allows blocks in other formats, such as HTML or plain text. To create one of these blocks, use the `=format SYNTAX` command paragraph, where `SYNTAX` is the syntax of the block (e.g. `html` or `txt`). At the end of your block, use the `=end SYNTAX` block.

### Encoding ###

If you are having encoding troubles, use the `=encoding ENC_TYPE` command, where `ENC_TYPE` is the encoding type (e.g. `utf8`, `koi8-r`). This will affect the entire document, not just the block below the command.


## Formatting ##

### Text ###

Formatting text as **bold**, *italic* or `code` works in the `S<word>` syntax, where `S` is an abbreviation for the type of text you are trying to create. For example, `B<my bold text>` becomes **my bold text**, `I<italic text>` becomes *italic text* and `C<code here()>` becomes `code here()`. You can also underline using `U<underlined text here>`. And, of course, these elements can be nested.

F, S, X and Z?

### Hyperlinks ###

Writing hyperlinks in pod is much like formatting text, using the same `S<>` syntax. Use `L` to begin a hyperlink.

Pod allows you to hyperlink to a `man` page, a Perl documentation page, or another web page. To link to a man or Perl documentation page, simply include the page name in the link (e.g. `L<perl(1)>` or `L<Net::Ping>`). If you want to link to a web page, separate the URL and the link text with a pipe (e.g. to link to github.com, write `L<GitHub|http://github.com/>`).

### Entities ###

If you ever need to include a > character within a formatting code, you have two options. If you want to render $foo->bar in a code font, this is what you can do:

- C<$foo-E<gt>bar>
- C<< $foo->bar >> (inner whitespace is required!)
- C<<< $foo->bar >>> (inner whitespace is required!)

E can be used for entities. These are like HTML entities, with the addition of:

- verbar for a vertical bar
- sol for a slash (solidus)

### Code Blocks ###

Indented paragraphs will render as code. This is called a verbatim paragraph.

### Lists ###

=over x-indent-level
=item
=item
=back


## Sections ##

NAME contains the module or script name, a dash and a short description.
SYNOPSIS means "see together" and shows example usage.
DESCRIPTION contains a long description of what the module does and lists functions.
BUGS or CAVEATS tells about bugs or issues the user should know about.
ACKNOWLEDGEMENTS is where you thank bug fixers, testers and your parents.
COPYRIGHT or LICENSE mentions copyright restrictions. Don't put the entire GPL there, though :)
AVAILABILITY says where newer versions can be pulled from.
AUTHOR explains who made it, if COPYRIGHT didn't already do so.
SEE ALSO refers to additional documentation

Functions, methods and things like that are usually explained in a =head2 within DESCRIPTION.

Document what arguments a function takes and what the function returns as well as any preconditions. It's worth mention under what conditions your function might return undef (errors, etc.).

The easiest licencing is :

This library is free software; you may redistribute it and/or modify it under the same terms as Perl itself.