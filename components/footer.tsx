export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="flex items-center flex-1">
              <a href="/" aria-label="Home">
              <img
                src="/logo.png"
                alt="GK Logo"
                className="object-contain h-12 w-auto max-h-16"
                style={{ maxWidth: "100%" }}
              />
              </a>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            © 2025 Gronings Kwartier. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
