import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, description, center = false }) {
  return (
    <motion.div
      className={`section-header ${center ? "center" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </motion.div>
  );
}
