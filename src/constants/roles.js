const roles = [
    {
      value: 1,
      label: 'Admin',
      crud: ['SUBJECT', 'SECTION','USER', 'TICKET', 'FACILITY', 'COURSE', 'REPORT', 'COMMUNICATION', 'HARDWARE'] 
    },
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
      label: 'Staff', 
      crud: ['SCHEDULE', 'FACILITY', 'REPORT', 'COMMUNICATION', 'HARDWARE'] 
    },
    {
      value: 7,
      label: 'Guard', 
      crud: ['HARDWARE', 'COMMUNICATION'] 
    },
  ]

  export default roles