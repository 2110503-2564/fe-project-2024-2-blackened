const TermsPage = () => {
  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>1. Acceptance of Terms</h2>
        <p className='mb-3'>
          By accessing or using SpaceFlow services, you agree to be bound by
          these Terms of Service. If you do not agree to these terms, please do
          not use our service.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>
          2. Description of Service
        </h2>
        <p className='mb-3'>
          SpaceFlow provides a platform for booking and managing workspace
          reservations. Our services include but are not limited to space
          searching, booking, payment processing, and user account management.
        </p>
        <p className='mb-3'>
          We reserve the right to modify, suspend, or discontinue any part of
          the service at any time without prior notice.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>3. User Accounts</h2>
        <p className='mb-3'>
          When you create an account with us, you must provide accurate and
          complete information. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account.
        </p>
        <p className='mb-3'>
          You agree to notify us immediately of any unauthorized use of your
          account or any other breach of security.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>4. User Conduct</h2>
        <ul className='list-disc pl-6 mb-3'>
          <li className='mb-2'>
            You agree not to use the service for any illegal purposes
          </li>
          <li className='mb-2'>
            You will not distribute malware or other harmful content
          </li>
          <li className='mb-2'>
            You will not impersonate other individuals or entities
          </li>
          <li className='mb-2'>
            You will not interfere with or disrupt the service
          </li>
          <li className='mb-2'>
            You will not attempt to gain unauthorized access to any part of the
            service
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>
          5. Bookings and Payments
        </h2>
        <p className='mb-3'>
          All bookings made through SpaceFlow are subject to availability and
          confirmation. Payment terms vary depending on the space and
          reservation details.
        </p>
        <p className='mb-3'>
          Cancellation policies are set by individual space providers and will
          be clearly communicated during the booking process.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>
          6. Intellectual Property
        </h2>
        <p className='mb-3'>
          The service and its original content, features, and functionality are
          owned by SpaceFlow and are protected by international copyright,
          trademark, patent, trade secret, and other intellectual property laws.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>
          7. Limitation of Liability
        </h2>
        <p className='mb-3'>
          SpaceFlow shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages resulting from your use of our
          service or any interactions with spaces booked through our platform.
        </p>
        <p className='mb-3'>
          In no event shall our total liability exceed the amount you paid to us
          for the applicable service in the six-month period preceding the
          claim.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>8. Indemnification</h2>
        <p className='mb-3'>
          You agree to indemnify and hold SpaceFlow harmless from any claims,
          damages, losses, liabilities, costs, or expenses arising from your use
          of the service or your violation of these Terms of Service.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>9. Changes to Terms</h2>
        <p className='mb-3'>
          We reserve the right to modify these terms at any time. We will
          provide notice of significant changes through our website or by
          sending you an email.
        </p>
        <p className='mb-3'>
          Your continued use of the service after such modifications constitutes
          your acceptance of the updated terms.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>10. Governing Law</h2>
        <p className='mb-3'>
          These Terms shall be governed by and construed in accordance with the
          laws of Thailand, without regard to its conflict of law provisions.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>11. Contact Us</h2>
        <p className='mb-3'>
          If you have any questions about these Terms of Service, please contact
          us at terms@spaceflow.com
        </p>
      </section>

      <footer className='text-sm text-gray-500'>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  )
}

export default TermsPage
