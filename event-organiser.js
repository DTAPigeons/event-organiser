var eventUtil = {
    events : [],
    CreatEvent: function(id, name, isRestriced=false){
        if(!id || !name || typeof name!=='string'){
            console.log("Invalid event");
            return;
        }
        var newEvent = {
            id : "",
            name: "",
            isRestriced: false,
            GetRestrictionString: function(){
                if(this.isRestriced) return "+18";
                return "Everyone"
            },
            visitors:[]
        };

        newEvent.id = id;
        newEvent.name = name;
        newEvent.isRestriced = isRestriced;

        this.events.push(newEvent);
    },

    DisplayEvents: function(){
        this.events.forEach(function(event){

            console.log(event.id+" "+event.name+" "+event.GetRestrictionString());
        });
    },

    DeleteEventById: function(id){    
        var indexToDelete = this.events.findIndex(event=>event.id==id);
        if(indexToDelete>-1) this.events.splice(indexToDelete,1);
        else console.log("Invalid event");
    },

    EditEvent: function(id, name, isRestriced=false){
        var indexToEdit = this.events.findIndex(event=>event.id==id);
        if(indexToEdit<0 || !name|| typeof name!=='string') {
            console.log("Invalid Event");
            return;
        }
        var oldEvent = this.events[indexToEdit];
        console.log("Event "+oldEvent.name+" "+
        oldEvent.GetRestrictionString()+", changed to ");
        this.events[indexToEdit].name = name;
        this.events[indexToEdit].isRestriced = isRestriced;
        
        console.log( this.events[indexToEdit].name
         +" "+ this.events[indexToEdit].GetRestrictionString())
    },

    AddVisitorToEvent: function(eventId, visitorName, visitorIsMale, vistorAge){
        var indexOfEvent = this.events.findIndex(event=>event.id==eventId);
        if(indexOfEvent<0 || !visitorName|| typeof visitorName!=='string' 
        || typeof visitorIsMale === 'undefined' || vistorAge<=0){
            console.log("Invalid Data");
            return;
        }

        var newVisitor = {
            name: "visitorName",
            isMale: false,
            age: 1,
            GetGender: function(){
                if(this.isMale) return "male";
                return "female"
            }
        }
        
        newVisitor.name = visitorName;
        newVisitor.isMale = visitorIsMale;
        newVisitor.age = vistorAge;

        var event = this.events[indexOfEvent];

        if(event.isRestriced && newVisitor.age<18){
            console.log("Minors cannot visit restricted events! "+
            "Visitor: " + visitorName + " Age" + vistorAge
            )
            return;
        }

        event.visitors.push(newVisitor);
    },

    DisplayVisitorsOfEventByEventId: function(eventId, showMales = true, showFemales = true){
        var indexOfEvent = this.events.findIndex(event=>event.id==eventId);
        if(indexOfEvent<0){
            console.log("Invalid Data");
        }
        
        this.events[indexOfEvent].visitors.forEach(
            function(visitor){
                var showVistor = (showMales && visitor.isMale) || (showFemales && !visitor.isMale);
                if(showVistor) console.log(visitor.name+" "+visitor.age+" "+visitor.GetGender())
        })
    },

    DeleteVisitorWithNameFromEventWithId: function(visitorName,eventId){
        var indexOfEvent = this.events.findIndex(event=>event.id==eventId);
        if(indexOfEvent<0){
            console.log("Invalid Data");
            return;
        }
        var event = this.events[indexOfEvent];
        var indexOfVisitor = this.events[indexOfEvent].visitors.findIndex(visitor=>visitor.name==visitorName);
        if(indexOfVisitor<0){
            console.log("Invalid Data");
            return;
        }

        event.visitors.splice(indexOfVisitor,1);
    }
}

//Създаване на нови събития и съхранението им в колекция
eventUtil.CreatEvent("1234","Да построим на бай Генчо нова барака");
eventUtil.CreatEvent("666","Сатанически бал", false);
eventUtil.CreatEvent("69","Сатаническа оргия след бала", true);
eventUtil.CreatEvent("Сатаническа оргия след бала", true);
eventUtil.CreatEvent("69","", true);

//Извежда всички вече съхранени събития
eventUtil.DisplayEvents();
/*
console.log("===========================================")
//Изтриване на събитие по id
eventUtil.DeleteEventById("666");

eventUtil.DisplayEvents();
console.log("===========================================")
//Актуализира събитие по уникален идентификатор
eventUtil.EditEvent("1234","Да полеем на бай Генчо новата барака");
eventUtil.EditEvent("123","Да полеем на бай Генчо новата барака", true);
eventUtil.EditEvent("666");

eventUtil.DisplayEvents();
*/
console.log("===========================================")
//Добавяне на клиенти към събитие
eventUtil.AddVisitorToEvent("69","Cobrata16",true,16);
eventUtil.AddVisitorToEvent("69","Zmeya",true,22);
eventUtil.AddVisitorToEvent("69","XXXKilerXXX",true,23);
eventUtil.AddVisitorToEvent("69","Alice",false,22);
eventUtil.AddVisitorToEvent("691","Zmeya",true,22);
console.log("===========================================")
//Извеждане на всички посетители на събитие
eventUtil.DisplayVisitorsOfEventByEventId("69");
console.log("===========================================")
eventUtil.DisplayVisitorsOfEventByEventId("69",true,false);
console.log("===========================================")
eventUtil.DisplayVisitorsOfEventByEventId("69",false,true);
console.log("===========================================")

//Изтриване на посетител от събитие
eventUtil.DeleteVisitorWithNameFromEventWithId("Zmeyda","691");
eventUtil.DeleteVisitorWithNameFromEventWithId("Zmeya","69");
eventUtil.DisplayVisitorsOfEventByEventId("69");
console.log("===========================================")

