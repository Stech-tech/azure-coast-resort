const slides = document.querySelectorAll(".slide");

let current = 0;

function changeSlide() {
  slides[current].classList.remove("active");

  current = (current + 1) % slides.length;

  slides[current].classList.add("active");
}

setInterval(changeSlide, 5000);

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const sender = this.elements["user_name"].value;
  const email = this.elements["user_email"].value;
  const message = this.elements["message"].value;

  fetch("http://localhost:5000/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sender,
      email,
      message
    })
  })
    .then(res => res.json())
    .then(data => {
      alert("Message sent 😎");
      console.log(data);
      this.reset();
    })
    .catch(err => {
      console.error(err);
      alert("Something went wrong ❌");
    });
});