import kopiSusuImg from '../assets/kopi-susu.WebP'
import cappuccinoImg from '../assets/cappuccino.WebP'
import croissantImg from '../assets/croissant.WebP'
import americanoImg from '../assets/americano.WebP'
import espressoImg from '../assets/espresso.WebP'
import latteImg from '../assets/latte.WebP'
import vietnamdripImg from '../assets/vietnamdrip.WebP'
import caramelmacchiatoImg from '../assets/caramelmacchiato.WebP'
import mochaImg from '../assets/mocha.WebP'
import affogatoImg from '../assets/affogato.WebP'
import kopitubrukImg from '../assets/kopitubruk.WebP'
import longblackImg from '../assets/longblack.WebP'
import eskopipandanImg from '../assets/eskopipandan.WebP'
/*Menu Non Kopi*/
import matchalatteImg from '../assets/matchalatte.WebP'
import chocolateImg from '../assets/chocolate.WebP'
import redvelvetImg from '../assets/redvelvet.WebP'
import tarolatteImg from '../assets/tarolatte.WebP'
import lemonteaImg from '../assets/lemontea.WebP'
import strawberryyakultImg from '../assets/strawberryyakult.WebP'
import mineralImg from '../assets/mineral.WebP'
import thaiteaImg from '../assets/thaitea.WebP'
import milkteaImg from '../assets/milktea.WebP'
import lycheeteaImg from '../assets/lycheetea.WebP'
/*Menu makanan*/
import frenchfriesImg from '../assets/frenchfries.WebP'
import chickenwingsImg from '../assets/chickenwings.WebP'
import beefburgerImg from '../assets/beefburger.WebP'
import CarbonaraImg from '../assets/carbonara.WebP'
import nasigorengImg from '../assets/nasigoreng.WebP'
import clubsandwichImg from '../assets/clubsandwich.WebP'
import waffleImg from '../assets/waffle.WebP'
import donutImg from '../assets/donut.WebP'
import bananabreadImg from '../assets/bananabread.WebP'
import CheesecakeImg from '../assets/cheesecake.WebP'
import tiramisuImg from '../assets/tiramisu.WebP'
import pisanggorengImg from '../assets/pisanggoreng.WebP'



export const coffeeMenu = [
  { id: 1, name: "Espresso", price: 15000, subcategory: "kopi-hitam", image: espressoImg },
  { id: 2, name: "Americano", price: 18000, subcategory: "kopi-hitam", image: americanoImg },
  { id: 3, name: "Cappuccino", price: 22000, image: cappuccinoImg, subcategory: "kopi-susu" },
  { id: 4, name: "Latte", price: 22000, subcategory: "kopi-susu", image: latteImg },
  { id: 5, name: "Kopi Susu Gula Aren", price: 18000, image: kopiSusuImg, subcategory: "kopi-susu" },
  { id: 6, name: "Vietnam Drip", price: 20000, subcategory: "kopi-hitam", image: vietnamdripImg },
  { id: 7, name: "Caramel Macchiato", price: 25000, subcategory: "kopi-susu", image: caramelmacchiatoImg },
  { id: 8, name: "Mocha", price: 25000, subcategory: "kopi-susu", image: mochaImg },
  { id: 9, name: "Affogato", price: 28000, subcategory: "kopi-dessert", image: affogatoImg },
  { id: 10, name: "Kopi Tubruk", price: 12000, subcategory: "kopi-hitam", image: kopitubrukImg },
  { id: 11, name: "Long Black", price: 18000, subcategory: "kopi-hitam", image: longblackImg },
  { id: 12, name: "Es Kopi Pandan", price: 22000, subcategory: "kopi-susu", image: eskopipandanImg },
]

export const nonCoffeeMenu = [
  { id: 1, name: "Matcha Latte", price: 25000, image: matchalatteImg, subcategory: "latte-nonkopi" },
  { id: 2, name: "Chocolate", price: 22000, image: chocolateImg, subcategory: "latte-nonkopi" },
  { id: 3, name: "Red Velvet", price: 23000, image:redvelvetImg, subcategory: "latte-nonkopi" },
  { id: 4, name: "Taro Latte", price: 23000, image:tarolatteImg, subcategory: "latte-nonkopi" },
  { id: 5, name: "Lemon Tea", price: 15000, image:lemonteaImg, subcategory: "teh-buah" },
  { id: 6, name: "Strawberry Yakult", price: 20000, image: strawberryyakultImg, subcategory: "teh-buah" }, 
  { id: 7, name: "Mineral Water", price: 8000, image: mineralImg, subcategory: "air-mineral" },
  { id: 8, name: "Thai Tea", price: 20000, image: thaiteaImg, subcategory: "teh-susu" },
  { id: 9, name: "Milk Tea", price: 20000, image: milkteaImg, subcategory: "teh-susu" },
  { id: 10, name: "Lychee Tea", price: 18000, image: lycheeteaImg, subcategory: "teh-buah" },
]

export const foodMenu = [
  { id: 1, name: "Croissant", price: 25000, image: croissantImg, subcategory: "pastry-manis" },
  { id: 2, name: "French Fries", price: 18000, image: frenchfriesImg, subcategory: "camilan-gurih" },
  { id: 3, name: "Chicken Wings", price: 28000, image: chickenwingsImg, subcategory: "camilan-gurih" },
  { id: 4, name: "Beef Burger", price: 35000, image: beefburgerImg, subcategory: "makanan-berat" },
  { id: 5, name: "Spaghetti Carbonara", price: 32000, image: CarbonaraImg, subcategory: "makanan-berat" },
  { id: 6, name: "Nasi Goreng", price: 28000, image: nasigorengImg, subcategory: "makanan-berat" },
  { id: 7, name: "Club Sandwich", price: 27000, image: clubsandwichImg, subcategory: "camilan-gurih" },
  { id: 8, name: "Waffle", price: 25000, image: waffleImg, subcategory: "camilan-manis" },
  { id: 9, name: "Donut", price: 12000, image: donutImg, subcategory: "camilan-manis" },
  { id: 10, name: "Banana Bread", price: 20000, image: bananabreadImg, subcategory: "pastry-manis" },
  { id: 11, name: "Cheesecake", price: 30000, image: CheesecakeImg, subcategory: "pastry-manis" },
  { id: 12, name: "Tiramisu", price: 32000, image: tiramisuImg, subcategory: "pastry-manis" },
  { id: 13, name: "Pisang Goreng", price: 15000, image: pisanggorengImg, subcategory: "camilan-manis" },
]