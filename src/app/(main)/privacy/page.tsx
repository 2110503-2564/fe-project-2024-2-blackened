const PrivacyPage = () => {
  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>Introduction</h2>
        <p className='mb-3'>
          At SpaceFlow, we respect your privacy and are committed to protecting
          your personal data. This Privacy Policy explains how we collect, use,
          and safeguard your information when you use our service.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>Information We Collect</h2>
        <p className='mb-3'>
          We may collect personal information that you provide directly to us,
          such as your name, email address, and any other information you choose
          to provide.
        </p>
        <p className='mb-3'>
          We also automatically collect certain information when you use our
          service, including your IP address, browser type, operating system,
          and usage data.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>
          How We Use Your Information
        </h2>
        <ul className='list-disc pl-6 mb-3'>
          <li className='mb-2'>To provide and maintain our service</li>
          <li className='mb-2'>To notify you about changes to our service</li>
          <li className='mb-2'>To provide customer support</li>
          <li className='mb-2'>To improve and personalize our service</li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>Data Security</h2>
        <p className='mb-3'>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized or unlawful
          processing and against accidental loss, destruction, or damage.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>Your Rights</h2>
        <p className='mb-3'>
          You have the right to access, correct, delete, or export your personal
          data. You can also object to or restrict certain processing of your
          data.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-2xl font-semibold mb-3'>Contact Us</h2>
        <p className='mb-3'>
          If you have any questions about this Privacy Policy, please contact us
          at privacy@spaceflow.com
        </p>
      </section>

      <footer className='text-sm text-gray-500'>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  )
}

export default PrivacyPage
