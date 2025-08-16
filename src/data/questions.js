// Mock question bank with categories & difficulty
const QUESTIONS = [
  // GENERAL - EASY
  {
    category: 'general', difficulty: 'easy',
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris'
  },
  {
    category: 'general', difficulty: 'easy',
    question: 'Which animal is known as “the King of the Jungle”?',
    options: ['Tiger', 'Lion', 'Elephant', 'Gorilla'],
    answer: 'Lion'
  },
  {
    category: 'general', difficulty: 'easy',
    question: 'How many continents are there on Earth?',
    options: ['5', '6', '7', '8'],
    answer: '7'
  },

  // GENERAL - MEDIUM
  {
    category: 'general', difficulty: 'medium',
    question: 'Which country hosted the first modern Olympic Games in 1896?',
    options: ['France', 'Greece', 'UK', 'USA'],
    answer: 'Greece'
  },
  {
    category: 'general', difficulty: 'medium',
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'],
    answer: 'Da Vinci'
  },

  // SCIENCE - EASY
  {
    category: 'science', difficulty: 'easy',
    question: 'Water boils at what temperature at sea level?',
    options: ['90°C', '100°C', '110°C', '120°C'],
    answer: '100°C'
  },
  {
    category: 'science', difficulty: 'easy',
    question: 'H2O is the chemical formula for what?',
    options: ['Oxygen', 'Hydrogen', 'Water', 'Helium'],
    answer: 'Water'
  },

  // SCIENCE - MEDIUM
  {
    category: 'science', difficulty: 'medium',
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars'
  },
  {
    category: 'science', difficulty: 'medium',
    question: 'What gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    answer: 'Carbon Dioxide'
  },

  // TECH - EASY
  {
    category: 'tech', difficulty: 'easy',
    question: 'HTML stands for?',
    options: [
      'Hyper Trainer Marking Language',
      'Hyper Text Markup Language',
      'Hyper Text Marketing Language',
      'High Text Markup Language'
    ],
    answer: 'Hyper Text Markup Language'
  },
  {
    category: 'tech', difficulty: 'easy',
    question: 'Which one is a JavaScript framework/library?',
    options: ['Laravel', 'Django', 'React', 'Rails'],
    answer: 'React'
  },

  // TECH - HARD
  {
    category: 'tech', difficulty: 'hard',
    question: 'What is the time complexity of binary search on a sorted array?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    answer: 'O(log n)'
  },
  {
    category: 'tech', difficulty: 'hard',
    question: 'In Git, which command creates a new branch and switches to it?',
    options: ['git checkout -b', 'git branch -m', 'git switch -c', 'git create -b'],
    answer: 'git checkout -b'
  }
]

export default QUESTIONS
