import { motion } from "framer-motion";
import Container from "../common/Container";

export default function HeroIntroSection() {
  return (
    <section className="py-24 overflow-hidden bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col gap-8 text-center md:text-left">
            <div className="inline-block w-20 h-1 mx-auto rounded-full bg-accent md:mx-0" />
            
            <div className="space-y-6 text-lg leading-loose text-center text-muted md:text-xl">
              <p className="text-2xl font-bold leading-snug text-primary md:text-3xl">
                Etili Village is a rural community that provides opportunities for
                wildlife encounters, showcases authentic culture, and promotes
                community-driven enterprises.
              </p>

              <p>
                Our objective is to enhance local employment and income levels
                while simultaneously preserving and restoring the natural
                environment and wildlife in the Uva province of Sri Lanka.
              </p>

              <p>
                We collaborate with the local community to create and offer a
                diverse array of authentic experiences, allowing guests to unwind
                and rejuvenate in one of the most beautiful spots in Sri Lanka,
                surrounded by mountains, lakes, caves, forests, and rice paddies.
              </p>

              <div className="pt-8 border-t border-border/10">
                <p className="text-xl italic font-bold tracking-tight text-accent md:text-2xl">
                  "Our village consistently ranks among the top community-driven
                  enterprises in Sri Lanka."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
