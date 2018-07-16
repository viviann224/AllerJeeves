// call function when submit button is pressed
$("#inputBtn").on("click", function(event)
{
  // prevent page refresh when submit is pressed
  event.preventDefault();
  // website url for ajax to pull from
  const recipeSource = "https://api.yummly.com/v1/api/recipes";
  //api id and key
  const appId="87e47442";
  const appKey="11e4aadcc3dddb10fa26ae2968e1ce03"

  //calls getDiet to get dietary restrictions
  var myIngr= getIngre().trim();
  //calls getDiet to get dietary restrictions
  var myDiet= getDiet().trim();
  //calls getAllergy to get allergy restrictions
  var myAllergy = getAllergy().trim();
  //calls getCards to get 12 recipe suggestions
  var myURL=getCards(myIngr, myAllergy, myDiet, recipeSource, appId, appKey).trim();
  console.log(myURL);
  //once search complete clear search for next search
  clearSearch();
  //calls myCards to get 12 recipes to Object
   makeCards(myURL,recipeSource );
  //console.log(myCard);

});
//code for specific recipe info
//var recipeURL="https://api.yummly.com/v1/api/recipe/"+"Funnel-Cakes-1580470"+"?_app_id="+ appId+"&_app_key="+ appKey;

function clearSearch()
{
  $("#input_text").val('');
}

function getCards(ingr, allergy, diet, source, id, key)
{
  var userInput= ingr+allergy+diet;
  var myURL = source+"?_app_id="+ id+"&_app_key="+ key+"&q=" + userInput +"&maxResult=15";
  return myURL;
}

function makeCards(url, recipeSource)
{
  //clears out the cards before making a new request.
    $(".outputArea").empty();
  //calling the ajax class to pass the url, and the
  //GET method to return the myObj object
  $.ajax({
    url: url,
    method: "GET"
    //once myObj object returns, pass in myObj to the next function
  }).then(function(myObj) {

    let newObj = myObj.matches;
        //console.log(newObj);

    // set the count value to the count property in the object
    let count = newObj.length;

    if(count>0)
    {

    let recipeArray=[], idArray=[], imageArray=[], ingredArray=[], titleArray=[];

    let yummlySource="https://www.yummly.com/recipe/";

    // initiate a for loop to store recipe_id property and image_url property into their arrays
    //change to count later..
        for (var i = 0; i < count; i++) {
          recipeArray.push(yummlySource + newObj[i].id);
          idArray.push(newObj[i].id);
          imageArray.push(newObj[i].imageUrlsBySize[90]);
          ingredArray.push(newObj[i].ingredients);
          titleArray.push(newObj[i].recipeName);
        }

        // create a for-loop to pull, resize, and reassign photos back into the imageArray followed by another interation to replace all http with https...so they all match through out page.
        for (var j = 0; j < imageArray.length; j++) {
          imageArray[j] = imageArray[j].toString().replace("s90", "s500");
          imageArray[j] = imageArray[j].toString().replace("http://", "https://");
        }
        // console.log(recipeArray);
        // console.log(idArray);
        // console.log(imageArray);
        // console.log(ingredArray);
        // console.log(titleArray);

        var Cards =
        {
          url:recipeArray,
          id: idArray,
          img: imageArray,
          ingList: ingredArray,
          title: titleArray,

        };

        //console.log(Cards);

        if(Cards.url.length>0)
        { createCards(Cards);}
      }
      else
      {
        //appends the card to html
        $("form.outputArea").append("I am sorry please search again");
      }
    //return Cards;
  });
}
function createCards(Cards)
{
  // initiate another for loop to create dynamic elements to display properties for each recipe card
  //Cards.id.length
  for( let i=0;i<15;i++)
  {
    //creates card
    let cardBody=$('<div class="card sticky-action hoverable">');
    //stores img
    let cardImg=$('<img class="activator" src="'+ Cards.img[i]+'" ></div>');
    //stores the title on backside
    let titleBack=$('<span class="card-title grey-text text-darken-4">'+Cards.title[i]+'<i class="material-icons right">close</i></span>');
    //stores backside info
    let backInfo= $('<p>'+Cards.ingList[i]+'</p>' );
    //stores url
    let cardUrl=$('<p><a href="'+Cards.url[i]+'">URL</a></p>');
    //create card front and store img and title
    let cardImgHolder=$('<div class="card-image waves-effect waves-block waves-light" id="img'+i+'">');
    cardBody.append(cardImgHolder);
    cardImgHolder.append(cardImg);
    cardBody.append('<div class="card-content"><span class="card-title activator grey-text text-darken-4 flow-text truncate"><i class="material-icons right">more_vert</i>'+ Cards.title[i]+'</span></div>');
    //create card back and store title, backinfo, and url
    let cardBackHolder=$('<div class="card-reveal">');
    cardBody.append(cardBackHolder);
    cardBackHolder.prepend(titleBack);
    cardBackHolder.append(backInfo);
    cardBackHolder.append(cardUrl);
    //appends the card to html
    $(".outputArea").append(cardBody);
  }
}

function getIngre()
{
  //ingredient input is default to tofu unless user updates.
  var ingr="Tofu";
  if($("#input_text").val().trim().length>0)
  { ingr= $("#input_text").val().trim();}
  return ingr;
}

function getDiet()
{
  //starting format for concatination for diret restrictions
  var dietString = "&allowedDiet[]=";
  var dietRequest="";
  //this is to create the filter for the specific diet
  $("input[class=diet]:checked").each(function() {
  //once the user clicks on the submit button, go ahead and check what
  //input has been clicked and concat each diet together
  var restrict = $(this).val().trim();
  dietRequest += (dietString + restrict);
  });
  return dietRequest;
}

function getAllergy()
{
  //starting format for concatination for allergy restrictions
  var restrictString = "&allowedAllergy[]=";
  var allergyRequest="";
  //this is to create the filter for the specific allergy
  $("input[class=allergy]:checked").each(function() {
  //once the user clicks on the submit button, go ahead and check what
  //input has been clicked and concat each allergy together
  var restrict = $(this).val().trim();
  allergyRequest += (restrictString + restrict);
  });
  return allergyRequest;
}
