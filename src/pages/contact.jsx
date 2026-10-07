import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        },
      );

      setSuccess("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold">Contact Us</h1>
          <p className="mt-3 text-gray-500">
            Have a question? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-gray-900"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Subject"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
              rows={6}
              className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Your message"
            />
          </div>

          {success && (
            <p role="status" className="text-sm text-green-700">
              {success}
            </p>
          )}

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
