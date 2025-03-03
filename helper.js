function getCompontType(block){
    // Returns a string like 'Lecture', 'Tutorial', etc..
    const regex = /\d{4}\s*[A-Z]\d{2}\s*([A-Z]\w*)/gm;
    const match = regex.exec(block);

    return match[1];

}

function getSection(block){
    // Returns a string like A00 or like B01 etc .. 
    const regex = /\d{4}\s*([A-Z]\d{2})\s*[A-Z]\w*/gm;
    const match = regex.exec(block);

    return match[1];

}

function getClassNumber(block){
    // Returns a string like 2042 
    const regex = /(\d{4})\s*[A-Z]\d{2}\s*[A-Z]\w*/gm;
    const match = regex.exec(block);

    return match[1];

}

// ---- whole classes from block
//      lectures, tutorials, lab etc..
function getClasses(block){
    // Returns a list of class blocks 
    // Each block contains info like Date and Time, Room. Instructor, Start and End date
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = block.match(regex);

    return match;
}
// ----


// ---- to extract info from each class 
//      like extract info from lecture or lab

// The getClassX functions are meant to be used on class blocks
// to extract specific info
function getClassDT(cls){
    
    const regex = /([A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;

    const match = regex.exec(cls);

    return match[1];
}

function parseScheduleLine(schedule) {
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

function parseDateRange(rangeStr) {
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

function getClassLocation(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(.*)\s*(?:.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

function parseLocation(str) {
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

function getClassInstructor(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(.*)\s*(?:\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

function getClassStartEnd(cls){
    const regex = /(?:[A-Z]\w.*\-.*)\s*(?:.*)\s*(?:.*)\s*(\d{2}\/\d{2}\/\d{4}\s*\-\s*\d{2}\/\d{2}\/\d{4})/gm;
    const match = regex.exec(cls);

    return match[1];
}

// ---- 

