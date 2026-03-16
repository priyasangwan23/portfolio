import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import './Contact.css'

// ============================================================
// 🔑 Web3Forms Access Key
// Get yours free: https://web3forms.com/#start
//   1. Enter your email on the page
//   2. Check your inbox for the access key
//   3. Paste it below
// ============================================================
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error(result.message || 'Something went wrong')
      }
    } catch (error) {
      console.error('Form error:', error)
      setStatus('error')
      setErrorMsg('Failed to send message. Please try again or email me directly.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">
          Get In <span>Touch</span>
        </h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Let's discuss your project</h3>
            
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-icon-wrapper">
                  <FaEnvelope className="contact-icon" />
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:sangwanpriya200@gmail.com">
                    sangwanpriya200@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon-wrapper">
                  <FaPhone className="contact-icon" />
                </div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:8307538372">
                    +91 8307538372
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <div className="contact-icon-wrapper">
                  <FaMapMarkerAlt className="contact-icon" />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Sonepat, Haryana, India</p>
                </div>
              </div>
            </div>

            <div className="availability card">
              <h4>Availability</h4>
              <p>
                I'm currently available for freelance work and full-time opportunities. 
                Feel free to reach out for collaborations or just to say hi!
              </p>
              <div className="availability-status">
                <div className="status-dot"></div>
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    disabled={status === 'sending'}
                  />
                </div>
                <div className="form-group">
                  <label>Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    disabled={status === 'sending'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                  disabled={status === 'sending'}
                />
              </div>

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
                  disabled={status === 'sending'}
                ></textarea>
              </div>

              {status === 'success' && (
                <div className="form-status form-success">
                  <FaCheckCircle />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="form-status form-error">
                  <FaExclamationCircle />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <FaSpinner className="submit-icon spinning" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="submit-icon" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact