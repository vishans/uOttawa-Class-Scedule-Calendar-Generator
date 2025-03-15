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
    
    const regex = /([A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;

    const match = regex.exec(cls);

    return match[1];
}

export function parseScheduleLine(schedule) {
  //capture the day, start time, and end time
  // example schedule We 8:30AM - 9:50AM
  const regex = /^(\w{2})\s+(\d{1,2}:\d{2}[AP]M)\s*-\s*(\d{1,2}:\d{2}[AP]M)$/;
  const match = schedule.match(regex);
  if (!match) {
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
  if (!match) return null;
  
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