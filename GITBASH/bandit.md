# Bandit Wargames writeup

## level 0
<code>ssh bandit0@bandit.labs.overthewire.org -p 2220 </code>
bandit0 is the password
<code>cat readme</code>
Make a directory "sdstesters" in /tmp
<b>Flag: NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL</b>

## level 1
<code>ssh bandit1@bandit.labs.overthewire.org -p 2220</code>
Previous flag is the password
Enter the password.
Since '-' is a file with a special character, we use <code>cat ./-</code>
<b>Flag: rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi</b>

## level 2
For spaces in the filename, use:
<code>cat "spaces in this filename"</code>
<b>Flag: aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG</b>

## level 3
to access hidden files, use either:
<code>la</code>
or
<code>ls -a</code>
after cding to inhere directory
Then, 
<code>cat ".hidden"</code>
<b>Flag: 2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe</b>

## level 4
reset command to unmess the terminal
then, use a for loop to open all files and find the only human readable flag
<code>for i in 0 1 2 3 4 5 6 7 8 9
do
cat ./-file0\$i
done</code>
Output:
<code>QRrtZ�i�	�H
                  |��ȧ����^��7L3��Y�ͯ	Ŵ����E�Y�ܚ	�V&��h�F���y���O̫��`�\�-⃐�Hx��2��K��i�x�#e�>��VO��p{�	���MUb4����gQ��eE}:�g���j8������<.�e��S��e 0�����]7�������b�<�~G=1��������B׃�"
                                                                                                                                                                                              ���W��9ؽ5lrIWWI6bB37kxfiCQZqUdOIYfr6eEeqR
���K�~�+��9"T���*Z$���"�r�
�Z�\�������ж�q���7����/�n��n</code>
<b>Flag: lrIWWI6bB37kxfiCQZqUdOIYfr6eEeqR</b>

## level 5
we use the find command with only size flag
<code>find ~/inhere -size 1033c</code>
'c' here means byte
Output: /home/bandit5/inhere/maybehere07/.file2
Then,
<code>cat /home/bandit5/inhere/maybehere07/.file2</code>
<b>Flag: P4L4vucdmLnm8I7Vl7jG1ApGSfjYKqJU</b>

## level 6
<code>find / -user bandit7 -group bandit6 -size 33c</code>
found in /var/lib/dpkg/info
cd to directory
<code>cat bandit7.password</code>
<b>Flag: z7WtoNQU2XfjmMtWA8u5rN4vzqu4v99S</b>

## level 7
<code>grep -i "millionth" data.txt</code>
Output: millionth	TESKZC0XvTetK0S9xNwm25STk5iWrBvP
<b>Flag: TESKZC0XvTetK0S9xNwm25STk5iWrBvP</b>

## level 8
Note: first trying only uniq command without sorting is not gonna work becauseit cannot cheeck for duplicate lines in different places
We first sort all the data in the file and pipe it to the uniq command with a -u argument for a unique line
<code>sort data.txt | uniq -u</code>
<b>Flag: EN632PlfYiZbn3PhVK3XOGSlNInNE00t</b>

## level 9
Use, 
<code>strings data.txt | grep \"\=\=\=\=\=\=\=\=\"</code>
Output:
<pre>
x\]T========== theG\)"
========== passwordk^
========== is
========== G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s
</pre>
<b>Flag: G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s</b>

## level 10
The = sign in the end of the data.txt file tells us that it is base64 encoded
we simply use the decoder
<code>base64 -d data.txt</code>
Output: The password is 6zPeziLdR2RKNdNYFNb6nVCKzphlXHBM
<b>Flag: 6zPeziLdR2RKNdNYFNb6nVCKzphlXHBM</b>

## level 11
We do
<code>cat data.txt</code>
Copy the text and decode it on an internet rot13 decoder
<a href="https://rot13.com">ROT13</a>
Output: The password is JVNBBFSmZwKKOP0XbFXOoW8chDz5yVRv
<b>Flag: JVNBBFSmZwKKOP0XbFXOoW8chDz5yVRv</b>

## level 12
copy data.txt from directory to temporary using
<code>cp data.txt tmp/sdstesters</code>
Then, convert back the hex dump and pipe into cat
<code>xxd -r data.txt | cat data.compressed</code>
Then check for compression algorithm using 
file data.compressed
rename using mv,
<code>mv data.gz</code>
after finding out that the file is a gzip compressed file
<code>{compression algorithm name} -d {filename}</code>
Repeatedly do this to get the final file
We come acaross bzip2, gunzip and tar while doing this.
Same procedure applies to all
for tar files,
<code>tar -xvf "filename"</code>
Finally, data8 is the 8th iteration
<pre>
The password is wbWdlBxEir4CaE8LaPhauuOo6pwRmrDw
</pre>
<b>Flag: wbWdlBxEir4CaE8LaPhauuOo6pwRmrDw</b>

## level 13
Run,
<code>cat sshkey.private</code>
Then, 
<pre>
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAxkkOE83W2cOT7IWhFc9aPaaQmQDdgzuXCv+ppZHa++buSkN+
gg0tcr7Fw8NLGa5+Uzec2rEg0WmeevB13AIoYp0MZyETq46t+jk9puNwZwIt9XgB
ZufGtZEwWbFWw/vVLNwOXBe4UWStGRWzgPpEeSv5Tb1VjLZIBdGphTIK22Amz6Zb
ThMsiMnyJafEwJ/T8PQO3myS91vUHEuoOMAzoUID4kN0MEZ3+XahyK0HJVq68KsV
ObefXG1vvA3GAJ29kxJaqvRfgYnqZryWN7w3CHjNU4c/2Jkp+n8L0SnxaNA+WYA7
jiPyTF0is8uzMlYQ4l1Lzh/8/MpvhCQF8r22dwIDAQABAoIBAQC6dWBjhyEOzjeA
J3j/RWmap9M5zfJ/wb2bfidNpwbB8rsJ4sZIDZQ7XuIh4LfygoAQSS+bBw3RXvzE
pvJt3SmU8hIDuLsCjL1VnBY5pY7Bju8g8aR/3FyjyNAqx/TLfzlLYfOu7i9Jet67
xAh0tONG/u8FB5I3LAI2Vp6OviwvdWeC4nOxCthldpuPKNLA8rmMMVRTKQ+7T2VS
nXmwYckKUcUgzoVSpiNZaS0zUDypdpy2+tRH3MQa5kqN1YKjvF8RC47woOYCktsD
o3FFpGNFec9Taa3Msy+DfQQhHKZFKIL3bJDONtmrVvtYK40/yeU4aZ/HA2DQzwhe
ol1AfiEhAoGBAOnVjosBkm7sblK+n4IEwPxs8sOmhPnTDUy5WGrpSCrXOmsVIBUf
laL3ZGLx3xCIwtCnEucB9DvN2HZkupc/h6hTKUYLqXuyLD8njTrbRhLgbC9QrKrS
M1F2fSTxVqPtZDlDMwjNR04xHA/fKh8bXXyTMqOHNJTHHNhbh3McdURjAoGBANkU
1hqfnw7+aXncJ9bjysr1ZWbqOE5Nd8AFgfwaKuGTTVX2NsUQnCMWdOp+wFak40JH
PKWkJNdBG+ex0H9JNQsTK3X5PBMAS8AfX0GrKeuwKWA6erytVTqjOfLYcdp5+z9s
8DtVCxDuVsM+i4X8UqIGOlvGbtKEVokHPFXP1q/dAoGAcHg5YX7WEehCgCYTzpO+
xysX8ScM2qS6xuZ3MqUWAxUWkh7NGZvhe0sGy9iOdANzwKw7mUUFViaCMR/t54W1
GC83sOs3D7n5Mj8x3NdO8xFit7dT9a245TvaoYQ7KgmqpSg/ScKCw4c3eiLava+J
3btnJeSIU+8ZXq9XjPRpKwUCgYA7z6LiOQKxNeXH3qHXcnHok855maUj5fJNpPbY
iDkyZ8ySF8GlcFsky8Yw6fWCqfG3zDrohJ5l9JmEsBh7SadkwsZhvecQcS9t4vby
9/8X4jS0P8ibfcKS4nBP+dT81kkkg5Z5MohXBORA7VWx+ACohcDEkprsQ+w32xeD
qT1EvQKBgQDKm8ws2ByvSUVs9GjTilCajFqLJ0eVYzRPaY6f++Gv/UVfAPV4c+S0
kAWpXbv5tbkkzbS0eaLPTKgLzavXtQoTtKwrjpolHKIHUz6Wu+n4abfAIRFubOdN
/+aLoRQ0yBDRbdXMsZN/jvY44eM+xRLdRVyMmdPtP8belRi2E2aEzA==
-----END RSA PRIVATE KEY-----
</pre>
Add this private key into a file called sshkey.private
Then, change permissions for only owner read and write access using
<code>chmod 600 sshkey.private</code>
6-0-0 signifies 110-000-000 ie. rw-------
This is required as servers do not accept compromised ssh keys with bad file permissions
Then, log into the server using 
<code>ssh -i /path/to/sshkey.private bandit14@bandit.overthewire.org -p 2220</code>

Here, we run (within bandit14)
<code>cat /etc/bandit_pass/bandit14</code>
<b>Flag: fGrHPx402xGC7U7rXKDaxiWFTOiF0ENq</b>

## level 14
Here, we run netcat to submit our flag to port 30000 on localhost using
<code>nc -N localhost 30000</code>
Output:
<pre>
fGrHPx402xGC7U7rXKDaxiWFTOiF0ENq
Correct!
jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt
</pre>

<b>Flag: jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt</b>

## level 15
We first try to connect to localhost at 30001 using openssl
<code>openssl s_client -connect localhost:30001</code>
s_client is a minimal client that can send and receive data using SSL/TLS
Then, we paste the previous flag in the given prompt:
Output:
jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt
Correct!
JQttfApK4SeyHwDlI9SXGR50qclOAil1

References: <a href="https://www.openssl.org/docs/man1.0.2/man1/openssl-s_client.html">OpenSSL</a>

<b>Flag: JQttfApK4SeyHwDlI9SXGR50qclOAil1</b>

## level 16

We use 
<code>nc -zv localhost 31000-32000</code>
to scan the ports asked in the problem statement
Then, we note down the port numbers that are open:
- 31046
- 31518
- 31691
- 31790
- 31960
Since there are so little ports, we can brute force each of them by submitting our flag and trying to get the new one.
This can be done by 
<code>openssl s_client -connect localhost:portnumber</code>
and pasting our flag into this each time
Port 31790 spoke SSL and the following output was obtained:
<pre>
JQttfApK4SeyHwDlI9SXGR50qclOAil1
Correct!
</pre>
<pre>
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAvmOkuifmMg6HL2YPIOjon6iWfbp7c3jx34YkYWqUH57SUdyJ
imZzeyGC0gtZPGujUSxiJSWI/oTqexh+cAMTSMlOJf7+BrJObArnxd9Y7YT2bRPQ
Ja6Lzb558YW3FZl87ORiO+rW4LCDCNd2lUvLE/GL2GWyuKN0K5iCd5TbtJzEkQTu
DSt2mcNn4rhAL+JFr56o4T6z8WWAW18BR6yGrMq7Q/kALHYW3OekePQAzL0VUYbW
JGTi65CxbCnzc/w4+mqQyvmzpWtMAzJTzAzQxNbkR2MBGySxDLrjg0LWN6sK7wNX
x0YVztz/zbIkPjfkU1jHS+9EbVNj+D1XFOJuaQIDAQABAoIBABagpxpM1aoLWfvD
KHcj10nqcoBc4oE11aFYQwik7xfW+24pRNuDE6SFthOar69jp5RlLwD1NhPx3iBl
J9nOM8OJ0VToum43UOS8YxF8WwhXriYGnc1sskbwpXOUDc9uX4+UESzH22P29ovd
d8WErY0gPxun8pbJLmxkAtWNhpMvfe0050vk9TL5wqbu9AlbssgTcCXkMQnPw9nC
YNN6DDP2lbcBrvgT9YCNL6C+ZKufD52yOQ9qOkwFTEQpjtF4uNtJom+asvlpmS8A
vLY9r60wYSvmZhNqBUrj7lyCtXMIu1kkd4w7F77k+DjHoAXyxcUp1DGL51sOmama
+TOWWgECgYEA8JtPxP0GRJ+IQkX262jM3dEIkza8ky5moIwUqYdsx0NxHgRRhORT
8c8hAuRBb2G82so8vUHk/fur85OEfc9TncnCY2crpoqsghifKLxrLgtT+qDpfZnx
SatLdt8GfQ85yA7hnWWJ2MxF3NaeSDm75Lsm+tBbAiyc9P2jGRNtMSkCgYEAypHd
HCctNi/FwjulhttFx/rHYKhLidZDFYeiE/v45bN4yFm8x7R/b0iE7KaszX+Exdvt
SghaTdcG0Knyw1bpJVyusavPzpaJMjdJ6tcFhVAbAjm7enCIvGCSx+X3l5SiWg0A
R57hJglezIiVjv3aGwHwvlZvtszK6zV6oXFAu0ECgYAbjo46T4hyP5tJi93V5HDi
Ttiek7xRVxUl+iU7rWkGAXFpMLFteQEsRr7PJ/lemmEY5eTDAFMLy9FL2m9oQWCg
R8VdwSk8r9FGLS+9aKcV5PI/WEKlwgXinB3OhYimtiG2Cg5JCqIZFHxD6MjEGOiu
L8ktHMPvodBwNsSBULpG0QKBgBAplTfC1HOnWiMGOU3KPwYWt0O6CdTkmJOmL8Ni
blh9elyZ9FsGxsgtRBXRsqXuz7wtsQAgLHxbdLq/ZJQ7YfzOKU4ZxEnabvXnvWkU
YOdjHdSOoKvDQNWu6ucyLRAWFuISeXw9a/9p7ftpxm0TSgyvmfLF2MIAEwyzRqaM
77pBAoGAMmjmIJdjp+Ez8duyn3ieo36yrttF5NSsJLAbxFpdlc1gvtGCWW+9Cq0b
dxviW8+TFVEBl1O4f7HVm6EpTscdDxU+bCXWkfjuRb7Dy9GOtt9JPsX8MBTakzh3
vBgsyi/sN3RqRBcGU40fOoZyfAMT8s1m/uYv52O6IgeuZ/ujbjY=
-----END RSA PRIVATE KEY-----
</pre>
closed

To find the next flag, we login to bandit17 using this ssh key
<code>ssh -i ~/path/to/sshkey.private bandit17@bandit.labs.overthewire.org -p 2220</code>

<b>Flag: VwOSWtCA7lRKkTfbr2IDh6awj9RNZM5e</b>

## level 17
We use the diff command to check for differences
<code>diff passwords.new passwords.old</code>
Output:
<pre>
42c42
hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg
p6ggwdNHncnmCNxuAt0KtKVq185ZU7AW
</pre>
We then test these two keys on the next server
Upon testing, the key hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg is the correct one

<b>Flag: hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg</b>

## level 18
We run a command immediately after login and get it's output using the -t flag in ssh 
We can hence do the following:
<code>ssh -t bandit18@bandit.labs.overthewire.org -p 2220 "cat readme"</code>
Output:
<pre>
bandit18@bandit.labs.overthewire.org's password: 
awhqfNnAbc1naukrpqDYcF95h7HoMTrC
Connection to bandit.labs.overthewire.org closed.
</pre>

<b>Flag: awhqfNnAbc1naukrpqDYcF95h7HoMTrC</b>

## level 19
We run the given setuid binary with arguments to print the password of the next level:
<code>./bandit20-do cat /etc/bandit_pass/bandit20</code>

<b>Flag: VxCazJaVykI6W36BkBU0mJTCM8rR95XT</b>

## level 20
We first set up a listening server using netcat in the background using Unix Jobs in the background
This job first listens on port 6969 and when there is a connection, it echos the password of the previous level
This is done using:
<code>echo "VxCazJaVykI6W36BkBU0mJTCM8rR95XT" | nc -l 6969&</code>
The & on the end tells the shell that it is a background process
After this, we do 
<code>./* 6969</code>
to send the request and check password in theV binary
Output:
<pre>
Read: VxCazJaVykI6W36BkBU0mJTCM8rR95XT
Password matches, sending next password
NvEJF7oVjkddltPSrdKEFOllh9V1IBcq
</pre>

<b>Flag: NvEJF7oVjkddltPSrdKEFOllh9V1IBcq</b>