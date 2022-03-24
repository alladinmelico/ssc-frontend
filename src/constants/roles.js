const roles = [
    {
      value: 2,
      label: 'Faculty',
      crud: ['SCHEDULE', 'SUBJECT', 'CLASSROOM', 'SECTION'] 
    },
    {
      value: 3,
      label: 'Student',
      crud: ['SCHEDULE', 'CLASSROOM']  
    },
    {
      value: 4,
      label: 'Guest', 
      crud: ['SCHEDULE'] 
    },
    {
      value: 5,
      label: 'Class President', 
      crud: ['SCHEDULE', 'CLASSROOM', 'SECTION'] 
    },
    {
      value: 6,
      label: 'Organization President', 
      crud: ['SCHEDULE', 'CLASSROOM', 'SECTION'] 
    },
    {
      value: 7,
      label: 'Staff', 
      crud: ['SCHEDULE', 'SUBJECT', 'CLASSROOM', 'SECTION', 'FACILITY', 'REPORT', 'COMMUNICATION'] 
    },
    {
      value: 7,
      label: 'Guard', 
      crud: ['HARDWARE'] 
    },
  ]

  export default roles