export const quiz = {
  quizTitle: "Fundamental aspects of exploratory data analysis",
  quizSynopsis:
    "The main objective of this chapter is to revise the fundamentals of EDA, what it is, key concepts of profiling and quality assessment main dimensions of EDA, main challenges and opportunities in EDA.",
  questions: [
    {
      question: "Which task is not _performed_ in data cleaning stage?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "duplicates check",
        "error check",
        "transform data",
        "missing value check"
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "During data cleaning stage we check for duplicates, missing values and error check. During transformation stage, we transform the data.",
      point: "10"
    },
    {
      question: "Which of the following is true?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Data = Model + Error",
        "Model = Data + Error",
        "Model = Data + Error",
        "Data = Model - Error",
        "None"
      ],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation: "`Data = Model + Error` is the correct answer.",
      point: "10"
    },
    {
      question: "In the equation below, which statement is true?",
      questionDescription:
        "<pre>price of pens(Total) = price for one pen(UnitPrice) * the number of pens bought (Quantity).</pre>",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Total prices is dependent variable.",
        "Unit price is independent variable.",
        "In general, a model like above always represents the relationship between dependent and independent variable",
        "All of the above."
      ],
      correctAnswer: "4",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "All of the above statements are True. If you are confused refer to the first chapter in the book.",
      point: "10"
    },
    {
      question: "Which of the following data is numerical types?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: [
        "A person's age",
        "Height of a person",
        "Gender",
        "Heart rate",
        "Country names."
      ],
      correctAnswer: [1, 2, 4],
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "For example, a person's age, height, weight, blood pressure, heart rate, temperature, number of teeth, number of bones, number of family members, etc. These data often referred to as quantitative data in statistics.",
      point: "10"
    },
    {
      question:
        "Which of the following statements are *FALSE* about categorical dataset?",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "Gender is a categorical data.",
        "Blood type (A, B, AB, O) is a categorical data.",
        "The binary categorical variable can take exactly two values and are also referred to as a dichotomous variable.",
        "Most of the categorical dataset follows either nominal or ordinal measurement scales.",
        "None of the above"
      ],
      correctAnswer: "5",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "All of the above statements are correct. Check categorical data section in the book.",
      point: "10"
    },
    {
      question: "What are different types of the measurement scales?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: ["Nominal", "Ordinal", "Interval", "Ratio", "Numerical"],
      correctAnswer: [1, 2, 3, 4],
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "There are four different types of measurement scales described in statistics: nominal, ordinal, interval, and ratio.",
      point: "10"
    },
    {
      question:
        "Which of the following are NOT *Python* libraries used in data science?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Pandas", "SciPy", "Sckit-Learn", "Matplotlib", "React JS"],
      correctAnswer: "5",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation: "React JS is a JavaScript Framework.",
      point: "10"
    },
    {
      question: "What is the output of the following code?",
      questionDescription:
        "<pre>my1DArray = np.array([1, 8, 27, 64]) \n print(my2DArray.shape)</pre>",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["4", "(4,)", "4,", "(4,1)"],
      correctAnswer: "2",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "Checkout the basics of Numpy. The shape is always returned as tuple even though it is single dimension.",
      point: "10"
    },
    {
      question:
        "What are the two types of data structures explained in the book?",
      questionType: "text",
      answerSelectionType: "multiple",
      answers: ["Series", "DataFrame", "LinkedList", "Set"],
      correctAnswer: [1, 2],
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "In Pandas, we can create data structures using two ways: Series and DataFrame. Check the snippet below in order to understand how we can create both Series and dataframe.",
      point: "10"
    },
    {
      question:
        "Which libraries is the most commonly used for graphical representations?",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["Pandas", "SciPy", "Sckit-Learn", "Matplotlib", "React JS"],
      correctAnswer: "4",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation:
        "In Pandas, we can create data structures using two ways: Series and DataFrame. Check the snippet below in order to understand how we can create both Series and dataframe.",
      point: "10"
    }
  ]
};
