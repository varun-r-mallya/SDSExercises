# Franz writeup Git assignment

Exercises: <a href="https://gitexercises.fracz.com">Exercises</a></br>
Actually useful: <a href="https://ohshitgit.com/">OhShitGit</a></br>
Email used: varun_rm@me.iitr.ac.in</br>
Name: varunrmallya</br>

## level 1
<code>git start</code></br>
<code>git verify</code></br>
These commands initiate the process and start the exercise.</br>

## level 2
We add only one file</br>
<code>git add A.txt;</code></br> 
<code>git commit -m "First exercise"</code></br>
Only one file gets comitted.</br>

## level 3
<code>git reset</code></br>
this resets the staging area</br>
<code>git add A.txt</code></br>
adds only A.txt</br>
<code>git commit -m "comment"</code></br>
commits the only staged file</br>

## level 4
<code>
cat >> .gitignore
*.exe
*.o
*.jar
libraries/
</code></br>
to create a .gitignore file</br>

Then we add it and commit it using the same commands as above.</br>

## level 5
<code>git branch</code></br>
To check which branchs exist</br>
<code>git merge escaped</code></br>
To merge the escaped branch to the chase-branch</br>

## level 6
<code>git merge another-piece-of-work</code></br>
to start the branch merge</br>
Output:</br>
<pre>
Auto-merging equation.txt
CONFLICT (content): Merge conflict in equation.txt
Automatic merge failed; fix conflicts and then commit the result.
</pre></br>
We get a merge conflict.</br>
Then, we run</br>
<code>nvim equation.txt</code></br>
and resolve the merge conflict by removing the not required lines of code.</br>
Then we add and commit </br>
<code>git add equation.txt</code></br>
<code>git commit -m "comment"</code></br>

## level 7
<code>git start save-your-work</code></br>
To start the exercise</br>
<code>git stash</code></br>
to keep all the current changes on the side and work on the immediate urgent bug fixes</br>
<code>nvim bug.txt</code></br>
to edit the bug away</br>
add all uncommited files and commit</br>
<code>git stash pop</code></br>
to get back the old changes that we made</br>
Finish the project by adding in the required line</br>
Add the required files and commit </br>

## level 8
Rebasing in git means changing the branch of a part of the code to maintain a linear history</br>
This makes it look like the changes were made on the required branch directly even though they weren't.</br>
<code>git rebase hot-bugfix</code></br>
this basically rewrites the history of that branch and should not be done on a public repo after pushing changes</br>
For future reference: <a href="https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase#:~:text=From%20a%20content%20perspective%2C%20rebasing,them%20to%20the%20specified%20base.">REBASE</a></br>

The following can also be done:</br>

<code>git checkout hot-bugfix</code></br>
<code>git cherry-pick change-branch-history</code></br>

For future reference: <a href="https://www.atlassian.com/git/tutorials/cherry-pick">CHERRY PICK</a></br>


## level 9
This one is a little complex to explain.</br>
So...</br>
<code>git rm --cached ignored.txt</code></br>
will successfully remove the tracking of that file.</br>
It will also not delete that file from your local repo but it will be untracked. To anyone downloading from the remote repo, this file will never esxist and will be truly gone.</br>
If we do</br>
<code>git rm ignored.txt</code></br>
Instead, that file is removed from the local repo too. </br>
Then add the rest of the files and commit and verify.</br>
Note: add that file in the .gitignore file before doing this.</br>

## level 10
instead of directly using mv to change the file name, do the same thing right after telling git what you are going to do using:</br>
<code>git mv File.txt file.txt</code></br>
Then, add and commit the file and verify.</br>

## level 11
With</br>
<code>git log --graph</code></br>
we check what the current commit is and go on to modify it.</br>
<code>git add file.txt; git commit --amend</code></br>
and reenter the message.</br>
<code>git log --graph</code></br>
again to check if there is only one commit left after this.</br>

Note: </br>
<pre>
When you want to change the last commit (the one that is pointed by HEAD), use
`git commit --amend`
If you want to change only commited files but no edit message, use
`git commit --amend --no-edit`
Moreover, you can skip git add command and update last commit with all current changes in working area:
`git commit --amend --no-edit -a`
</pre>
</br>

## level 12
To change the commit date, use the flags given to <code>commit --amend</code>:</br>
<code>git commit --amend --date 1987</code></br>
Then verify</br>

# level 13
This was particularly difficult and I do not undderstand this completely yet</br>
started with reabse on the second commit from the HEAD in interactive mode</br>
<code>git rebase -i HEAD~2</code></br>
Then edit the file as usual.</br>
Add the file using </br>
<code>git add file.txt</code></br>
and then, continue the rebase</br>
<code>git rebase --continue</code></br>
Output:</br>
<pre>
[detached HEAD d170a9a] Add Hello world
 Date: Tue Mar 12 22:26:05 2024 +0530
 1 file changed, 1 insertion(+)
 create mode 100644 file.txt
Auto-merging file.txt
CONFLICT (content): Merge conflict in file.txt
error: could not apply e3256a1... Further work on Hello world
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
Could not apply e3256a1... Further work on Hello world
</pre>
</br>
This rebase caused a merge conflict.</br>
Solve the merge conflict by editing the file.</br>
Then, add back the file and continue the rebase using:</br>
<code>git add file.txt</code></br>
<code>git rebase --continue</code></br>
This ends the exercise with a successful commit fix in the past.</br>



