const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  let location = search.value;
  messageOne.innerHTML = "Loading....";
  messageTwo.innerHTML = "";
  fetch(`/weather/?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.innerHTML = "Error:";
        messageTwo.innerHTML = data.error;
      } else {
        messageOne.innerHTML = `Forecast:        <h4>${data.forecast}<h4>`;
        messageTwo.innerHTML = `Location:     <h4>${data.location}</h4>   Address:      <h4>${data.address}</h4>`;
        search.value = "";
      }
    });
  });
});
