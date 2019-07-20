 export default {
 vcCalendarDateConfig:{
    attributes:[
      {
        key:'today',
        highlight:true,
      }
    ],
    masks:{
      weekdays: 'WW',
      input:['DD-MMM-YYYY'],
      data:['YYYY-MM-DD']
    }
  },
  momentJSDateFormat:{
    input:'YYYY-MM-DDTHH:mm:ss.SSSZ',
    display:'DD-MMM-YYYY'
  }
}