var element = $('nav ul');
$('#nav-button').on('click',function(){
  $('#toggle-menu').slideToggle('slow');
});


//THE GRID

//you dont know how many card/children the grid will have, so you need to
//find  out how many are they, and the height the will waste in the layout

//other thing to have in consideration is the media-query. Up to them you
//will have -->
//1 column(in this case you dont need to do this, all will rely in FLex design)
//2 columns
//3 columns
//4 columns...
//the amount of columns will represent how many elements/cards/children we will
//check to get the bigest one. In other words it has to do with rows
let grid = $("#grid");
let children = grid.children();
let rows = Math.ceil(children.length / 3);
console.log("CHILDRENS");
console.log(children);

var auxHeight = Math.ceil($(this).height() * rows);
console.log("This is the auxHeight for the container "+auxHeight);

var repetitions = Math.ceil(auxHeight / 10);/*10px*/
console.log("Auxrepetitions "+repetitions);
grid.css(`grid-template-rows`,`repeat(${repetitions},10px)`);

///giving the class to all my elements/cards
for (let i = 0; i < children.length; i++) {
  $(`#grid`).children().eq(i).attr('id',`card-${i+1}`);
}


let c1=0;
let c2=0;
let c3=0;

for (let i = 0; i < children.length; i++) {
  let Xcardx = $(`#grid div#card-${i+1}`);
  var finalResultx = Xcardx["0"]['scrollHeight'] + Xcardx.outerHeight();

  if(isTheSmallestOne(c1,c2,c3,i)){
    //c1 += children[i]['scrollHeight'];
    c1 += finalResultx;
  }
  else if(isTheSmallestOne(c2,c1,c3,i)){
    //c2 += children[i]['scrollHeight'];
    c2 += finalResultx;
  }
  else{
    //c3 += children[i]['scrollHeight'];
    c3 += finalResultx;
  }
}
console.log(`c1:${c1}  c2:${c2}  c3:${c3}`);

let gridHeight = Math.max(Math.max(c3,c2),c1);
console.log(`the height of the grid is ${gridHeight}`);
//********************************************************
//sending the value back to CSS
//********************************************************
repetitions = Math.ceil(gridHeight / 10);/*10px*/
console.log(repetitions);
grid.css(`grid-template-rows`,`repeat(${repetitions+2},10px)`);

/*************************************************************/
//Finding the height of each card

for (let i = 0; i < children.length; i++) {
  var Xcard = $(`#card-${i+1}`);
  var finalResult = Math.ceil(Xcard["0"]['scrollHeight']) + Math.ceil(Xcard.outerHeight());
  console.log(`Card-${i+1}`);
  console.log(`scrollHeight-${Math.ceil(Xcard["0"]['scrollHeight'])}`);
  console.log(`outerHeight-${Math.ceil(Xcard.outerHeight())}`);
  console.log(`innerHeight-${Xcard.innerHeight()}`);
  console.log(Xcard.height());
  console.log('this is second for finalresult ',finalResult);

  //get how much each card needs to expand


  let cardSpan = Math.ceil(finalResult / 10);
  console.log(`Card ${i+1} expand in ${cardSpan}`);
    console.log("////////////////////");
  //later we will add it some margin.
  $(`#card-${i+1}`).css('grid-row-end',`span ${cardSpan-1}`);
  //the +1 is here to fix the margin-button problem
}



function isTheSmallestOne(v,sibling1,sibling2,i){


  return v === Math.min(Math.min(v,sibling1),sibling2);
}
