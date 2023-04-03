import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { $axios } from '../utils/api'
import { Question, GetQuestion, GetNextQuestion } from '~/src/shared/question'


@Module({
  name: 'question',
  stateFactory: true,
  namespaced: true,
})
export default class QuestionModule extends VuexModule {
  item: Question = {
    _id: String(),
    question: String(),
    passage: String(),
    choices: {
      a: String(),
      b: String(),
      c: String(),
      d: String(),
    }, 
    answer: String(),
    topic: String(),
    difficulty: Number(),
    length: Number(),
    sentences: Array(),
    createdAt: String(),
    updatedAt: String(),
  }

  @MutationAction
  async get({id, Authorization}: GetQuestion): Promise<{ item: Question }> {
    // const item: Question = await $axios.$get(`/questions/${id}`, {
    //     headers: { 'Authorization': `Bearer ${Authorization}` }
    // })
    const item: Question = {
        _id: "64254b4c6ffe80a6f86851a0",
        question: "According to the passage, all of the following statements are true of Prohibition EXCEPT",
        passage: "It was during the same climate of liberal progress that Prohibition—the banning of the sale of alcohol—was implemented in the United States. Prohibitionists, people who advocated for Prohibition, favored the ban as a way to reduce alcohol-related crime. For example, women's groups sought to protect women and children from domestic abuse. Other Prohibitionists were opposed to the political corruption that was linked to saloons and pubs. However, the result of putting Prohibition into effect was not what Prohibitionists had expected. Instead, crime rates soared as the illegal consumption of alcohol rose. Criminal gangs took over the sale of alcohol from legitimate businesses and created a black market for the distribution of alcoholic beverages. They opened underground pubs, known as \"speakeasies,\" where people openly drank alcoholic beverages, and gang members bribed police with lucrative payments in order to keep the doors open. Gangsters were not the only people to cash in on the ban on legal sales of alcohol, however. Doctors and pharmacists of the Prohibition era made extra cash by writing prescriptions for \"medicinal alcohol,\" which was nothing more than ordinary whiskey, liquor, or wine.",
        choices: {
          a: "Different kinds of alcohol were sold as medicine.",
          b: "Illegal distribution of alcohol became a new method for gangsters to earn money.",
          c: "Prohibition helped to reduce alcohol-related crimes in the United States.",
          d: "Prohibitionists supported it in the hope that it would decrease alcohol-related crime."
        },
        answer: "c",
        topic: "natural sciences",
        difficulty: 3,
        length: 10,
        sentences: [
          "It was during the same climate of liberal progress that Prohibition—the banning of the sale of alcohol—was implemented in the United States."
        ],
        createdAt: "2023-03-30T05:12:10.421+00:00",
        updatedAt: "2023-03-30T05:12:10.421+00:00"
    }

    return { item }
  }

  @MutationAction
  async getNext({onlyUnsolved, Authorization}: GetNextQuestion) {
    // const item: Question = await $axios.$post(`/users/next-question?onlyUnsolved=${onlyUnsolved}`, {
    //   headers: { 'Authorization': `Bearer ${Authorization}` }
    // })

    const item: Question = {
      _id: "64254b4c6ffe80a6f86851a0",
      question: "According to the passage, all of the following statements are true of Prohibition EXCEPT",
      passage: "It was during the same climate of liberal progress that Prohibition—the banning of the sale of alcohol—was implemented in the United States. Prohibitionists, people who advocated for Prohibition, favored the ban as a way to reduce alcohol-related crime. For example, women's groups sought to protect women and children from domestic abuse. Other Prohibitionists were opposed to the political corruption that was linked to saloons and pubs. However, the result of putting Prohibition into effect was not what Prohibitionists had expected. Instead, crime rates soared as the illegal consumption of alcohol rose. Criminal gangs took over the sale of alcohol from legitimate businesses and created a black market for the distribution of alcoholic beverages. They opened underground pubs, known as \"speakeasies,\" where people openly drank alcoholic beverages, and gang members bribed police with lucrative payments in order to keep the doors open. Gangsters were not the only people to cash in on the ban on legal sales of alcohol, however. Doctors and pharmacists of the Prohibition era made extra cash by writing prescriptions for \"medicinal alcohol,\" which was nothing more than ordinary whiskey, liquor, or wine.",
      choices: {
        a: "Different kinds of alcohol were sold as medicine.",
        b: "Illegal distribution of alcohol became a new method for gangsters to earn money.",
        c: "Prohibition helped to reduce alcohol-related crimes in the United States.",
        d: "Prohibitionists supported it in the hope that it would decrease alcohol-related crime."
      },
      answer: "c",
      topic: "natural sciences",
      difficulty: 3,
      length: 10,
      sentences: [
        "It was during the same climate of liberal progress that Prohibition—the banning of the sale of alcohol—was implemented in the United States."
      ],
      createdAt: "2023-03-30T05:12:10.421+00:00",
      updatedAt: "2023-03-30T05:12:10.421+00:00"
    }

    return { item }
  }
}