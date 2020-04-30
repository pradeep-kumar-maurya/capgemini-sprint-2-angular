import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Payments{
  account_no:number;
  money_collected:number;
  seats_booked:number;
  seat_type:number;
  refund:number;
  date_of_transac:string;
  constructor(account_no, money_collected, seats_booked, seat_type, refund, date){
    this.account_no = account_no;
    this.money_collected = money_collected;
    this.seats_booked = seats_booked;
    this.seat_type = seat_type;
    this.refund = refund;
    this.date_of_transac = date;
  }
}

export class Ticket{
  no_of_seats:number;
  seat_name:string;
  booking_id:string;
  ticket_status:string;
  constructor(no_of_seats, seat_name, booking_id, ticket_status){
    this.booking_id = booking_id;
    this.no_of_seats = no_of_seats;
    this.seat_name = seat_name;
    this.ticket_status = ticket_status;
  }
}

export class BookingSlip{
  city:string;
  theatre:string;
  movie:string;
  show:string;
  timing:string;
  language:string;
  screen:string;
  seat_type:string;
  seats_booked:number;
  amount:number;
  constructor(city:string, theatre:string, movie:string, show:string, timing:string, language:string, screen:string, seat_type:string, seats_booked:number, amount:number){
    this.city = city;
    this.theatre = theatre;
    this.movie = movie;
    this.show = show;
    this.timing = timing;
    this.language = language;
    this.screen = screen;
    this.seat_type = seat_type;
    this.seats_booked = seats_booked;
    this.amount = amount;
  }
}

export class Customer{
  account_no:number;
  name:string;
  current_balance:number;
  username:string;
  password:string;
  constructor(account_no:number, name:string, current_balance:number, username:string, password:string){
    this.account_no = account_no;
    this.name = name;
    this.current_balance = current_balance;
    this.username = username;
    this.password = password;
  }
}

@Injectable({
  providedIn: 'root'
})

export class MovieServiceService {

  constructor(private http:HttpClient) { }

  public validation(uname:string, pass:string){
    return this.http.get("http://localhost:6564/authenticate/"+uname+"/"+pass,{responseType:'json'});
  }

  public cityNames(){
    return this.http.get("http://localhost:6565/cities",{responseType: 'json'});
  }

  public selectedCity(city_name:string){
    return this.http.get("http://localhost:6566/theatres/"+city_name,{responseType:'json'});
  }
  
  public selected_theatre(theatre_name:string){
    return this.http.get("http://localhost:6567/movies/"+theatre_name,{responseType:'json'});
  }

  public selected_movie(){
    return this.http.get("http://localhost:6568/shows",{responseType:'json'});
  }

  public selected_show(){
    return this.http.get("http://localhost:6568/languages",{responseType:'json'});
  }

  public selected_language(){
    return this.http.get("http://localhost:6570/seats",{responseType:'json'});
  }

  public check_account(accountNo){
    return this.http.get("http://localhost:6571/account_data/"+accountNo,{responseType:'json'});
  }
 
  public update_seats(seats){
    console.log(seats);
    return this.http.put("http://localhost:6570/update_seats",seats,{responseType:'text'});
  }

  public pay(payment:Payments){
    return this.http.post("http://localhost:6570/payments",payment,{responseType:'text'});
  }

  public update_customer(customer_details){
    return this.http.put("http://localhost:6571/update_account_data",customer_details,{responseType:'text'});
  }
}