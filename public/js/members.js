$(document).ready(function()
{
  isLogged=true;
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data)
  {
    console.log(data);
    //displays a welcome greeting to login user
    $(".member-name").text(data.username);

    //saves a new card as a favorite for user
    function saveCard(event)
    {
      event.preventDefault();
      var myId=data.id;
      var title=$(this).parent().find("span")[0].textContent;
      var url=$(this).parent().find("p")[1];
       $(this).addClass("saved");

       //create a newsaved object
        var newSave =
        {
          recUrl:url.getElementsByTagName('a')[0].getAttribute('href'),
          recId: (url.getElementsByTagName('a')[0].getAttribute('href')).split("/")[4],
          recImg: $(this).parent().find("img").attr("src"),
          recIngList:$(this).parent().find("p")[0].textContent,
          recTitle:title.replace("more_vert", ""),
          UserId: myId
        };
        console.log(newSave);



        $.post("/api/save",newSave, function()
        {  console.log("datastored");});
    }

    //function to display member's favorite recipe
    function displayCard()
    {
      $.get("/api/saved/" + data.id, function(data)
      {
        console.log("users favorites", data);
        $(".outputArea").empty();
        var userFav = data;
        if (!userFav || !userFav.length)
        {
          $(".outputArea").append("<p><h3>I am sorry You have nothing saved</h3></p>");
        }
        else
        {
          var imgArr=[];
          var titleArr=[];
          var listArr=[];
          var urlArr=[];
          var recIdArr=[]

          for(var x=0;x<data.length;x++)
          {
            imgArr.push(data[x].recImg);
            titleArr.push( data[x].recTitle);
            listArr.push (data[x].recIngList);
            urlArr.push(data[x].recUrl);
            recIdArr.push(data[x].recId);
          }
          var UsersCards =
          {
            img:imgArr,
            title:titleArr,
            ingList:listArr,
            url:urlArr,
            recId:recIdArr
          }
          console.log(UsersCards);

          createCards(UsersCards);
          $(".lean-overlay").attr("display", "show");
        }
    });
    }



    $(document).on("click", ".deleteRec", deleteRecipe);

    // $(document).on("click", ".deleteRec", deleteRecipe($(this).value()));
    //   //delete favorite recipe
    //   // This function does an API call to delete posts
    function deleteRecipe(event)
    {
    event.preventDefault();
    //alert("delete!"+$(this).val().trim());
    var deleteId=$(this).attr("value");
    console.log(deleteId);
    var deleteObj=
    {
      id:deleteId
    }
    var id=data.id
      $.ajax({
        method: "DELETE",
        url: "/api/posts/" + id,
        data: deleteObj
      })
      .then(function() {
        displayCard();
      });
    }

    $(document).on("click", "#content", saveCard);

    //function to display user's current favorited cards
    $(".savedRec").on("click", function(event)
    {

       displayCard();


    });



  });
  //enable modals to run
  $('.modal-trigger').leanModal();

  // //when user clicks login close current modal then open login modal
   $("#about").click(function()
   {
     $("#aboutModal").openModal();
   });

   // //when user clicks login close current modal then open login modal
    $("#close").click(function()
    {
      $(".lean-overlay").hide();
    });
});
