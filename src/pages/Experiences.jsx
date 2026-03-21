import { useMemo, useState } from "react";
import Container from "../components/common/Container";
import SectionHeader from "../components/common/SectionHeader";
import Button from "../components/common/Button";
import ExperienceCard from "../components/experiences/ExperienceCard";
import { experiences } from "../data/experiences";

const categoryOptions = ["All", "Culture", "Food", "Nature", "Adventure", "Stay"];
const durationOptions = ["All", "Half Day", "2 - 3 Hours", "1 Night / 2 Days"];
const difficultyOptions = ["All", "Easy", "Moderate"];

export default function Experiences() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const filteredExperiences = useMemo(() => {
    return experiences.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesDuration =
        selectedDuration === "All" || item.duration === selectedDuration;

      const matchesDifficulty =
        selectedDifficulty === "All" || item.difficulty === selectedDifficulty;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDuration &&
        matchesDifficulty
      );
    });
  }, [search, selectedCategory, selectedDuration, selectedDifficulty]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedDuration("All");
    setSelectedDifficulty("All");
  };

  return (
    <main>
      <section className="page-hero page-hero-experiences">
        <Container className="page-hero-content">
          {/* <p className="section-eyebrow">Experiences</p> */}
          <h1>Choose the Village Experience That Fits Your Journey</h1>
          <p>
            Discover culture, food, nature, and slower travel through carefully
            designed experiences shaped by the people and landscapes of Etili.
          </p>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Browse Experiences"
            title="Authentic Moments, Beautifully Curated"
            description="Filter by experience type, duration, or difficulty to find the right match for your trip."
          />

          <div className="experience-filter-bar">
            <div className="filter-field search-field">
              <label htmlFor="experience-search">Search</label>
              <input
                id="experience-search"
                type="text"
                placeholder="Search experiences..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-field">
              <label htmlFor="category-filter">Category</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categoryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="duration-filter">Duration</label>
              <select
                id="duration-filter"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
              >
                {durationOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="difficulty-filter">Difficulty</label>
              <select
                id="difficulty-filter"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficultyOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="filter-actions">
              <Button variant="secondary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>

          <div className="results-bar">
            <p>
              Showing <strong>{filteredExperiences.length}</strong> experience
              {filteredExperiences.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredExperiences.length > 0 ? (
            <div className="experience-list">
              {filteredExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <h3>No experiences matched your filters</h3>
              <p>Try changing the search or clearing the filters to see all options.</p>
              <Button onClick={clearFilters}>Reset Filters</Button>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}