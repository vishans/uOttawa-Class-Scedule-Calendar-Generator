export function getCompontType(block){
    // Returns a string like 'Lecture', 'Tutorial', etc..
    const regex = /\d{4}\s*[A-Z]\d{2}\s*([A-Z]\w*)/gm;
    const match = regex.exec(block);

    return match[1];

}

export function getSection(block){
    // Returns a string like A00 or like B01 etc .. 
    const regex = /\d{4}\s*([A-Z]\d{2})\s*[A-Z]\w*/gm;
    const match = regex.exec(block);

    return match[1];

}

export function getClassNumber(block){
    // Returns a string like 2042 
    const regex = /(\d{4})\s*[A-Z]\d{2}\s*[A-Z]\w*/gm;
    const match = regex.exec(block);

    return match[1];

}

// ---- whole classes from block
//      lectures, tutorials, lab etc..
export function getClasses(block){
    // Returns a list of class blocks 
    // Each block contains info like Date and Time, Room. Instructor, Start and End date
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = block.match(regex);

    return match;
}
// ----

export function parseClassName(title){
    const [code, name] = title.split("-")

    return {code: code.trim(), name: name.trim()};
}

const dayMap = {
  Mo: 1,
  Tu: 2,
  We: 3,
  Th: 4,
  Fr: 5,
  Sa: 6,
  Su: 0
};

export function applyTimeToDate(date, timeString) {
  const match = timeString.match(/(\d+):(\d+)(AM|PM)/);

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3];

  // convert 12-hour format to 24-hour format
  if (period === "PM" && hours !== 12) {
      hours += 12;
  } else if (period === "AM" && hours === 12) {
      hours = 0; // 12 AM is 00:00 in 24-hour time
  }

  date.setHours(hours, minutes, 0, 0);

  return date;
}

export function getActualStartDate(startDate, dayNTime){
  const startDayNo = startDate.getDay();
  const currentDayNo = dayMap[dayNTime.day]

  const deltaNo = Math.abs(currentDayNo - startDayNo);
  
  startDate.setDate(startDate.getDate() + deltaNo);

  const result =  applyTimeToDate(startDate, dayNTime.startTime)

  return result;
}

export function getActualEndDate(startDate, dayNTime){
  // console.log(dayNTime)
  const startDayNo = startDate.getDay();
  const currentDayNo = dayMap[dayNTime.day]

  const deltaNo = currentDayNo - startDayNo;
  
  startDate.setDate(startDate.getDate() + deltaNo);

  return applyTimeToDate(startDate, dayNTime.endTime)
}


// ---- to extract info from each class 
//      like extract info from lecture or lab

// The getClassX functions are meant to be used on class blocks
// to extract specific info
export function getClassDT(cls){
    console.log(cls) 
    const regex = /([A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;

    const match = regex.exec(cls);
    console.log('match is')
    console.log(match)
    return match[1];
}

export function parseScheduleLine(schedule) {
  //capture the day, start time, and end time
  // example schedule We 8:30AM - 9:50AM
  const regex = /^(\w{2})\s+(\d{1,2}:\d{2}[AP]M)\s*-\s*(\d{1,2}:\d{2}[AP]M)$/;
  const match = schedule.match(regex);
  if (!match) {
    // if fails
    // try french time format
    // /^(\w{3})\s+(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})$/gm
    return null; 
  }
  const [, day, startTime, endTime] = match;
  return { day, startTime, endTime };
}

export function parseDateRange(rangeStr) {
  // capture two dates separated by a hyphen.
  // Assumes dates are in MM/DD/YYYY format.
  const regex = /^\s*(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}\/\d{2}\/\d{4})\s*$/;
  const match = rangeStr.match(regex);
  if (!match) {
    return null;
  }
  
  const [, startStr, endStr] = match;
  
  // helper function to convert a date string in MM/DD/YYYY to a Date object
  function parseDate(dateStr) {
    const [month, day, year] = dateStr.split('/').map(Number);
    // Note: Date months are 0-indexed (0 = January, 11 = December)
    return new Date(year, month - 1, day);
  }
  
  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);
  
  return {
    start: startDate,
    end: endDate
  };
}

