import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';
export function ContactSection() {
  const { ref, isVisible } = useScrollReveal(0.2);
  return (
    <section id="contact" className="py-24 md:py-32 w-full bg-background">
      <div ref={ref} className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          <h2 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
            Get in Touch
          </h2>
          <p className="text-muted font-light">
            For inquiries about paintings or commissions, please reach out using the form below.
          </p>
        </div>

        <form
          className={`space-y-12 transition-all duration-1000 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group">
              <label
                htmlFor="name"
                className="block text-xs uppercase tracking-widest text-muted mb-2 group-focus-within:text-terracotta transition-colors">

                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-transparent border-b border-charcoal/20 py-2 text-charcoal focus:outline-none focus:border-terracotta transition-colors font-serif text-xl"
                placeholder="Your name" />

            </div>
            <div className="group">
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-widest text-muted mb-2 group-focus-within:text-terracotta transition-colors">

                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-transparent border-b border-charcoal/20 py-2 text-charcoal focus:outline-none focus:border-terracotta transition-colors font-serif text-xl"
                placeholder="your@email.com" />

            </div>
          </div>

          <div className="group">
            <label
              htmlFor="subject"
              className="block text-xs uppercase tracking-widest text-muted mb-2 group-focus-within:text-terracotta transition-colors">

              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full bg-transparent border-b border-charcoal/20 py-2 text-charcoal focus:outline-none focus:border-terracotta transition-colors font-serif text-xl"
              placeholder="Interest in a painting..." />

          </div>

          <div className="group">
            <label
              htmlFor="message"
              className="block text-xs uppercase tracking-widest text-muted mb-2 group-focus-within:text-terracotta transition-colors">

              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full bg-transparent border-b border-charcoal/20 py-2 text-charcoal focus:outline-none focus:border-terracotta transition-colors font-serif text-xl resize-none"
              placeholder="Write your message here...">
            </textarea>
          </div>

          <div className="flex justify-end pt-8">
            <button
              type="submit"
              className="bg-terracotta text-white px-8 py-4 rounded-none hover:bg-charcoal transition-colors duration-300 flex items-center gap-3 text-sm tracking-widest uppercase">

              Send Message
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>);

}