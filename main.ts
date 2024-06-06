#! /usr/bin/env node


import inquirer from "inquirer";
import chalk from "chalk";

class userDetail {
  fullName: string;
  email: string;
  password: string;
  constructor(name: string, email: string, number: string) {
    this.fullName = name;
    this.email = email;
    this.password = number;
  }

}

class adminDetail {
  fullName: string;
  email: string;
  password: string;

  constructor(name: string, email: string, number: string) {
    this.fullName = name;
    this.email = email;
    this.password = number;
  }
}
let admin = new adminDetail(
  "Alishba wajahat",
  "alishbawajahat867@gmail.com",
  "1234"
);
let users: userDetail[] = [];
console.log(admin);

class Event {
  constructor(
    public eventName: string,
    public venue: string,
    public timings: string,
    public date: string,
    public noOfTickets: number,
    public priceOfTicket: number
  ) {}
  boughtTickets = 0;
  totalBill = 0;
  buyTickets(tickets: number) {
    this.boughtTickets = tickets;
    this.noOfTickets -= this.boughtTickets;
    this.totalBill = this.boughtTickets * this.priceOfTicket;
    console.log(`Your total bill is ${this.totalBill}`);
  }
  viewTickets() {
    if (this.boughtTickets === 0) {
      console.log(chalk.red(`You have no tickets for this event`))
    } else {
      console.log(`QUANTITY:${this.boughtTickets} , EVENT:${this.eventName}`);
    }
  }
  cancelTickets(ticketsToCancel: number) {
    if (ticketsToCancel > this.boughtTickets) {
      console.log(
        `You have only ${this.boughtTickets} tickets & you are giving a greater number!`
      );
    } else if(ticketsToCancel>=5){
      let deducted=ticketsToCancel*this.priceOfTicket;
      this.totalBill-=deducted;
      let paidAmount=this.totalBill+1000;
      let returnedAmount=deducted-1000;
      this.boughtTickets -= ticketsToCancel;
      console.log(chalk.redBright(`Cancelling more than 5 tickets deducts 1000rs from your amount to be returned!`));
      console.log(chalk.yellowBright(`Now ${returnedAmount} has been returned after deduction of 1000rs , and your paid amount is ${paidAmount}`));
    }
    
    
    else {
      this.boughtTickets -= ticketsToCancel;
      this.noOfTickets+=ticketsToCancel;
      this.totalBill-=ticketsToCancel*this.priceOfTicket;
      console.log(
        `You've cancelled ${ticketsToCancel} tickets & and now ${this.boughtTickets} are left!`
      );
      console.log(`${ticketsToCancel*this.priceOfTicket} has been returned to you & your paid amount is ${this.totalBill}`);
      
    }
  }

  billing(amount: number) {
    if (amount !== this.totalBill) {
      console.log(chalk.red(`You entered wrong amount`));
      this.noOfTickets += this.boughtTickets;
    } else {
      console.log(`Your payment has successfully done , see you at event!`);
    }
  }
}
let eventsList: Event[] = [];

function userExists(username: string, email: string,password:string): boolean {
  for (const user of users) {
    if ((user.fullName === username && user.email === email)&&user.password===password) {
      return true;
    }
  }
  return false;
}
function isAdmin(username: string, email: string,password:string) {
  if (
    (username === admin.fullName && email === admin.email)&& password===admin.password) {
    return true;
  }
  return false;
}

console.log(chalk.blue.bold(`WELCOME TO MY ONLINE TICKETING SYSTEM..`));

