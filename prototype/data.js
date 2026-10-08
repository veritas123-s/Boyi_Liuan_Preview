// Demonstration drafts. No claim of an approved curriculum or of access to the planned books.
export const tracks = {
  health: { name: '云上白大褂', eyebrow: 'HEALTH, MADE CLEAR', intro: '从一个生活里的问题，认识身体与医学。', color: 'coral' },
  stories: { name: '医学大师故事', eyebrow: 'LIVES THAT LIGHT THE WAY', intro: '走进医者的选择，看见知识背后的责任。', color: 'green' },
};

export const lessons = [
  {
    id: 'antibiotics', track: 'health', topic: '合理用药', title: '感冒了，\n抗生素就有用吗？', shortTitle: '感冒与抗生素',
    subtitle: '先认识对手，再理解药物。', description: '用一个小小的区别，理解为什么用药需要依据。', duration: '60 秒动态微课', readTime: '约 3 分钟', icon: 'microbe',
    keywords: ['感冒', '抗生素', '消炎药', '细菌', '病毒', '用药'],
    scenes: [
      { kicker: '01 / 先分清', title: '细菌和病毒，\n是不同的对手。', text: '普通感冒通常由病毒引起。', visual: 'microbe', labels: ['细菌', '病毒'] },
      { kicker: '02 / 药物的目标', title: '抗生素针对细菌。', text: '它不能治疗由病毒引起的普通感冒。', visual: 'target', labels: ['有对应目标', '并非越多越好'] },
      { kicker: '03 / 为什么要谨慎', title: '不需要时使用，\n也可能带来伤害。', text: '不恰当使用会增加不良反应和耐药风险。', visual: 'shield', labels: ['合理使用', '减少滥用'] },
      { kicker: '04 / 记住一个判断', title: '是否需要用药，\n让专业判断来回答。', text: '不自行分享或使用剩余抗生素。', visual: 'cross', labels: ['先咨询', '按医嘱'] },
    ],
    article: [
      { heading: '同样是感染，原因可能不同', text: '细菌和病毒是不同的病原体。抗生素用于治疗某些细菌感染，不能治疗病毒引起的普通感冒。不能仅凭“我感冒了”就判断需要抗生素。' },
      { heading: '多吃一种药，并不一定更有效', text: '不需要时使用抗生素仍可能出现不良反应，也会推动耐药问题。这里的“耐药”指病原体对药物的反应改变，并非简单地说人的身体变得耐药。' },
      { heading: '把正确的问题交给专业人员', text: '需要判断感染原因、选择药物或调整治疗时，应咨询医务人员。不要自行使用剩余抗生素，也不要把处方药分享给别人。' },
    ],
    takeaway: '把“这次感染的原因是什么”放在“该吃哪种药”之前。',
    quiz: [
      { question: '普通感冒由病毒引起时，哪种说法更准确？', options: ['抗生素越强，恢复越快', '抗生素不能治疗这种病毒感染', '把几种抗生素混在一起就会有效'], correct: 1, explanation: '抗生素作用于细菌，不能治疗病毒导致的普通感冒。是否合并其他感染需要专业判断。' },
      { question: '同学想把剩余抗生素分给你，合适的做法是？', options: ['先试一试再说', '只吃一半就不会有问题', '不自行服用，咨询医务人员'], correct: 2, explanation: '剩余处方药可能不适用于当前情况。不要分享或自行使用抗生素。' },
    ],
    questions: [
      { q: '为什么感冒不一定需要抗生素？', a: '普通感冒通常由病毒引起，而抗生素不能治疗病毒感染。是否需要药物应根据实际情况由专业人员判断。', source: 0 },
      { q: '耐药是人的身体耐药吗？', a: '耐药主要指病原体对药物的反应发生改变，使相关感染更难治疗。', source: 1 },
    ],
    sources: [
      { title: 'CDC · Antibiotic Do’s and Don’ts', url: 'https://www.cdc.gov/antibiotic-use/about/index.html' },
      { title: 'WHO · Antimicrobial resistance', url: 'https://www.who.int/health-topics/antimicrobial-resistance' },
    ],
  },
  {
    id: 'imaging', track: 'health', topic: '认识医学', title: 'CT 和 MRI，\n怎么“看见”身体？', shortTitle: 'CT 与 MRI 的区别',
    subtitle: '同样是成像，原理各有不同。', description: '把陌生的检查名词，变成两种可以理解的观察方式。', duration: '60 秒动态微课', readTime: '约 3 分钟', icon: 'scanner',
    keywords: ['CT', 'MRI', '磁共振', '影像', '辐射', '检查'],
    scenes: [
      { kicker: '01 / 一个共同目标', title: '看见身体内部，\n帮助回答医学问题。', text: '医学影像为专业判断提供信息。', visual: 'scanner', labels: ['观察结构', '提供信息'] },
      { kicker: '02 / CT', title: 'X 射线 + 重建，\n形成断层图像。', text: 'CT 使用电离辐射。', visual: 'slices', labels: ['断层', 'X 射线'] },
      { kicker: '03 / MRI', title: '磁场 + 射频信号，\n形成另一种图像。', text: 'MRI 不使用电离辐射，但仍有安全要求。', visual: 'wave', labels: ['磁场', '射频'] },
      { kicker: '04 / 如何选择', title: '检查选择，\n取决于要回答的问题。', text: '告知医务人员植入物等相关情况。', visual: 'cross', labels: ['适合问题', '专业选择'] },
    ],
    article: [
      { heading: 'CT 把多个方向的信息组合起来', text: 'CT 使用 X 射线，采集信息并通过计算机重建形成断层图像。它能帮助医生观察体内结构，属于使用电离辐射的检查。' },
      { heading: 'MRI 使用不同的物理原理', text: 'MRI 利用强磁场和射频信号成像，不使用电离辐射。强磁场、植入物和金属物品等仍涉及安全要求，检查前需要如实告知医务人员相关情况。' },
      { heading: '没有适合所有情况的唯一答案', text: '检查各有用途。应由医务人员结合临床问题、必要性与安全条件选择，不能仅凭“没有电离辐射”就自行认定某一种检查始终更合适。' },
    ],
    takeaway: '理解原理，知道询问什么；具体检查由专业人员结合情况选择。',
    quiz: [
      { question: '哪种检查使用 X 射线形成断层图像？', options: ['CT', 'MRI', '两者都不使用'], correct: 0, explanation: 'CT 使用 X 射线，属于使用电离辐射的检查；MRI 使用磁场和射频信号。' },
      { question: '关于 MRI 安全，哪种说法更准确？', options: ['没有电离辐射就没有任何安全要求', '不需要告知植入物信息', '仍需遵守安全要求，并告知相关植入物信息'], correct: 2, explanation: 'MRI 不使用电离辐射，但强磁场等仍有安全要求。相关信息应交由医务人员评估。' },
    ],
    questions: [
      { q: 'MRI 有没有电离辐射？', a: 'MRI 不使用电离辐射。它通过强磁场和射频信号形成图像，但仍需遵守相应安全要求。', source: 1 },
      { q: 'CT 和 MRI 哪个更好？', a: '它们各有用途。选择取决于需要回答的临床问题、必要性和安全条件，不应只按单一属性比较。', source: 0 },
    ],
    sources: [
      { title: 'FDA · Medical X-ray Imaging', url: 'https://www.fda.gov/radiation-emitting-products/medical-imaging/medical-x-ray-imaging' },
      { title: 'FDA · MRI Benefits and Risks', url: 'https://www.fda.gov/radiation-emitting-products/mri-magnetic-resonance-imaging/benefits-and-risks' },
    ],
  },
  {
    id: 'wu', track: 'stories', topic: '公共卫生', title: '伍连德\n把求真带到疫区', shortTitle: '伍连德与公共卫生', person: '伍连德', years: '1879—1960',
    subtitle: '从寻找证据，到保护更多的人。', description: '在公共卫生的历史现场，理解科学判断与社会责任。', duration: '60 秒故事导览', readTime: '约 4 分钟', icon: 'archive',
    keywords: ['伍连德', '鼠疫', '公共卫生', '求真', '报国', '医学大师'],
    scenes: [
      { kicker: '1908 / 回到中国', title: '把所学，\n带回需要的地方。', text: '伍连德到天津的陆军军医学堂任职。', visual: 'archive', labels: ['医学教育', '服务社会'] },
      { kicker: '1910 / 东北疫区', title: '先寻找证据，\n再理解疫情。', text: '他赴哈尔滨调查并组织防疫。', visual: 'microbe', labels: ['调查', '判断'] },
      { kicker: '1911 / 学术交流', title: '让经验，\n进入共同的讨论。', text: '他主持奉天万国鼠疫研究会。', visual: 'book', labels: ['交流', '协作'] },
      { kicker: '今天 / 我们的问题', title: '理解一个判断，\n也理解背后的责任。', text: '这一页的价值讨论是学习引导，不是人物原话。', visual: 'spark', labels: ['科研求真', '公共责任'] },
    ],
    timeline: [
      { year: '1908', title: '回到中国', text: '到天津任陆军军医学堂帮办，将所学用于医学教育。' },
      { year: '1910', title: '进入疫区', text: '年底赴哈尔滨，调查东北鼠疫并组织防疫。' },
      { year: '1911', title: '交流经验', text: '主持奉天万国鼠疫研究会，与各国专家讨论防疫经验。' },
    ],
    article: [
      { heading: '当一个问题关乎许多人的生命', text: '1910 年，东北发生严重鼠疫。伍连德赴哈尔滨开展调查和防疫，把观察与研究带到具体的公共卫生问题中。' },
      { heading: '知识需要证据，也需要协作', text: '他的工作涉及查明传播方式、推动防护和组织协作。1911 年，他主持奉天万国鼠疫研究会，交流防疫经验。把复杂问题拆开、寻找依据，是这个故事可以带给我们的学习线索。' },
    ],
    takeaway: '价值讨论：面对重要问题，求真需要证据，行动需要对他人负责。',
    reflection: '当一种判断会影响很多人时，你认为我们应该先做哪些核实？',
    quiz: [
      { question: '这段故事更适合用来讨论哪一种做事方式？', options: ['只凭直觉作出结论', '寻找证据，并与他人协作', '把复杂问题全部归结为个人勇气'], correct: 1, explanation: '这是课堂价值讨论。故事中的调查与交流提示我们重视证据和协作，不能把公共卫生工作简化为一个人的行动。' },
      { question: '网站上的历史叙述应如何核对？', options: ['看起来有感染力就可以', '只要动画好看就可靠', '查看可追溯史料，并区分事实与讨论'], correct: 2, explanation: '历史事实应有来源，学习讨论和编辑解读应与人物原话、史实区分。' },
    ],
    questions: [
      { q: '伍连德为什么与公共卫生有关？', a: '他参与东北鼠疫调查、防疫组织及医学交流，是中国检疫与防疫事业的重要先驱。', source: 0 },
    ],
    sources: [
      { title: '北京大学公共卫生学院 · 公卫人物伍连德', url: 'https://sph.pku.edu.cn/info/1039/4658.htm' },
    ],
  },
  {
    id: 'lin', track: 'stories', topic: '医者仁心', title: '林巧稚\n守护生命的日常', shortTitle: '林巧稚与医者仁心', person: '林巧稚', years: '1901—1983',
    subtitle: '在具体的人与事里，理解医者的关怀。', description: '沿着学习与行医的足迹，认识妇产医学先驱。', duration: '60 秒故事导览', readTime: '约 4 分钟', icon: 'flower',
    keywords: ['林巧稚', '医者仁心', '医学教育', '妇产', '责任', '医学大师'],
    scenes: [
      { kicker: '1921 / 求学', title: '走进协和，\n开始学医。', text: '林巧稚进入北京协和医学院。', visual: 'book', labels: ['求学', '积累'] },
      { kicker: '1929 / 毕业', title: '从课堂，\n走向临床。', text: '毕业后留院，从事妇产科工作。', visual: 'flower', labels: ['临床', '照护'] },
      { kicker: '1940 / 继续承担', title: '把专业，\n用于守护生命。', text: '成为协和妇产科第一位中国籍女主任。', visual: 'cross', labels: ['责任', '专业'] },
      { kicker: '今天 / 价值讨论', title: '关怀，\n也在日常的小事里。', text: '这是一道开放讨论题，不设置唯一的表达。', visual: 'spark', labels: ['尊重', '理解'] },
    ],
    timeline: [
      { year: '1921', title: '进入协和求学', text: '赴北京协和医学院学习医学。' },
      { year: '1929', title: '毕业并留院', text: '毕业后在北京协和医院妇产科工作。' },
      { year: '1940', title: '承担科室职责', text: '成为协和妇产科第一位中国籍女主任。' },
    ],
    article: [
      { heading: '从求学到临床', text: '林巧稚是中国现代妇产科学的重要开拓者。1921 年进入协和学习，1929 年毕业留院。1940 年，她成为协和妇产科第一位中国籍女主任。' },
      { heading: '故事怎样连接我们的生活', text: '协和的纪念资料呈现了她长期从医和关怀患者的经历。对青少年而言，可以从“认真倾听、尊重他人、持续学习”等日常问题开始讨论医者仁心。这里的讨论为编辑引导，并非林巧稚本人的原话。' },
    ],
    takeaway: '价值讨论：怎样把对生命的尊重，落实为今天可以做到的小事？',
    reflection: '在学校或家庭里，有什么行动能够体现对他人的尊重和关怀？',
    quiz: [
      { question: '对医学大师故事进行青年化表达时，哪项应保留？', options: ['事实来源与叙述边界', '为增强戏剧性虚构人物对白', '用特效代替史料核对'], correct: 0, explanation: '表达形式可以创新，历史事实和人物原话需要可追溯依据。不能把编辑创作伪装为史料。' },
      { question: '关于“医者仁心”的开放讨论，怎样开展更合适？', options: ['只接受一种固定句式', '只比较谁的语言最感人', '联系具体行动，并尊重不同的表达'], correct: 2, explanation: '这是一种课堂讨论建议。讨论可以从具体行为出发，不用一句固定口号替代个人理解。' },
    ],
    questions: [
      { q: '林巧稚的求学与行医经历从哪里核对？', a: '可阅读北京协和医院的纪念资料。本原型列出的学习、毕业和科室任职节点均附相关来源。', source: 0 },
    ],
    sources: [
      { title: '北京协和医院 · 协和之光', url: 'https://ims.pumch.cn/detail/28012.html' },
    ],
  },
];

export const productionSteps = ['内容选题', '脚本转化', '专业审核', '可视化制作', '发布归档'];
