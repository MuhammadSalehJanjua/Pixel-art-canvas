import Link from "next/link"

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#2f3542] to-[#3f4658] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Create Amazing Pixel Art testing</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Unleash your creativity with our powerful and easy-to-use pixel art editor. Perfect for game developers,
            artists, and hobbyists.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/editor"
              className="px-8 py-3 bg-[#ff4757] hover:bg-[#ff6b81] rounded-md text-lg font-medium transition-colors"
            >
              Start Drawing
            </Link>
            <Link
              href="/signup"
              className="px-8 py-3 bg-transparent border border-white hover:bg-white hover:text-[#2f3542] rounded-md text-lg font-medium transition-colors"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powerful Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-[#f1f2f6] p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#ff4757]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Layer Support</h3>
              <p className="text-gray-600">
                Create complex artwork with multiple layers. Reorder, hide, or adjust layers for complete control.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#f1f2f6] p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#ff4757]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Tools</h3>
              <p className="text-gray-600">
                Use pencil, eraser, color picker, and bucket fill tools to create detailed pixel art with ease.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#f1f2f6] p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#ff4757]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Undo/Redo</h3>
              <p className="text-gray-600">Never worry about mistakes with our robust undo and redo functionality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#f1f2f6] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join thousands of artists creating amazing pixel art with our editor.
          </p>
          <Link
            href="/editor"
            className="px-8 py-3 bg-[#ff4757] hover:bg-[#ff6b81] text-white rounded-md text-lg font-medium transition-colors"
          >
            Start Drawing Now
          </Link>
        </div>
      </section>
    </div>
  )
}
