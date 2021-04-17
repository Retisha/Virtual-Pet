var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var fed, lastFed;
var feedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(900,95);
  feedTheDog.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  feedTime=database.ref('FeedTime');
  feedTime.on("value",readTime);
  fill("yellow")
  //write code to read fedtime value from the database 
  if(lastFed>=12){
    text('Last Fed :  '+lastFed%12 + "PM",350,50)
  }
  else if(lastFed==0){
    text('Last Fed : 12 AM',350,30)
  }
  else{
    text("Last feed :"+lastFed+ " AM",350,50)
  }
    //write code here to update food stock and last fed time
  
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

var food_stock_val = foodObj.getFoodStock();
if(food_stock_val <= 0){
  foodObj.updateFoodStock(food_stock_val *0)
}
else{
  foodObj.updateFoodStock(food_stock_val -1)
}

database.ref("/").update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readTime(data){
  lastFed=data.val();
  
}
