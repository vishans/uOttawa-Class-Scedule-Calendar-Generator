class Component{
    constructor(number, section, component, daysNTimes, room, instructor, startEndDate){
        this.number = number;
        this.section = section;
        this.component = component;
        this.daysNTimes = daysNTimes;
        this.room = room;
        this.instructor = instructor;
        this.startEndDate = startEndDate;
    }
}


function parseClass(text){

    // split text in lines
    let lines = text.split(/[\n][\n\r]*/);

    // filter array, i.e get rid of empty strings and whitespaces/tabs
    lines = lines.filter(str => str.trim() != "");

    console.log(lines);


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

parseClass(data);