var condition = true;
while (condition) {
  let question0 = await inquirer.prompt({
    message: "What do you want to do?",
    type: "list",
    name: "Move",
    choices: [
      "Already have an account-LOGIN",
      "Create an account-SIGNUP",
      "Exit",
    ],
  });
  if (question0.Move === "Create an account-SIGNUP") {
    var question1 = await inquirer.prompt([
      {
        message: "Enter your Full Name?",
        type: "string",
        name: "Name",
      },
      {
        message: "Enter your Email?",
        type: "string",
        name: "email",
      },
      {
        message: "Enter your Password?",
        type: "password",
        name: "Number",
      },
    ]);

    var user1 = new userDetail(
      question1.Name,
      question1.email,
      question1.Number
    );
    if (userExists(question1.Name, question1.email,question1.Number)) {
      console.log(chalk.red(`You already have an account , log in!`));
    } else if (isAdmin(question1.Name, question1.email,question1.Number)) {
      console.log(`You are admin so why create an account? Go login!`);
    } else {
      users.push(user1);
      console.log(
        chalk.yellowBright(`Your account has been created successfullly!`)
      );
    }
  } else if (question0.Move === "Exit") {
    console.log(chalk.blueBright(`HOPE TO SEE YOU SOON AGAIN!`));
    process.exit();
  } else if (question0.Move === "Already have an account-LOGIN") {
    var question2 = await inquirer.prompt([
      {
        message: "Enter your Full Name?",
        type: "string",
        name: "Name",
      },
      {
        message: "Enter your Email?",
        type: "string",
        name: "email",
      },
      {
        message: "Enter your Password?",
        type: "password",
        name: "Number",
      },
    ]);

    if (
      userExists(question2.Name, question2.email,question2.Number)
    ) {
      console.log(`You are logged in your account.`);

      var condition2 = true;

      while (condition2) {
        let question4 = await inquirer.prompt({
          message: "What do you want to do?",
          type: "list",
          name: "option",
          choices: [
            "View Events details",
            "Buy tickets",
            "View my tickets",
            "Cancel my ticket",
            "Log Out",
          ],
        });
        if (question4.option === "View Events details") {
          if (eventsList.length === 0) {
            console.log(chalk.red(`There are no scheluded events for now!`));
          } else {
            let question3 = await inquirer.prompt({
              message: chalk.green("Select event to see details."),
              type: "list",
              choices: eventsList.map((val) => ({
                name: val.eventName,
                value: val,
              })),
              name: "Event",
            });
            let selectedEvent = question3.Event;
            const{boughtTickets,totalBill,...display}=selectedEvent;
            console.table([display]);
          }
        } else if (question4.option === "Buy tickets") {
          if (eventsList.length === 0) {
            console.log(chalk.red(`There are no scheluded events for now!`));
          } else {
            let question5 = await inquirer.prompt([
              {
                message: chalk.green("Select event to buy ticket."),
                type: "list",
                choices: eventsList.map((val) => ({
                  name: val.eventName,
                  value: val,
                })),
                name: "Event",
              },
              {
                message: chalk.green("How many tickets do you want to purchase?"),
                type: "number",
                name: "tickets",
              },
              {
                message: chalk.green("Select payment method."),
                type: "list",
                name: "method",
                choices: ["Google Pay", "Money Gram", "Bank transfer"],
              },
            ]);
            let selectedEvent = question5.Event;
            if (selectedEvent.noOfTickets === 0) {
              console.log(chalk.redBright(`Sorry! tickets are finished for this event.`));
            } else if (question5.tickets > selectedEvent.noOfTickets) {
              console.log(chalk.redBright(`Insufficient tickets`));
            } else {
              selectedEvent.buyTickets(question5.tickets);

              let question6 = await inquirer.prompt({
                message: chalk.green("Enter that amount"),
                type: "number",
                name: "amount",
              });
              selectedEvent.billing(question6.amount);
            }
          }
        } else if (question4.option === "View my tickets") {
          if (eventsList.length === 0) {
            console.log(
              chalk.red(
                `You've not made any purchase yet as there is no event scheduled!`
              )
            );
          } else {
            let questionb = await inquirer.prompt([
              {
                message: chalk.green("Select event to view ticket."),
                type: "list",
                choices: eventsList.map((val) => ({
                  name: val.eventName,
                  value: val,
                })),
                name: "Event",
              },
            ]);
            let selectedEvent = questionb.Event;
            selectedEvent.viewTickets();
          }
        } else if (question4.option === "Cancel my ticket") {
          if (eventsList.length === 0) {
            console.log(
              chalk.red(
                `You've not made any purchase yet as there is no event scheduled!`
              )
            );
          } else {
            let questionc = await inquirer.prompt([
              {
                message: chalk.green("Select event to cancel ticket."),
                type: "list",
                choices: eventsList.map((val) => ({
                  name: val.eventName,
                  value: val,
                })),
                name: "Event",
              },])
              let selectedEvent = questionc.Event;
              if (selectedEvent.boughtTickets === 0) {
                console.log(chalk.red(`You have no tickets for this event`));
              } else{
                let questiond=await inquirer.prompt(
                  {
                    message: chalk.green("How many tickets do you want to cancel?"),
                    type: "number",
                    name: "ticket",
                  }
                )
  
              ;
              selectedEvent.cancelTickets(questiond.ticket);
            }
              }


        } else {
          console.log(chalk.blueBright(`You are logged out!`));
        }

        if(question4.option ==="Log Out"){condition2 = false;}
        
      }
    }

    else if (isAdmin(question2.Name, question2.email,question2.Number)) {
      console.log(`You are logged in as admin!`);
      var condition1 = true;
      while (condition1) {
        let question7 = await inquirer.prompt({
          message: "What do you want to do?",
          type: "list",
          choices: [
            "Create Event",
            "Edit event details",
            "View Event Details",
            "Delete event",
            "Log Out",
          ],
          name: "adminWork",
        });
        if (question7.adminWork === "Create Event") {
          let question8 = await inquirer.prompt([
            {
              message: chalk.green("What is your event name?"),
              name: "EventName",
              type: "string",
            },
            {
              message: chalk.green("Choose your venue."),
              name: "venue",
              type: "string",
            },
            {
              message: chalk.green("What will be the timing of event"),
              name: "timing",
              type: "string",
            },
            {
              message: chalk.green("Decide your event date."),
              name: "date",
              type: "string",
            },
            {
              message: chalk.green("How many tickets will be availaible?"),
              type: "number",
              name: "ticket",
            },
            {
              message: chalk.green("What will be the price of your ticket?"),
              type: "number",
              name: "price",
            },
          ]);

          var event = new Event(
            question8.EventName,
            question8.venue,
            question8.timing,
            question8.date,
            question8.ticket,
            question8.price
          );

          eventsList.push(event);
          console.log(
            chalk.yellowBright(`Your event has been scheduled & published!`)
          );
        } else if (question7.adminWork === "Edit event details") {
          if (eventsList.length === 0) {
            console.log(chalk.red(`There are no scheluded events for now!`));
          } else {
            let question9 = await inquirer.prompt({
              message: chalk.green("Select the event you want to edit?"),
              type: "list",
              name: "edit",
              choices: eventsList.map((val) => ({
                name: val.eventName,
                value: val,
              })),
            });
            let selectedEventToEdit = question9.edit;
            let question10 = await inquirer.prompt([
              {
                message: chalk.green("What do you want to edit?"),
                type: "list",
                name: "data",
                choices: [
                  "EventName",
                  "venue",
                  "timing",
                  "date",
                  "ticket",
                  "price",
                ],
              },
              {
                message: chalk.green("Enter your new data"),
                type: "input",
                name: "newData",
              },
            ]);
            // Update the selected event based on the chosen field
            switch (question10.data) {
              case "EventName":
                selectedEventToEdit.eventName = question10.newData;
                break;
              case "venue":
                selectedEventToEdit.venue = question10.newData;
                break;
              case "timing":
                selectedEventToEdit.timings = question10.newData;
                break;
              case "date":
                selectedEventToEdit.date = question10.newData;
                break;
              case "ticket":
                selectedEventToEdit.noOfTickets = question10.newData;
                break;
              case "price":
                selectedEventToEdit.priceOfTicket = question10.newData;
                break;
            }

            console.log(`Your ${question10.data} has been updated.`);
          }
        } else if (question7.adminWork === "View Event Details") {
          if (eventsList.length === 0) {
            console.log(chalk.red(`There are no scheluded events for now!`));
          } else {
            let question13 = await inquirer.prompt({
              message: chalk.green("Which event details do you want to view?"),
              type: "list",
              name: "View",
              choices: eventsList.map((val) => ({
                name: val.eventName,
                value: val,
              })),
            });
            var eventToView = question13.View;
            const{boughtTickets,totalBill,...display}=eventToView
            console.table([display]);
          }
        } else if (question7.adminWork === "Delete event") {
          if (eventsList.length === 0) {
            console.log(chalk.red(`There are no scheluded events for now!`));
          } else {
            let question14 = await inquirer.prompt({
              message: chalk.green("Which event do you want to delete?"),
              type: "list",
              name: "View",
              choices: eventsList.map((val) => ({
                name: val.eventName,
                value: val,
              })),
            });
            let eventToDelete = question14.View;
            let index = eventsList.indexOf(eventToDelete);
            eventsList.splice(index, 1);
            console.log(`Your event has deleted.`);
          }
        } else {
          console.log(chalk.blueBright(`You are logged out!`));
          
        }

        if(question7.adminWork ==="Log Out"){condition1=false};
      }}
      else {
        console.log(
          chalk.red(`You are not an existing user!,Create an account first.`)
        );
      } }
      
        
}


