import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, description, center = false }) {
  return (
    <motion.div
      className={`mb-12 ${center ? "text-center mx-auto max-w-2xl" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <span className="block text-accent font-bold uppercase tracking-wider text-sm mb-3 text-center">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight text-center">
        {title}
      </h2>
      {description && (
        <p className={`text-muted text-lg max-w-3xl leading-relaxed ${center ? "mx-auto text-center" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
