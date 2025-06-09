  (function () {
    emailjs.init("AihhQJdeuzVLBlNIV"); // Replace with your actual User ID
  })();

  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_mrh9uxw", "template_l1aj86o", this)
      .then(function () {
        alert("✅ Message sent successfully!");
      }, function (error) {
        console.error("❌ Failed...", error);
        alert("❌ Failed to send message. Check console.");
      });
  });