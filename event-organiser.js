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
                if(isRestriced) return "+18";
                return "Everyone"
            }
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
    }
}

eventUtil.CreatEvent("1234","Да построим на бай Генчо нова барака");
eventUtil.CreatEvent("666","Сатанически бал", false);
eventUtil.CreatEvent("69","Сатаническа оргия след бала", true);
eventUtil.CreatEvent("Сатаническа оргия след бала", true);
eventUtil.CreatEvent("69","", true);

eventUtil.DisplayEvents();

eventUtil.DeleteEventById("666");

eventUtil.DisplayEvents();
eventUtil.EditEvent("1234","Да полеем на бай Генчо новата барака");
eventUtil.EditEvent("123","Да полеем на бай Генчо новата барака", true);
eventUtil.EditEvent("666");

eventUtil.DisplayEvents();
