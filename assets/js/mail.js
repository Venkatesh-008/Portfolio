(function () {
  emailjs.init("AihhQJdeuzVLBlNIV"); // Replace with your actual EmailJS public key
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;

  emailjs.sendForm("service_dueyfek", "template_l1aj86o", form)
    .then(() => {
      alert("✅ Message sent successfully via SMTP!");
      form.reset(); // ✅ This clears the form
    }, (error) => {
      console.error("❌ Failed to send message", error);
      alert("❌ Failed to send. See console for error.");
    });
});