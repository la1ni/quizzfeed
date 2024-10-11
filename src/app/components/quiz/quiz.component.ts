import { Component } from '@angular/core';
import quiz_questions from 'src/assets/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  titulo: string = ""

  questions: any
  selectedQuestion: any

  answerSelected: string = ""
  answers: string[] = []

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = true

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false
      this.titulo = quiz_questions.title
      this.questions = quiz_questions.questions;
      this.selectedQuestion = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
      console.log(this.questionMaxIndex)
    }
  }
  playerChoice(value: string) {
    this.answers.push(value)
    console.log(this.answers)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.selectedQuestion = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions.results[finalAnswer as keyof typeof quiz_questions.results]

    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    })
    return result;
  }
}


