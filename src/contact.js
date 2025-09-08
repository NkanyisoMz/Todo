export default function loadContact() {
  const content = document.getElementById('content');
  while (content.lastChild !== document.querySelector('header')) {
    content.removeChild(content.lastChild);
  }
  const contactDiv = document.createElement('div');
  contactDiv.classList.add('contact');
  contactDiv.innerHTML = `
    <h2>Contact Us</h2>
    <div class="contact-container">
      <div class="contact-info">
        <h3>Get in Touch</h3>
        <p><strong>Email:</strong> chef@jsbistro.com</p>
        <p><strong>Phone:</strong> (087) 456-7890</p>
        <p><strong>Address:</strong> 123 Code Lane, Tech City, TC 45678</p>
      </div>
      <div class="contact-form">
        <h3>Send Us a Message</h3>
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Your Name" required>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Your Email" required>
          <label for="message">Message:</label>
          <textarea id="message" name="message" placeholder="Your Message" required></textarea>
          <button type="submit" class="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  `;
  content.appendChild(contactDiv);
}