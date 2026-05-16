import { motion } from "framer-motion";
import Container from "../common/Container";
import SectionHeader from "../common/SectionHeader";
import { SiTripadvisor } from "react-icons/si";
import { FaMedal } from "react-icons/fa";
import awardImage from "../../assets/images/gallery/stay/award.jpg";

export default function HomeAwards() {
  const certifications = [
    {
      icon: SiTripadvisor,
      title: "TripAdvisor Certified",
      color: "text-[#00af87]",
      bg: "bg-[#00af87]/10",
    },
    {
      icon: FaMedal,
      title: "Award Winner",
      color: "text-[#ffc107]",
      bg: "bg-[#ffc107]/10",
    },
  ];

  return (
    <section className="py-24 bg-bg/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-accent/20 rounded-[40px] blur-2xl z-0" />
            <div className="relative z-10 rounded-[32px] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={awardImage}
                alt="Sri Lanka Tourism Awards 2024 - Special Recognition"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-xl z-20 border-4 border-white hidden md:flex">
              <FaMedal className="text-accent text-5xl" />
            </div>
          </motion.div>

          <div className="text-center lg:text-left">
            <SectionHeader
              eyebrow="Industry Recognition"
              title="Sri Lanka Tourism Awards 2024"
              description="We are honored to have been recognized for our contribution to destination promotion and community-based tourism initiatives."
            />

            <div className="space-y-6 text-muted text-lg leading-relaxed mb-10">
              <p>
                <strong className="text-primary">
                  Special Recognition Award
                </strong>{" "}
                for{" "}
                <em className="text-accent">
                  Contribution to Destination Promotion - Community Based
                  Tourism Initiative
                </em>{" "}
                at the Sri Lanka Tourism Awards 2024.
              </p>
              <p>
                This award recognizes our commitment to sustainable tourism,
                authentic cultural experiences, and community empowerment. It
                reflects our dedication to preserving local heritage while
                creating meaningful opportunities for both our guests and the
                local community.
              </p>
              <p>
                We are proud to stand among Sri Lanka's finest community-driven
                tourism enterprises, setting the standard for responsible and
                authentic travel experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full ${cert.bg} border border-white shadow-sm`}
                  >
                    <Icon className={`text-xl ${cert.color}`} />
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">
                      {cert.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
