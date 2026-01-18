# Open Trivia Database Quiz App

## Overview

The **Trivia Quiz App** is a dynamic, interactive quiz platform built with **React**. Users can select a category and difficulty, answer multiple-choice questions, and view their results at the end. The app demonstrates proficiency with modern React features, including **hooks**, **useReducer for state management**, **contextual state lifting**,and **API integration**.

---

## Features

- **Dynamic Questions**: Fetches questions from the [Open Trivia Database API](https://opentdb.com/) based on selected category and difficulty.
- **Multiple Categories & Difficulty Levels**: Users can select from a wide range of trivia categories and difficulty settings.
- **Answer Tracking**: Tracks user selections and calculates the final score.
- **Responsive UI**: Built with a clean and responsive design for desktop and mobile devices.
- **Smooth UX**: Includes loading indicators, error handling, and scroll-to-top behavior for better user experience.
- **State Management**: Uses `useReducer` to manage quiz flow, questions, answers, and errors.
- **Persistent Input Data**: Saves the user’s name, selected category, and difficulty to `localStorage` for session persistence.

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/putman44/Open-Trivia-Database-Quiz-App
cd Open-Trivia-Database-Quiz-App
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Run the app locally:**

```bash
npm run dev
# or
yarn dev
```

## The app will open in your browser at [http://localhost:5173](http://localhost:5173).

## Usage

1. Enter your **name** in the input field.
2. Select a **category** and **difficulty**.
3. Click **Start Quiz** to fetch questions and begin the quiz.
4. Select an answer for each question and submit when finished.
5. View your **score** and review correct vs. incorrect answers.
6. Optionally, click **Restart** to start a new quiz.

---

## Technologies Used

- **React** (Functional Components, Hooks, useReducer)
- **JavaScript (ES6+)**
- **CSS Modules** for component-level styling
- **Open Trivia Database API**
- **LocalStorage** for persistent input data
- **Responsive design** for mobile and desktop

---

## Key Learnings / Portfolio Highlights

- Implemented **state management with `useReducer`** for complex state flows.
- Integrated **third-party API** for dynamic content.
- Created a **modular, component-based architecture** (Form, QuestionForm, Results, LoadingSpinner).
- Applied **user-friendly UX patterns**, including loading indicators and error handling.
- Demonstrated **data persistence** using `localStorage`.
- Used **React best practices**, such as lifting state, clean separation of concerns, and declarative rendering.

---
