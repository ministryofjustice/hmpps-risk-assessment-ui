#Technical test

As part of the interview we will ask you to complete a short programming exercise as outlined below. You may use the language of your choice.

You may complete this before the interview and be prepared to talk the interviewers through your solution, or do it during the interview as a TDD pair programming exercise. You will be able to ask questions about the task and use the internet to look up anything you need. You are not necessarily required to complete the task - we are more interested in your approach, thought processes and the quality of the code and tests that you write.

#Scrabble Scoring


## Part 1
Write a routine that takes a string of alphabetical characters and returns the basic Scrabble score for them.

Here are the values to use for each letter:
```plain
Letter                           Value
A, E, I, O, U, L, N, R, S, T       1
D, G                               2
B, C, M, P                         3
F, H, V, W, Y                      4
K                                  5
J, X                               8
Q, Z                               10
```

### Example
`calculateScore(‘INTERVIEW’)` should be scored as worth 15 points:

- 1 point for I, twice
- 1 point for N
- 1 point for T
- 1 point for E, twice
- 1 point for R
- 4 points for V
- 4 points for W

And to total:

- `2*1 + 1 + 1 + 2*1 + 1 + 4 + 4`
- = 15


## Part 2

Now extend your function to allow for double and triple scores to be calculated for letters and words. Letter multipliers are calculated first, and word multipliers are applied after the other points are added together.

### Example
`calculateScore(‘INTERVIEW’,’_,_,TL,_,_,DL,_,DW,_’)` would be scored:

- 1 point for I, twice
- 1 point for N
- 1 point for T, with a triple letter multiplier
- 1 point for E, twice
- 1 point for R
- 4 points for V, with a double letter multiplier
- 4 points for W

Plus a double word score.

To total:

- `(2*1 + 1 + 1*3 + 2*1 + 1 + 4*2 + 4) * 2`
- = 42





#Notes for assessors 
(split this out into a separate document)


This test is primarily about aptitude but it's difficult to entirely distinguish
that from ability/knowledge. We're generally looking for someone to:

* Quickly break a problem down into logical steps
* Explain their thought processes as they break that problem down
* Comfortably work as part of a pair
* Happily start with a partial or rough solution and then refine it
* Think about how they're going to verify or test their work
* Use their chosen language effectively, writing idiomatic code

We are not so concerned about their ability with a specific programming language, and
they're welcome to use the language and tools of their choice.

At the end of the exercise, ask how they might improve their solution.

Extension questions that may be asked:

- How would you check for invalid input? (ask about upper/lower case issues, non-alphabetical characters, non-matching lengths of inputs for the word and the double/triple letter structure if they’ve copied the example directly)

- How would you represent a scrabble board and the current game state in a data structure?

- (other questions required!)

