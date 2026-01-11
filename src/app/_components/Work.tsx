export default function Work() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Getting started with Whosebday is simple and takes just minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-purple-900/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Create Account</h3>
            <p className="text-gray-400">Sign up and set up your profile in just a few clicks.</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-900/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Add Birthdays</h3>
            <p className="text-gray-400">Import contacts or manually add important dates to your calendar.</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-900/50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Get Reminders</h3>
            <p className="text-gray-400">Check whose bday or other event it is today</p>
          </div>
        </div>
      </div>
    </section>
  )
}