export function getClassLocation(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

export function parseLocation(str) {
  const regex = /^(.*?)\s*\((.*?)\)\s*(.*)$/;
  const match = str.match(regex);
  if (!match){
    return {
      address: '',
      building: '',
      room: str 
    }
  } 
  
  const [ , address, building, room ] = match;
  
  return {
    address: address.trim(),
    building: building.trim(),
    room: room.trim()
  };
}

export function getClassInstructor(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

export function getClassStartEnd(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

// ---- 


export function toFloatingTimeString(date) {
    const pad = (num) => num.toString().padStart(2, '0');
    return date.getFullYear().toString() +
           pad(date.getMonth() + 1) +
           pad(date.getDate()) + 'T' +
           pad(date.getHours()) +
           pad(date.getMinutes()) +
           pad(date.getSeconds());

}

// --- overhaul ----

export class Class{
    constructor(className){
        this.className = className;
        this.components = null;
    }

    getSubjectCode(){
        return this.className.match(/[A-Z]{3}/)[0];
    }

    getCourseCode(){
        return this.className.match(/\d{4}/)[0];
    }

    getCourseName(){
        return this.className.split("-").pop().trim();
    }

    setComponents(components){
        this.components = components;
    }

}

export class Component{
    constructor(number, section, component, daysNTimes, room, instructor, startEndDate){
        this.number = number;
        this.section = section;
        this.component = component;
        this.daysNTimes = daysNTimes;
        this.room = room;
        this.instructor = instructor;
        
        // only match the date range
        const matches = startEndDate.match(/\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}\/\d{2}\/\d{4}/g);
        this.startEndDate = matches[0];
    }


      // the date when the component starts in the semester
      getStartDate(){
          return this.startEndDate.match(/\b\d{2}\/\d{2}\/\d{4}\b/g)[0];
      }

      // the date when the component ends in the semester
      getEndDate(){
          return this.startEndDate.match(/\b\d{2}\/\d{2}\/\d{4}\b/g)[1];
      }

    static toDateObject(text, language){

          // English date (MM/DD/YYYY)
          let monthIndex = 0;
          let dayIndex = 1;

          // Date francaise
          if(language == "Fr"){
            // (DD/MM/YYYY)
            monthIndex = 1;
            dayIndex = 0;

          }

          const startDateComponents = text.split("/");
          const year = Number(startDateComponents[2]);
          const month = Number(startDateComponents[monthIndex]) - 1; // The date object has month range 0-11 (which i find weird)
          const day = Number(startDateComponents[dayIndex]);

          return new Date(year, month, day);
      }

    // get a Date object of when the first day of this component is
    getStart(){
        // const startDateComponents = this.getStartDate().split("/");
        // const year = Number(startDateComponents[2]);
        // const month = Number(startDateComponents[0]) - 1; // The date object has month range 0-11 (which i find weird)
        // const day = Number(startDateComponents[1]);

        // const startDate = new Date(year, month, day);
        const startDate = Component.toDateObject(this.getStartDate(), this.getLanguage());

        const week = Array.from({length: 7}, (_, i) => i);
        let i = startDate.getDay();

        let count = 0;
        const stopDay = this.getDay();
        console.log(`Index day is ${i}`);
        console.log(`Stop day is ${stopDay}`);
        while(true){
            if(i == stopDay){
                break
            }

            count++;
            i = (i + 1) % 7
            
        }
        console.log(`count is ${count}`);
        

        // console.log(startDate);
        startDate.setDate(startDate.getDate() + count);
        
        let _, hour, minute, period;

        const timeStr = this.daysNTimes.match(/\b\d{1,2}:\d{2}(?:AM|PM)\b/g);
        if(timeStr){
            const match = timeStr[0].match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

            [_, hour, minute, period] = match;
            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);

            if (period === "PM" && hour !== 12) hour += 12;
            if (period === "AM" && hour === 12) hour = 0;

            startDate.setHours(hour, minute, 0, 0);
        }else{
            console.log(this.daysNTimes)
            let matchStr = this.daysNTimes.match(/(\d{2}):(\d{2})/g)[0];
            let match = /(\d{2}):(\d{2})/.exec(matchStr);
            console.log(`match: ${match}`);
            [_, hour, minute] = match;
            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);

            startDate.setHours(hour, minute, 0, 0);
        }

        console.log(`hour ${hour}`);
        console.log(`minute ${minute}`);
        console.log(startDate.toLocaleString("en-CA", { timeZone: "America/Toronto" }));
        
        return startDate;
    }

    // get a Date object of when the component ends (on the first day it started)
    getEnd(){
        // const startDateComponents = this.getStartDate().split("/");
        // const year = Number(startDateComponents[2]);
        // const month = Number(startDateComponents[0]) - 1; // The date object has month range 0-11 (which i find weird)
        // const day = Number(startDateComponents[1]);

        // const startDate = new Date(year, month, day);
        const startDate = Component.toDateObject(this.getStartDate(), this.getLanguage());

        const week = Array.from({length: 7}, (_, i) => i);
        let i = startDate.getDay();

        let count = 0;
        const stopDay = this.getDay();
        console.log(`Index day is ${i}`);
        console.log(`Stop day is ${stopDay}`);
        while(true){
            if(i == stopDay){
                break
            }

            count++;
            i = (i + 1) % 7
            
        }
        console.log(`count is ${count}`);
        

        // console.log(startDate);
        startDate.setDate(startDate.getDate() + count);
        
        let _, hour, minute, period;

        const timeStr = this.daysNTimes.match(/\b\d{1,2}:\d{2}(?:AM|PM)\b/g);
        if(timeStr){
            const match = timeStr[1].match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

            [_, hour, minute, period] = match;
            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);

            if (period === "PM" && hour !== 12) hour += 12;
            if (period === "AM" && hour === 12) hour = 0;

            startDate.setHours(hour, minute, 0, 0);
        }else{
            console.log(this.daysNTimes)
            let matchStr = this.daysNTimes.match(/(\d{2}):(\d{2})/g)[1];
            let match = /(\d{2}):(\d{2})/.exec(matchStr);
            console.log(`match: ${match}`);
            [_, hour, minute] = match;
            hour = parseInt(hour, 10);
            minute = parseInt(minute, 10);

            startDate.setHours(hour, minute, 0, 0);
        }

        console.log(`hour ${hour}`);
        console.log(`minute ${minute}`);
        console.log(startDate.toLocaleString("en-CA", { timeZone: "America/Toronto" }));
        
        return startDate;
    }


      // get the day of the week when the component happens
      // like the day of the lecture/lab/tutorial
      getDay(){

          const weekdayMap = {
              Su: 0,
              Mo: 1,
              Tu: 2,
              We: 3,
              Th: 4,
              Fr: 5,
              Sa: 6,

              Dim: 0,
              Lun: 1,
              Mar: 2,
              Mer: 3,
              Jeu: 4,
              Ven: 5,
              Sam: 6
          };

          let  result = weekdayMap[this.daysNTimes.slice(0, 2)];
          if (result){
            return result
          }
          
          // Francais
          return weekdayMap[this.daysNTimes.slice(0, 3)];


      }

    // get the language of the component (either "En" or "Fr")
    // This depends on the language setting on uoZone
    getLanguage(){
        const keywords = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

        const found = keywords.some(keyword => this.daysNTimes.includes(keyword));

        if(found){
            return "Fr";
        }

        return "En"
    }
}


