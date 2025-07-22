class Class{
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

    getSetComponents(components){
        this.components = components;
    }

}
class Component{
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

    toDateObject(text){
        const startDateComponents = text.split("/");
        const year = Number(startDateComponents[2]);
        const month = Number(startDateComponents[0]) - 1; // The date object has month range 0-11 (which i find weird)
        const day = Number(startDateComponents[1]);

        return new Date(year, month, day);
    }

    // get a Date object of when the first day of this component is
    getStart(){
        // const startDateComponents = this.getStartDate().split("/");
        // const year = Number(startDateComponents[2]);
        // const month = Number(startDateComponents[0]) - 1; // The date object has month range 0-11 (which i find weird)
        // const day = Number(startDateComponents[1]);

        // const startDate = new Date(year, month, day);
        const startDate = this.toDateObject(this.getStartDate());

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
        
        const timeStr = this.daysNTimes.match(/\b\d{1,2}:\d{2}(?:AM|PM)\b/g)[0];
        const match = timeStr.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

        let [_, hour, minute, period] = match;
        hour = parseInt(hour, 10);
        minute = parseInt(minute, 10);

        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;

        startDate.setHours(hour, minute, 0, 0);

        console.log(`hour ${hour}`);
        console.log(`minute ${minute}`);
        // TODO: Implement a getEnd() method;
        //       I think it's going to be the same thing as getEnd but just different time
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
        const startDate = this.toDateObject(this.getEndDate());

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
        
        const timeStr = this.daysNTimes.match(/\b\d{1,2}:\d{2}(?:AM|PM)\b/g)[1];
        const match = timeStr.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);

        let [_, hour, minute, period] = match;
        hour = parseInt(hour, 10);
        minute = parseInt(minute, 10);

        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;

        startDate.setHours(hour, minute, 0, 0);

        console.log(`hour ${hour}`);
        console.log(`minute ${minute}`);
        // TODO: Implement a getEnd() method;
        //       I think it's going to be the same thing as getEnd but just different time
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
            Sa: 6
        };

        return weekdayMap[this.daysNTimes.slice(0, 2)];
    }

}


function parseClass(text){

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
    console.log(components);
    return components;
}

function getAllClassNames(text){

    let lines = text.split(/[\n][\n\r]*/);

    // filter array, i.e get rid of empty strings and whitespaces/tabs
    lines = lines.filter(str => str.trim() != "");

    console.log(lines);
    // return new Set(text.match(/[A-Z]{3}\s\d{4}\s-\s.+/gm));
    const names = [];
    for(const line of lines){
        const match = line.match(/[A-Z]{3}\s\d{4}\s-\s.+/gm);
        if(match){
            names.push(match[0]);

        }
    }

    return names;
}




var data =
 `
Class Nbr	Section	Component	Days & Times	Room	Instructor	Start/End Date

5510
	
A03
	
Laboratory
	
Tu 2:30PM - 5:20PM
	
800 King Edward (STE) 0131
	
Miguel Garzon
	
09/03/2025 - 12/02/2025


3086
	
A04
	
Tutorial
	
Fr 5:30PM - 6:50PM
	
120 University (FSS) 1007
	
Miguel Garzon
	
09/03/2025 - 12/02/2025


1106
	
A00
	
Lecture
	
Tu 8:30AM - 9:50AM
	
800 King Edward (STE) A0150
	
Miguel Garzon
	
09/03/2025 - 12/02/2025


 
	 	
 
	
Fr 10:00AM - 11:20AM
	
800 King Edward (STE) A0150
	
To be Announced
	
09/03/2025 - 12/02/2025FLS 2772 - MIEUX PRON. COMM. EN FRA.

		
	
Status	Units	Grading	Grade	Deadlines

Enrolled
	
3.00
	
D (50%) Passing Grade
	
 
	

	
`;

let components = parseClass(data);

c = components[components.length - 1];
console.log(c);
// console.log(c.getEndDate());
console.log(c.getStart());
console.log();
console.log(c.getEnd());

// const fs = require("fs");

// fs.readFile('notes2.txt', 'utf8', (err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }

//     console.log(getAllClassNames(data));

// });

