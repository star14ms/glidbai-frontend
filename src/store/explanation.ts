import { Module, VuexModule, MutationAction } from 'vuex-module-decorators'
import { $axios } from '../utils/api'
import { Explanation, GetExplanation } from '~/src/shared/explanation'


@Module({
  name: 'explanation',
  stateFactory: true,
  namespaced: true,
})
export default class ExplanationModule extends VuexModule {
  item: Explanation = {
    _id: String(),
    question: Object(),
    choices: Object(),
    createdAt: String(), // <date-time>
    updatedAt: String(), // <date-time>
  }

  @MutationAction
  async get({id, Authorization}: GetExplanation): Promise<{ item: Explanation }> {
    // const item: Explanation = await $axios.$get(`/explanations/${id}`, {
    //     headers: { 'Authorization': `Bearer ${Authorization}` }
    // })
    const item: Explanation = {
      _id: "642576fcb16b0234c0a3510b",
      question: {
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
      },
      choices: {
        a: {
          choice: "Different kinds of alcohol were sold as medicine.",
          explanation: `Incorrect. According to the passage, it is true of Prohibition that different kinds of alcohol were sold as medicine. The passage states, "Doctors and pharmacists of the Prohibition era made extra cash by writing prescriptions for 'medicinal alcohol,' which was nothing more than ordinary whiskey, liquor, or wine." Because this answer choice is true of Prohibition according to the passage, it is incorrect.`,
          relatedIdx: 9
        },
        b: {
          choice: "Illegal distribution of alcohol became a new method for gangsters to earn money.",
          explanation: `Incorrect. According to the passage, it is true of Prohibition that illegal distribution of alcohol became a new method for gangsters to earn money. The passage states, "Criminal gangs took over the sale of alcohol from legitimate businesses and created a black market for the distribution of alcoholic beverages." The passage also states that gangsters cashed in on the ban on legal sales of alcohol, meaning that they earned money. Because this answer choice is true of Prohibition according to the passage, it is incorrect.`,
          relatedIdx: 6
        },
        c: {
          choice: "Prohibition helped to reduce alcohol-related crimes in the United States.",
          explanation: `Correct. According to the passage, it is not true that Prohibition helped to reduce alcohol-related crimes in the United States. In fact, the passage states that "crime rates soared as the illegal consumption of alcohol rose." Therefore, prohibition did not help to reduce alcohol-related crimes, but instead caused them to increase. Because this answer choice is not true of Prohibition according to the passage, it is correct.`,
          relatedIdx: 5
        },
        d: {
          choice: "Prohibitionists supported it in the hope that it would decrease alcohol-related crime.",
          explanation: `Incorrect. According to the passage, it is true of Prohibition that Prohibitionists supported it in the hope that it would decrease alcohol-related crime. The passage states that Prohibitionists "favored the ban as a way to reduce alcohol-related crime." Because this answer choice is true of Prohibition according to the passage, it is incorrect.`,
          relatedIdx: 1
        }
      },
      createdAt: "2023-03-30T05:12:10.421+00:00",
      updatedAt: "2023-03-30T05:12:10.421+00:00"
    }

    return { item }
  }
}