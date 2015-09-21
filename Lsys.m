bemid = 'FFFFFFFFFFFF';
bran1 = 'FFFFF';
bran2 = 'FFFFFFFF';
branc1 = ['FFFFFFM[++' bran2 'E]' bran1 'M[--' bran2 'E]'];
branc2 = ['FFFFFFM[--' bran2 'E]' bran1 'M[++' bran2 'E]'];
branch1 = ['GFFFF'];
branch2 = ['GFFFF'];
month = 12;
for i = 1: month / 2
    branch1 = [branch1 branc1];
    branch2 = [branch2 branc2];
end
branch1 = [branch1 bran2 'G'];
branch2 = [branch2 bran2 'G'];
axiom = ['G' bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid '[++' branch1   ']' bemid '[--' branch2   ']'...
    bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid '[++' branch1   ']'...
    bemid '[--' branch2   ']' bemid '[++' branch1   ']' bemid '[--' branch2   ']' bemid 'G'];