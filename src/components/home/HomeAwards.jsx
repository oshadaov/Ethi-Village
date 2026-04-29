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
      color: "#00af87",
    },
    {
      icon: FaMedal,
      title: "Award Winner",
      color: "#ffc107",
    },
  ];

  return (
    <section className="section">
      <Container className="split-layout">
        <div className="split-image">
          <img
            src={awardImage}
            alt="Sri Lanka Tourism Awards 2024 - Special Recognition"
            style={{ borderRadius: "12px" }}
          />
        </div>

        <div>
          <SectionHeader
            eyebrow="Industry Recognition"
            title="Sri Lanka Tourism Awards 2024"
            description="We are honored to have been recognized for our contribution to destination promotion and community-based tourism initiatives."
          />

          <div className="award-content">
            <p>
              <strong>Special Recognition Award</strong> for{" "}
              <em>
                Contribution to Destination Promotion - Community Based Tourism
                Initiative
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

          <div className="award-certifications">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={index}
                  className="certification-badge"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon
                    className="certification-icon"
                    style={{ color: cert.color }}
                  />
                  <span>{cert.title}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
