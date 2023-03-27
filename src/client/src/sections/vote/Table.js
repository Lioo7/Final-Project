const table = [
  {
    id: 1,
    name: 'ביטחון',
    budget: '20',
    checked: false,
    children: [
      {
        id: 2,
        name: 'צה"ל',
        budget: '15',
        checked: false,
      },
      {
        id: 3,
        name: 'משרד הביטחון',
        budget: '5',
        checked: false,
      },
    ],
  },
  {
    id: 4,
    name: 'כלכלה',
    budget: '40',
    checked: false,
    children: [
      {
        id: 5,
        name: 'הייטק',
        budget: '20',
        checked: false,
      },
      {
        id: 6,
        name: 'בנק',
        budget: '10',
        checked: false,
      },
      {
        id: 7,
        name: 'פנסיה',
        budget: '10',
        checked: false,
        children: [
          {
            id: 8,
            name: 'מייק',
            budget: '10',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: 'פנים',
    budget: '10',
    checked: false,
    children: [
      {
        id: 10,
        name: 'הייטק',
        budget: '1',
        checked: false,
      },
      {
        id: 11,
        name: 'בנק',
        budget: '4',
        checked: false,
      },
      {
        id: 12,
        name: 'פנסיה',
        budget: '5',
        checked: false,
        children: [
          {
            id: 13,
            name: 'מייק',
            budget: '3',
            checked: false,
            children: [
              {
                id: 141,
                name: 'תרבות',
                budget: '1',
                checked: false,
                children: [
                  {
                    id: 151,
                    name: 'בריאות',
                    budget: '1',
                    checked: false,
                    children: [
                      {
                        id: 161,
                        name: 'תרבות',
                        budget: '1',
                        checked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: 142,
                name: 'ספורט',
                budget: '1',
                checked: false,
              },
              {
                id: 143,
                name: 'אוצר',
                budget: '1',
                checked: false,
              },
            ],
          },
          {
            id: 131,
            name: 'ימייק',
            budget: '1',
            checked: false,
          },
          {
            id: 132,
            name: 'חינוך',
            budget: '1',
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 14,
    name: 'ביטחון',
    budget: '30',
    checked: false,
  },
  // {
  //   id: 3,
  //   name: 'משרד הפנים',
  //   last_name: 'Bowart',
  //   budget: '85',
  // },
  // {
  //   id: 4,
  //   name: 'Bert',
  //   last_name: 'Huckett',
  //   budget: '75',
  // },
  // {
  //   id: 5,
  //   name: 'Drew',
  //   last_name: 'Jenicke',
  //   budget: '42',
  // },
  // {
  //   id: 6,
  //   name: 'Deloria',
  //   last_name: 'Pepperill',
  //   budget: '11',
  // },
  // {
  //   id: 7,
  //   name: 'Spense',
  //   last_name: 'Ivashnyov',
  //   budget: '90',
  // },
  // {
  //   id: 8,
  //   name: 'Elden',
  //   last_name: 'Chaucer',
  //   budget: '56',
  // },
  // {
  //   id: 9,
  //   name: 'Sholom',
  //   last_name: 'Deetch',
  //   budget: '22',
  // },
  // {
  //   id: 10,
  //   name: 'Genovera',
  //   last_name: 'Colby',
  //   budget: '63',
  // },
];

export default table;