export function parseClass(text){

    let components = [];
    // split text in lines
    let lines = text.split(/[\n][\n\r]*/);

    // filter array, i.e get rid of empty strings and whitespaces/tabs
    lines = lines.filter(str => str.trim() != "");

    console.log(lines);
    
    let section = '';
    let component = '';
    let number = '';

    let index = 0;
    let current = '';
    let captured = false;
    while(index < lines.length){
        let daysNTimes = ''
        let room = '';
        let instructor = '';
        let startEndDate = '';

        current = lines[index];

        if(/^\d{4}$/.test(current)){ // Look for class Number
            number = current;
            // Next should be the section
            section = lines[++index];

            // And then component
            component = lines[++index];

            // Then days and times
            daysNTimes = lines[++index];
            
            // Room (but really it's the location)
            room = lines[++index];

            // Instructor
            instructor = lines[++index];

            // Start and end date
            startEndDate = lines[++index]

            captured = true;

        }else if( 
            /[A-Za-z]{2}\s\d{1,2}:\d{2}[AP]M\s-\s\d{1,2}:\d{2}[AP]M/
            .test(current)){

            // Then days and times
            daysNTimes = lines[index];
            
            // Room (but really it's the location)
            room = lines[++index];

            // Instructor
            instructor = lines[++index];

            // Start and end date
            startEndDate = lines[++index]

            captured = true;
        }

        index++;

        if (captured){
            components.push(
                new Component(
                    number, 
                    section,
                    component,
                    daysNTimes, 
                    room,
                    instructor,
                    startEndDate
                )
            );
            // console.log('====');
            // console.log(section);
            // console.log(component);
            // console.log(daysNTimes);
            // console.log(room);
            // console.log(instructor);
            // console.log(startEndDate);
            // console.log('====');
            // console.log('\n\n');
        }

        captured = false;
        
    }

    // console.log(section);
    // console.log(component);
    // console.log(daysNTimes);
    // console.log(room);
    // console.log(instructor);
    // console.log(startEndDate);
    // console.log('\n\n\n');
    return components;

}

export function parseAllClassNames(text){

    let lines = text.split(/[\n][\n\r]*/);

    // filter array, i.e get rid of empty strings and whitespaces/tabs
    lines = lines.filter(str => str.trim() != "");

    const names = [];
    for(const line of lines){
        const match = line.match(/[A-Z]{3}\s\d{4}\s-\s.+/gm);
        if(match){
            names.push(match[0]);

        }
    }

    return names;
}