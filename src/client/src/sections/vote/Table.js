const table = [
    {
      id: 1,
      subject: 'ביטחון',
      budget: '40',
      children: [{     
         id: 1.1,
         subject: 'צה"ל',
        budget: '18',
      },
      {
        id: 1.2,
        subject: 'משרד הביטחון',
        budget: '22',
        
      }
    ]
    },
    {
      id: 2,
      subject: 'כלכלה',
      budget: '50',
      children: [{     
        id: 2.1,
       subject: 'הייטק',
       budget: '33',
     },
     {     
      id: 2.2,
     subject: 'בנק',
     budget: '5',
   },
     {
       id: 2.3,
       subject: 'פנסיה',
       budget: '12',
       children:[{ 
        id: 2.31,
        subject: 'מייק',
        budget: '6',},
        { 
          id: 2.32,
          subject: 'מייקי',
          budget: '6',}]
     }
   ]
    },
    {
      id: 3,
      subject: 'משרד הפנים',
      budget: '10',
    }
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