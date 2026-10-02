import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-295 px-6 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-500">
            Get in touch
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
            Contact Us
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-500 md:text-lg">
            Have a question or need help? We'd love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:p-10">
          {/* Contact Information */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Get in touch
              </h2>

              <p className="mt-3 max-w-sm leading-6 text-gray-500">
                Feel free to reach out to us. We'll get back to you as soon as
                possible.
              </p>

              <div className="mt-8 space-y-6">
                {/* Email */}
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <a
                    href="mailto:hello@example.com"
                    className="mt-1 inline-block text-sm text-gray-500 transition hover:text-gray-900"
                  >
                    hello@example.com
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <a
                    href="tel:+6281234567890"
                    className="mt-1 inline-block text-sm text-gray-500 transition hover:text-gray-900"
                  >
                    +62 812-3456-7890
                  </a>
                </div>

                {/* Address */}
                <div>
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Semarang, Indonesia
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-10 text-xs leading-5 text-gray-400">
              We usually respond within 1–2 business days.
            </p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us how we can help..."
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 active:scale-[0.99]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
