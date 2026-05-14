import { motion } from "framer-motion";
import Container from "../common/Container";

export default function HeroIntroSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col gap-8 text-center md:text-left">
            <div className="inline-block w-20 h-1 bg-accent mx-auto md:mx-0 rounded-full" />
            
            <div className="space-y-6 text-muted text-lg md:text-xl leading-loose">
              <p className="text-primary font-bold text-2xl md:text-3xl leading-snug">
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
                <p className="text-accent font-bold text-xl md:text-2xl italic tracking-tight">
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
