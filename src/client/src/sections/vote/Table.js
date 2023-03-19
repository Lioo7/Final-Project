const table = [
  {
    id: 1,
    subject: 'ביטחון',
    budget: '20',
    children: [
      {
        id: 2,
        subject: 'צה"ל',
        budget: '15',
      },
      {
        id: 3,
        subject: 'משרד הביטחון',
        budget: '5',
      },
    ],
  },
  {
    id: 4,
    subject: 'כלכלה',
    budget: '40',
    children: [
      {
        id: 5,
        subject: 'הייטק',
        budget: '20',
      },
      {
        id: 6,
        subject: 'בנק',
        budget: '10',
      },
      {
        id: 7,
        subject: 'פנסיה',
        budget: '10',
        children: [
          {
            id: 8,
            subject: 'מייק',
            budget: '10',
          },
        ],
      },
    ],
  },
  {
    id: 9,
    subject: 'פנים',
    budget: '10',
    children: [
      {
        id: 10,
        subject: 'הייטק',
        budget: '1',
      },
      {
        id: 11,
        subject: 'בנק',
        budget: '4',
      },
      {
        id: 12,
        subject: 'פנסיה',
        budget: '5',
        children: [
          {
            id: 13,
            subject: 'מייק',
            budget: '5',
          },
          {
            id: 131,
            subject: 'ימייק',
            budget: '0',
          },
        ],
      },
    ],
  },
  {
    id: 14,
    subject: 'ביטחון',
    budget: '30',
  }
  // {
  //   id: 3,
  //   subject: 'משרד הפנים',
  //   last_name: 'Bowart',
  //   budget: '85',
  // },
  // {
  //   id: 4,
  //   subject: 'Bert',
  //   last_name: 'Huckett',
  //   budget: '75',
  // },
  // {
  //   id: 5,
  //   subject: 'Drew',
  //   last_name: 'Jenicke',
  //   budget: '42',
  // },
  // {
  //   id: 6,
  //   subject: 'Deloria',
  //   last_name: 'Pepperill',
  //   budget: '11',
  // },
  // {
  //   id: 7,
  //   subject: 'Spense',
  //   last_name: 'Ivashnyov',
  //   budget: '90',
  // },
  // {
  //   id: 8,
  //   subject: 'Elden',
  //   last_name: 'Chaucer',
  //   budget: '56',
  // },
  // {
  //   id: 9,
  //   subject: 'Sholom',
  //   last_name: 'Deetch',
  //   budget: '22',
  // },
  // {
  //   id: 10,
  //   subject: 'Genovera',
  //   last_name: 'Colby',
  //   budget: '63',
  // },
];

export default table;
