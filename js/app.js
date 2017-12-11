
  var width = $(window).width();
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

  function AuxGrid (){
    let grid = $("#grid");
    let children = grid.children();
    let rows = Math.ceil(children.length / 3);
    //let's set it for 2columns
    let windowWidth = $(window)["0"].self.innerWidth;

    if(windowWidth >= 550 && windowWidth < 944){
      rows = Math.ceil(children.length / 2);
    }
    var auxHeight = Math.ceil($(window).height() * rows);

    var repetitions = Math.ceil(auxHeight / 10);/*10px*/
    grid.css(`grid-template-rows`,`repeat(${repetitions},10px)`);
    CardClasses(children);
    CreatingTheGrid(grid,children,windowWidth);
  }

  function CardClasses(children){
    for (let i = 0; i < children.length; i++) {
      $(`#grid`).children().eq(i).attr('id',`card-${i+1}`);
    }
  }

  function CreatingTheGrid(grid,children,windowWidth){
    let c1=0;
    let c2=0;
    let c3=0;

    for (let i = 0; i < children.length; i++) {
      let Xcardx = $(`#grid div#card-${i+1}`);
      var finalResultx = Math.ceil(Xcardx["0"]['scrollHeight']) + Math.ceil(Xcardx.outerHeight());

      if(windowWidth >= 550 && windowWidth < 944){
        if(isTheSmallestOne(c1,c2,c3 = Number.MAX_VALUE)){
          c1 += finalResultx;
        }
        else if(isTheSmallestOne(c2,c1,c3 = Number.MAX_VALUE)){
          c2 += finalResultx;
        }
      }
      else{
        if(isTheSmallestOne(c1,c2,c3)){
          c1 += finalResultx;
        }
        else if(isTheSmallestOne(c2,c1,c3)){
          c2 += finalResultx;
        }
        else{
          c3 += finalResultx;
        }
      }
    }

    let gridHeight = Math.max(Math.max(c3,c2),c1);
    if(windowWidth >= 550 && windowWidth < 944){
      gridHeight = Math.max(c2,c1);
    }
    //********************************************************
    //sending the value back to CSS
    //********************************************************
    repetitions = Math.ceil(gridHeight / 10);/*10px*/
    grid.css(`grid-template-rows`,`repeat(${repetitions},10px)`);

    BuildingCards(children);
  }

  function BuildingCards(children){
    //Finding the height of each card
    for (let i = 0; i < children.length; i++) {
      var Xcard = $(`#card-${i+1}`);
      var finalResult = Math.ceil(Xcard["0"]['scrollHeight']) + Math.ceil(Xcard.outerHeight());
      //get how much each card needs to expand
      let cardSpan = Math.ceil(finalResult / 10);
      //later we will add it some margin.
      $(`#card-${i+1}`).css('grid-row-end',`span ${cardSpan}`);
      //the +1 is here to fix the margin-button problem

  }
}

  function isTheSmallestOne(v,sibling1,sibling2){
    return v === Math.min(Math.min(v,sibling1),sibling2);
  }

  function OrientResizeFunction(){
    AuxGrid();
  }
  $(window).on('load', function(){
    console.log("The page load");
    OrientResizeFunction();

  });

  $(window).on('resize',function() {
    console.log("The page resize");
    console.log(width);
    console.log($(window).width());
    if($(window).width() != width){
      window.location = window.location;
    }
  });
