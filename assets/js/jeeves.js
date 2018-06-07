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
  // var myCards= makeCards(myURL);
  // console.log(myCards);

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
  var myURL = source+"?_app_id="+ id+"&_app_key="+ key+"&q=" + userInput +"&maxResult=12";
  return myURL;
}

function makeCards(url)
{
  //calling the ajax class to pass the url, and the
  //GET method to return the myObj object
  $.ajax({
    url: url,
    method: "GET"
    //once myObj object returns, pass in myObj to the next function
  }).then(function(myObj) {

    var newObj = myObj.matches;


    //return myObj.matches;
  });
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
