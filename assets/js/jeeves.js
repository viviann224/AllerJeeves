// List of diet/allergy
// --------------------
// 396^Dairy-Free
// 393^Gluten-Free
// 394^Peanut-Free
// 400^Soy-Free
// 397^Egg-Free
// 401^Sulfite-Free
// 395^Tree Nut-Free
// 390^Pescetarian
// 386^Vegan
// 403^Paleo
// 387^Lacto-ovo vegetarian

// call function when submit button is pressed
$("#inputBtn").on("click", function(event)
{
  // prevent page refresh when submit is pressed
  event.preventDefault();
  //starting format for concatination for allergy restrictions
  var restrictString = "&allowedAllergy[]=";
  //starting format for concatination for diret restrictions
  var dietString = "&allowedDiet[]=";
  var dietRequest="";
  var allergyRequest="";
  var recipeSource = "https://www.yummly.com/recipe/";
  //ingredient input is default to tofu unless user updates.
  var ingr="Tofu";

  if($("#input_text").val().trim().length>0)
  { ingr= $("#input_text").val().trim();}

  console.log(ingr);


  //this is to create the filter for the specific allergy
  $("input[class=allergy]:checked").each(function() {
    //once the user clicks on the submit button, go ahead and check what
    //input has been clicked and concat each allergy together
    var restrict = $(this).val().trim();
    allergyRequest += (restrictString + restrict);
  });

  //this is to create the filter for the specific diet
  $("input[class=diet]:checked").each(function() {
    //once the user clicks on the submit button, go ahead and check what
    //input has been clicked and concat each diet together
    var restrict = $(this).val().trim();
    dietRequest += (dietString + restrict);
  });

  var userInput= ingr+allergyRequest+dietRequest;

  // website url for ajax to pull from
  const appId="87e47442";
  const appKey="11e4aadcc3dddb10fa26ae2968e1ce03"
     var myURL = "https://api.yummly.com/v1/api/recipes?_app_id="+ appId+"&_app_key="+ appKey+"&q=" + userInput +"&maxResult=12";
     var recipeURL="https://api.yummly.com/v1/api/recipe/"+"Funnel-Cakes-1580470"+"?_app_id="+ appId+"&_app_key="+ appKey;
console.log(recipeURL);

});
