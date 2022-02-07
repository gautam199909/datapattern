const { _DBG_set_checkMethod } = require('readline-sync');
const readline = require('readline-sync');

const items = ['banana' , 'blood' , 'ink' , 'frog' , 'sky' , 'salt' ,'apple' ];
const colors = {
    'green' : ['banana','apple'],
    'yellow' : ['banana' , 'frog'],
    'red' : ['blood','ink','apple'],
    'black' : ['ink','sky'],
    'white' : ['salt'],
    'blue' :['frog','sky']
};



const checkUserCommand = (userCommand) =>{

     if(userCommand[0] === '+'){
         userCommand = userCommand.substring(1);
         return items.includes(userCommand)? 0 : 5;
     }
     else if(userCommand[0] === '-'){
         userCommand = userCommand.substring(1);
         return items.includes(userCommand)? 1 : 5;
     }
     else if(userCommand === 'list' )
        return 2;
     else if(userCommand === 'exit')
        return 3;
     else{
         return colors.hasOwnProperty(userCommand)? 4 : 5;
     }
}

class Item{

    printItemStatement() {}

}

class Banana extends Item{

    printItemStatement(color){
        console.log(`I'm Banana! I'm sometimes ${color}`);
    }

}

class Blood extends Item{

    printItemStatement(color){
        console.log(`I'm Blood! I'm sometimes ${color}`);
    }
}

class Ink extends Item{

    printItemStatement(color){
        console.log(`I'm Ink! I'm sometimes ${color}`);
    }
}

class Frog extends Item{

    printItemStatement(color){
        console.log(`I'm Frog! I'm ${color} today`);
    }
}

class Sky extends Item{

    printItemStatement(color){
        console.log(`I'm Sky! I'm sometimes ${color}`);
    }
}

class Salt extends Item{

    printItemStatement(color){
        console.log(`I'm Salt! I'm sometimes ${color}`);
    }
}

class Apple extends Item{

    printItemStatement(color){
        console.log(`I'm Apple! I'm sometimes ${color}`);
    }
}


const availableItems = {
    banana: Banana,
    blood : Blood,
    ink:Ink,
    frog:Frog,
    sky:Sky,
    salt:Salt,
    apple:Apple
}


class ItemFactory{

    makeItem(item){
        let buildItem =new availableItems[item]();
        return buildItem;
    }

}


class Event
{
    constructor(){
        this.handlers = new Map();
        this.itemFactory = new ItemFactory();
    }

    subscribe(handler){
        this.handlers.set(handler,true);
    }

    unsubscribe(handler){
        this.handlers.delete(handler);
    }

    printSubscribedItem(){
        for(const [key,value] of this.handlers.entries()){
            console.log(key , ' ');
        }
    }

    fire(color){
        
        for(const item of colors[color]){

            if(this.handlers.has(item)){
               const buildItem =  this.itemFactory.makeItem(item);
                buildItem.printItemStatement(color);
            }

        }
    }
};



const start = () =>{ 

    const startEvent = new Event();
    let userCommand;

    while(userCommand!='exit'){

        console.log("Enter User Input: ");
        userCommand = readline.question();

        switch(checkUserCommand(userCommand)){
            case 0:
                startEvent.subscribe(userCommand.substring(1));
                break;
            case 1:
                startEvent.unsubscribe(userCommand.substring(1));
                break;
            case 2:
                startEvent.printSubscribedItem();
                break;
            case 3:
                userCommand = 'exit';
                break;
            case 4:
                startEvent.fire(userCommand);
                break;
            case 5:
                console.log('Invalid user input');
                break;
        }

    }

}


start();







 