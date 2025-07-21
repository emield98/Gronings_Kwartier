import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Instagram } from "lucide-react"
import { siteConfig } from "@/config/site"

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
            CONTACT
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          <div>
            <form className="space-y-6">
              <Input
                placeholder="Name"
                className="bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 h-12"
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 h-12"
              />
              <Textarea
                placeholder="Message"
                rows={10}
                className="bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 resize-none"
              />
              <Button className="w-full bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 h-12 font-semibold">
                SEND MESSAGE
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Get in touch</h3>
              <p className="text-gray-400 mb-6">
                Questions about the festival? Want to become a partner? We'd love to hear from you.
              </p>
              <div className="text-cyan-400 font-mono">{siteConfig.links.email}</div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Follow us</h3>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 hover:bg-gray-800 bg-transparent hover:border-cyan-400 transition-colors"
                  onClick={() => window.open(siteConfig.links.instagram, '_blank')}
                >
                  <Instagram size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
