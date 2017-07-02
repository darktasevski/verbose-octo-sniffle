#!c:\lang\perl\bin\perl.exe
use strict;
use warnings;
use MIME::Base64;
use Fcntl qw(:DEFAULT :flock);

my $input  = "./horse.wav";
my $output = "./horse.txt";

open(OUTPUT, ">$output");
flock (OUTPUT, LOCK_EX);

# uncomment if decoding input
binmode(OUTPUT);

open(INPUT, "$input");
flock (INPUT, LOCK_SH);

# uncomment if encoding input
# binmode(INPUT);

while (read(INPUT, my $buf, 60*57))
{
	print OUTPUT encode_base64($buf);
}

close(INPUT);
close(OUTPUT);

print "Done\n\n";
