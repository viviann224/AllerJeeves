$(document).ready(function()
{
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data)
  {
    console.log(data);
    $(".member-name").text(data.username);

    function saveCard( event)
    {
      event.preventDefault();
     var myId=data.id;
      var title=$(this).parent().find("span")[0].textContent;
      var url=$(this).parent().find("p")[1];

       $(this).addClass("saved");

        var newSave =
        {
          recUrl:url.getElementsByTagName('a')[0].getAttribute('href'),
          recId: (url.getElementsByTagName('a')[0].getAttribute('href')).split("/")[4],
          recImg: $(this).parent().find("img").attr("src"),
          recIngList:$(this).parent().find("p")[0].textContent,
          recTitle:title.replace("more_vert", ""),
          UserId: myId
        };

        //newSave.UserId =myId;
        console.log(newSave);

        $.post("/api/save",newSave, function()
        {
          console.log("datastored");
        });
    }

    $(document).on("click", "#content", saveCard);

  $(".savedRec").on("click", function(event)
  {
      //alert("clicked");
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

        for(var x=0;x<data.length;x++)
        {
          imgArr.push(data[x].recImg);
          titleArr.push( data[x].recTitle);
          listArr.push (data[x].recIngList);
          urlArr.push(data[x].recUrl);
        }
        var UsersCards =
        {
          img:imgArr,
          title:titleArr,
          ingList:listArr,
          url:urlArr
        }
        console.log(UsersCards);

        createCards(UsersCards);
        $(".lean-overlay").attr("display", "show");
      }
    });

  });

  });

  // function getUser()
  // {
  //   $.get("/api/user_data").then(function(data)
  //   {
  //     console.log(data.id);
  //     //return parseInt(data.id);
  //   }.then(saveCard(parseInt(data.id))));
  // };



  //enable modals to run
  $('.modal-trigger').leanModal();

  // //when user clicks login close current modal then open login modal
   $("#about").click(function()
   {

  //    $("#signupModal").closeModal();
     $("#aboutModal").openModal();
   });
   // //when user clicks login close current modal then open login modal
    $("#close").click(function()
    {

   //    $("#signupModal").closeModal();
      $(".lean-overlay").hide();
    });


});
