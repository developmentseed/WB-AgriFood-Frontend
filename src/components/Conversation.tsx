import { Flex } from '@chakra-ui/react';
import Message from './Message';

const sampleConversationData = [
  {
    messageData: {
      text: 'How do I find the best programs for food security in Tanzania?',
      from: 'Lane Goodman',
    },
    isMyMessage: true,
  },
  {
    messageData: {
      text: `
        The World Bank has identified several strategies to increase food security in Tanzania. Some of the key recommendations include:

        Improving agricultural productivity: Enhancing productivity through improved agricultural practices, access to high-quality seeds, fertilizers, and modern farming techniques can help increase food production.

        Investing in rural infrastructure: Developing infrastructure such as roads, storage facilities, and irrigation systems can facilitate the transportation of agricultural products to markets and reduce post-harvest losses.

        Enhancing access to markets: Strengthening market linkages and creating opportunities for smallholder farmers to access markets can improve their income and food security.

        Promoting sustainable land management: Implementing sustainable land management practices can help preserve soil fertility, prevent land degradation, and mitigate the impact of climate change on agricultural productivity.

        Supporting smallholder farmers: Providing smallholder farmers with access to credit, extension services, and agricultural training can help improve their productivity and resilience to shocks.

        Diversifying livelihoods: Encouraging diversification into non-agricultural livelihoods can reduce dependency on agriculture and enhance household resilience to food insecurity.

        Investing in nutrition: Promoting nutrition-sensitive agriculture and improving access to nutritious foods can address malnutrition and improve overall food security.

        These strategies, when implemented effectively and in a coordinated manner, can contribute to improving food security and reducing poverty in Tanzania.
      `,
      from: 'WB Agrifood Data Lab',
    },
    isMyMessage: false,
  },
  {
    messageData: {
      text: 'Which of these strategies has the best evidence?',
      from: 'Lane Goodman',
    },
    isMyMessage: true,
  },
  {
    messageData: {
      text: `During the 1990s, Tanzania implemented several policies and initiatives that contributed to improved food security:

      1. Market liberalization: Tanzania embarked on economic reforms during the 1990s, including liberalizing markets and reducing government intervention in agriculture. This shift toward market-oriented policies encouraged private sector investment, increased competition, and improved market efficiency, leading to greater access to inputs such as seeds, fertilizers, and agricultural machinery for farmers.
      
      2. Decentralization: The government decentralized decision-making and resource allocation to local authorities, empowering communities to prioritize and implement agricultural development initiatives based on their specific needs and circumstances. This decentralization of governance helped enhance agricultural productivity and food security at the local level.
      
      3. Investments in agricultural research and extension: Tanzania increased investments in agricultural research and extension services during the 1990s, leading to the development and dissemination of improved crop varieties, farming techniques, and management practices. These investments contributed to increased agricultural productivity, diversified food production, and enhanced resilience to shocks such as pests and diseases.
      
      4. Promotion of smallholder agriculture: The government promoted smallholder agriculture by providing support to small-scale farmers through initiatives such as access to credit, agricultural inputs, extension services, and market linkages. These efforts aimed to improve the livelihoods of smallholder farmers, increase their productivity, and enhance food security at the household and community levels.
      
      5. Food aid and social safety nets: In response to occasional food shortages and emergencies, Tanzania received food aid from international donors and implemented social safety net programs to assist vulnerable populations. These programs provided temporary relief during times of crisis and helped protect households from food insecurity.
      
      Overall, the combination of market liberalization, decentralization, investments in agricultural research and extension, promotion of smallholder agriculture, and social safety nets contributed to improved food security in Tanzania during the 1990s. However, challenges such as poverty, land degradation, climate variability, and inadequate infrastructure persisted and required continued attention in subsequent years.`,
      from: 'WB Agrifood Data Lab',
    },
    isMyMessage: false,
  },
  {
    messageData: {
      text: 'How can I find out more?',
      from: 'Lane Goodman',
    },
    isMyMessage: true,
  },
  {
    messageData: {
      text: `I can suggest some ways to find resources related to the factors that improved food security in Tanzania during the 1990s:

      Academic Journals: Search for academic journals in fields such as agricultural economics, development studies, or food security. Journals like "Food Policy," "World Development," and "Journal of Development Studies" often publish research on agricultural policies, economic reforms, and food security interventions.
      
      World Bank and United Nations Reports: Organizations like the World Bank, United Nations agencies (such as FAO, UNDP, and WFP), and international development organizations often publish reports and studies on agriculture, rural development, and food security in Tanzania. You can search their websites or databases for reports related to Tanzania's food security during the 1990s.
      
      Government Publications: Check the websites of Tanzanian government agencies responsible for agriculture, rural development, and food security. They may have published reports, policy documents, and evaluations of programs and policies implemented during the 1990s.
      
      Scholarly Databases: Utilize academic databases such as PubMed, Google Scholar, or JSTOR to search for scholarly articles, research papers, and studies on Tanzania's food security during the 1990s. You can use keywords like "Tanzania food security," "agricultural reforms Tanzania," "market liberalization Tanzania," etc.
      
      Books and Book Chapters: Look for books and book chapters on agricultural development, economic reforms, and food security in Tanzania. Libraries, online bookstores, and academic publishers may have relevant publications on this topic.
      
      By using these methods and refining your search criteria, you should be able to find resources that provide insights into the factors that contributed to improved food security in Tanzania during the 1990s.`,
      from: 'WB Agrifood Data Lab',
    },
    isMyMessage: false,
  },
];
function Conversation() {
  return (
    <Flex
      flexDir="column"
      flex="1"
      justifyContent={'space-between'}
      alignItems={'end'}
      gap="4"
      overflow='scroll'
      alignSelf={'center'}
    >
      {sampleConversationData.map((c) => (
        <Message
          key={c.messageData.text}
          messageData={c.messageData}
          isMyMessage={c.isMyMessage}
        />
      ))}
    </Flex>
  );
}
export default Conversation;
