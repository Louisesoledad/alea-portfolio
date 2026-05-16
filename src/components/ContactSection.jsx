import emailjs from "@emailjs/browser"
import { useRef, useState, useEffect } from "react"
import ReCAPTCHA from "react-google-recaptcha"

function ContactSection() {
  const form = useRef()
  const recaptchaRef = useRef(null)

  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState({})
  const [captchaValue, setCaptchaValue] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value)
    if (errors.captcha) {
      setErrors((prev) => ({ ...prev, captcha: "" }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    if (!captchaValue) {
      newErrors.captcha = "Please complete the ReCAPTCHA verification"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sendEmail = (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setLoading(true)

    emailjs
      .sendForm(
        "service_dv3277b",
        "template_1goya8n",
        form.current,
        "_vej5Gx7DM9pcGzS3"
      )
      .then(
        () => {
          setSuccess(true)
          setLoading(false)
          setFormData({ name: "", email: "", message: "" })
          setErrors({})
          setCaptchaValue(null)
          if (recaptchaRef.current) recaptchaRef.current.reset()
        },
        (error) => {
          alert("Failed to send message.")
          console.error(error)
          setLoading(false)
        }
      )
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  return (
    <section
      id="contact"
      className="relative bg-dark py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-16 items-center px-6 sm:px-8 md:px-10">

        {/* LEFT - FORM */}
        <div className="relative lg:ml-10">

          <div className="relative inline-block w-full">

            {/* OUTER BORDER */}
            <div className="absolute -top-4 -left-4 w-full h-full border-[6px] border-primary z-0"></div>

            {/* INNER */}
            <div className="relative border-[3px] border-primary p-6 sm:p-8 z-10 bg-dark">

              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col gap-6 text-white"
                noValidate
              >

                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full bg-transparent border-b outline-none py-3 placeholder-gray-400 transition text-sm sm:text-base ${errors.name ? 'border-rose-400 focus:border-rose-400' : 'border-gray-500 focus:border-primary'}`}
                  />
                  {errors.name && (
                    <span className="absolute -bottom-5 left-0 text-[11px] text-rose-400 tracking-wide animate-[fadeIn_0.3s_ease-out]">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="relative mt-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`w-full bg-transparent border-b outline-none py-3 placeholder-gray-400 transition text-sm sm:text-base ${errors.email ? 'border-rose-400 focus:border-rose-400' : 'border-gray-500 focus:border-primary'}`}
                  />
                  {errors.email && (
                    <span className="absolute -bottom-5 left-0 text-[11px] text-rose-400 tracking-wide animate-[fadeIn_0.3s_ease-out]">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="relative mt-2">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Your Message"
                    className={`w-full bg-transparent border-b outline-none py-3 placeholder-gray-400 resize-none transition text-sm sm:text-base ${errors.message ? 'border-rose-400 focus:border-rose-400' : 'border-gray-500 focus:border-primary'}`}
                  />
                  {errors.message && (
                    <span className="absolute -bottom-5 left-0 text-[11px] text-rose-400 tracking-wide animate-[fadeIn_0.3s_ease-out]">
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className="relative flex flex-col items-center mt-2">
                  <div className="transform scale-90 sm:scale-100 origin-center transition-transform duration-300">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                      onChange={handleCaptchaChange}
                      theme="dark"
                    />
                  </div>
                  {errors.captcha && (
                    <span className="absolute -bottom-6 text-[11px] text-rose-400 tracking-wide animate-[fadeIn_0.3s_ease-out]">
                      {errors.captcha}
                    </span>
                  )}
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary px-8 py-3 tracking-wider uppercase text-sm hover:scale-105 hover:shadow-lg transition duration-300 disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>

              </form>

            </div>
          </div>

          {/* LEFT DOTS */}
          <div className="hidden xl:grid grid-cols-6 gap-2 absolute left-[-140px] bottom-10">
            {[...Array(18)].map((_, i) => {
              const col = i % 6
              const opacity = 0.2 + (col / 5) * 0.8

              return (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-white"
                  style={{ opacity }}
                />
              )
            })}
          </div>

        </div>

        {/* RIGHT - TEXT */}
        <div className="text-white relative">

          {/* TOP DOTS */}
          <div className="hidden md:grid grid-cols-3 grid-rows-4 gap-2 w-fit mb-6 ml-4 sm:ml-8 md:ml-12 relative md:-top-20 lg:-top-32">
            {[...Array(12)].map((_, i) => {
              const row = Math.floor(i / 3)
              const opacityLevels = [1, 0.75, 0.5, 0.2]

              return (
                <div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  style={{ opacity: opacityLevels[row] }}
                />
              )
            })}
          </div>

          <div className="relative md:-mt-10 lg:-mt-24">

            <h2 className="text-3xl md:text-5xl font-brunson mb-4 leading-tight">
              Let's Work Together!
            </h2>

            <p className="text-gray-300 mb-4 max-w-md text-sm sm:text-base leading-relaxed">
              I'm available for freelance projects and collaborations. If you have an idea in mind, feel free to contact me.
            </p>

            <p className="text-gray-400 text-sm sm:text-base break-all sm:break-normal">
              Email: tandocaleanicole@gmail.com
            </p>

          </div>

          {/* BOTTOM DOTS */}
          <div className="hidden xl:grid [grid-template-columns:repeat(16,minmax(0,1fr))] gap-2 absolute right-[-330px] bottom-[-80px] w-[500px]">
            {[...Array(48)].map((_, i) => {
              const col = i % 16
              const opacity = 1 - (col / 15) * 0.8

              return (
                <div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full"
                  style={{ opacity }}
                />
              )
            })}
          </div>

        </div>
      </div>

      {success && (
        <div className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 bg-dark text-white px-5 sm:px-6 py-3 sm:py-4 rounded-lg shadow-2xl border border-primary flex items-center gap-3 animate-fadeIn z-50">

          <span className="text-green-400 text-lg sm:text-xl">OK</span>

          <p className="text-xs sm:text-sm">
            Message sent successfully!
          </p>

          <button
            onClick={() => setSuccess(false)}
            className="ml-2 sm:ml-4 text-xs opacity-70 hover:opacity-100"
          >
            Close
          </button>

        </div>
      )}
    </section>
  )
}

export default ContactSection
