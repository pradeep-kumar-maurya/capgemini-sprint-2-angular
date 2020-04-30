import { Component, OnInit } from '@angular/core';
import { MovieServiceService, Payments, BookingSlip, Ticket } from '../movie-service.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  username:string;
  password:string;

  auth:any;

  cities:any;

  theatres:any;

  movie_details:any;

  show_details:any;

  language_details:any;

  seats:any;

  dummySeats:any;

  no_of_seats:number;

  total_amount:number;

  accountNo:number;

  account_data:any;

  message:string;
  
  payments:Payments  = new Payments(0,0,0,"",0,"");

  payment_message:string;

  printdate:any;

  booking_slip:BookingSlip = new BookingSlip("","","","","","","","",0,0);

  tickets:Ticket = new Ticket(0,"",0,"");

  ticket_message:string;

  update_customer_message:string;

  check0:boolean = false;
  checkAuthentication0:boolean = true;
  checkAuthentication1:boolean = false;
  checkAuthentication2:boolean = false;
  checkTheatre:boolean = false;
  checkMovies:boolean = false;
  checkShows:boolean = false;
  checkLanguage: boolean = false;
  checkSeats: boolean = false;
  check:boolean= false;
  check1:boolean = false;
  check2:boolean = false;
  check3:boolean = false;
  check4:boolean = false;
  check5:boolean = false;

  constructor(private service:MovieServiceService) { 
    setInterval(()=>{
      let date = new Date();
      this.printdate = date.toLocaleDateString();
    },1000)
   }

  ngOnInit(): void {
  }

  validate(){
    this.service.validation(this.username, this.password).subscribe((data)=>this.auth=data);
    if(this.auth != null){
      this.service.cityNames().subscribe((data)=>this.cities=data);
      this.check0 = true;
      this.checkAuthentication1 = true;
      this.checkAuthentication2 = false;
      this.checkAuthentication0 = false;
    }
    else{
      this.checkAuthentication2 = true;
      this.checkAuthentication1 = false;
      this.check0 = false;
    }
  }

  selectCity(city_name:string){
    console.log(city_name)
    this.service.selectedCity(city_name).subscribe((data)=>this.theatres=data);
    this.booking_slip.city = city_name;
    this.checkTheatre = true;
  }

  selectTheatre(theatre_name:string){
    console.log(theatre_name)
    this.service.selected_theatre(theatre_name).subscribe((data)=>this.movie_details=data);
    this.booking_slip.theatre = theatre_name;
    this.checkMovies = true;
  }

  selectMovie(movie_name){
    console.log(movie_name)
    this.service.selected_movie().subscribe((data)=>this.show_details=data);
    this.booking_slip.movie = movie_name;
    this.checkShows = true;
  }

  selectShow(show, timing){
    console.log(show)
    this.service.selected_show().subscribe((data)=>this.language_details=data);
    this.booking_slip.show = show;
    this.booking_slip.timing = timing;

    this.checkLanguage = true;
  }

  selectLanguage(language,screen){
    console.log(language);
    this.service.selected_language().subscribe((data)=>this.seats=data);
    this.booking_slip.language = language;
    this.booking_slip.screen = screen;
    this.checkSeats = true;
  }

  chosenSeat(particular_seat_object:any){
    this.dummySeats = particular_seat_object;
    console.log(this.dummySeats.sno);
    console.log(this.dummySeats.seat_type);
    console.log(this.dummySeats.available_seats);
    console.log(this.dummySeats.price);
    //
    this.booking_slip.seat_type = this.dummySeats.seat_type;
    //
    this.tickets.seat_name = this.dummySeats.seat_type;
    //
    this.check = true;
  }

  no_of_seats_selected(){
    if(this.no_of_seats > 0 && this.no_of_seats <= this.dummySeats.available_seats && !isNaN(this.no_of_seats))
    {
      console.log(this.no_of_seats);
    
    this.total_amount = this.dummySeats.price * this.no_of_seats;
    //
    this.booking_slip.seats_booked = this.no_of_seats;
    //
    this.tickets.no_of_seats = this.no_of_seats;
    //
    this.check1 = true;
    this.check5 = false;
    }
    else{
      console.log(this.no_of_seats);
      this.check5 = true;
      this.check1 = false;
    }
  }

  entered_accountNo(){
    if(this.accountNo > 999 && this.accountNo < 10000 && !isNaN(this.accountNo))
    {
    this.service.check_account(this.accountNo).subscribe((data)=>this.account_data=data);
    if(this.account_data != null)
    {
      if(this.account_data.current_balance < this.dummySeats.price){
        this.check2 = true;
        this.check3 = false;
        this.check4 = false;
      }
      else if(this.account_data.current_balance - this.total_amount < 0){
        this.check2 = true;
        this.check3 = false;
        this.check4 = false;
      }
      else{
        this.check3 = true;
        this.check2 = false;
        this.check4 = false;
        this.payments.account_no = this.accountNo;
        this.payments.money_collected = this.total_amount;
        //
        this.booking_slip.amount = this.total_amount;
        //
        this.account_data.current_balance = this.account_data.current_balance - this.total_amount;
        //
        this.payments.refund = 0;
        this.payments.seat_type = this.dummySeats.seat_type;
        this.payments.seats_booked = this.no_of_seats;
        this.payments.date_of_transac= this.printdate;
        this.service.pay(this.payments).subscribe((data)=>this.payment_message=data);
        //
        this.tickets.ticket_status = "booked";
        this.tickets.booking_id = this.payment_message;
        //
        this.dummySeats.available_seats = this.dummySeats.available_seats - this.no_of_seats;
        this.service.update_seats(this.dummySeats).subscribe((data)=>this.message=data);
        //
        this.service.update_customer(this.account_data).subscribe((data)=>this.update_customer_message=data);
        //this.service.add_ticket(this.tickets).subscribe((data)=>this.//ticket_message=data);
      }
    }
  }
    else{
      this.checkAuthentication1 = false;
      this.check4 = true;
      this.check3 = false;
      this.check2 = false;
    }
  }
}