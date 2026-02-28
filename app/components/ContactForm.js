"use client";

import { useState } from "react";

const API = "http://127.0.0.1:8000";

export default function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch(`${API}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
                setTimeout(() => setStatus(null), 4000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <h2>Get in Touch</h2>
                <p className="content-section-desc">
                    Have a question, want to collaborate, or just wanna say hi? Drop me a message.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="contact-name">Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                placeholder="Your name"
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                placeholder="your@email.com"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact-message">Message</label>
                        <textarea
                            id="contact-message"
                            placeholder="What's on your mind?"
                            rows={5}
                            required
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="contact-submit"
                        disabled={status === "sending"}
                    >
                        {status === "sending" ? "Sending..." : "Send Message"}
                    </button>

                    {status === "success" && (
                        <p className="form-status success">✓ Message sent! I'll get back to you soon.</p>
                    )}
                    {status === "error" && (
                        <p className="form-status error">Something went wrong. Try emailing me directly.</p>
                    )}
                </form>
            </div>
        </section>
    );
}
