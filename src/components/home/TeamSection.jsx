import React from "react";

const team = [
  {
    name: "Bandara",
    role: "Master Gardener",
    desc: "Bandara has tended the village soil for 40 years and knows the secret properties of every leaf and root.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALHAg3jMEKyi5_Mej55yjOr9hPLi3ScnJ1SbZfM_HpCSiS2mNL3kDRIXEgWoaNez86fvOXPtVC9uu_CVgiHBFk59ybbVCFMSveCxC5yLGWVkTuIYb8VVnbjQzGqO6LVQ5UKxNjZ4XYzdaNydu32PqY35mcnTc2YR6BUEt0cnUUt0PTb-j0Z7rUm59cdGpK-yzL5SpefYImEDczIE0jbTg-1T-GhG7BovMBbFoFJuTsZsaDGzrnKzAH9mgFX5f20axO58hZf0PZUA",
  },
  {
    name: "Kumari",
    role: "Chef de Cuisine",
    desc: "Kumari's recipes have been passed down through five generations of the Ethi Village families.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4oPBiUa3ETRzuL8aKtmqJ3jgezMvpoxjukpH_khJv6cz5CjgZifh_m5Nz5W51_0sxGyMSQ9iBUyyzqZctQyafbInijqtgHzEIzv3YraDqrhe2A2xoIhPlOcmZFPPva5X5EQVXH9gvJvGXQJ8Js0s6gsh7wKTsfIQaCqCaJLcFtHKiP8JrM5HXWpgdhf6NQ28NT3nfn92RqpPUKElMR-10TuEyQ2-y5TI6_ncPBreMNUiblCeDJfNiTyPVxTJMh1pbSkbfiFxxwQ",
  },
  {
    name: "Rohan",
    role: "Lead Tracker",
    desc: "With an eye for the smallest detail, Rohan guides you through the hidden trails and birding hotspots.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8InVrN6WD0qo-8EEJ7UDmp2vTViDsN5IhYwVxidAXR7I3IxH1DOpNcbEBvKAZuhvg4dsL2W1sS6ORpPMQxxyyyh0CNTx6t_BxqSfkA8Iuwcqm8XOHvbUn68Q5vFMZL28zSnW9zKM_qcDrn0PV2-2UXNc5KCIE4zXXlH7X2w7rGHBcCaTsSbcFgbtcg5GOzccLLr_Rar7EI3lALvOfne02vin6b20THmOurFBE2tCCN-LLaiSRaKkkJHi7Nz_dWXQgEf74LX_lEg",
  },
];

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="team-container">
        <h2 className="team-title">The People Behind the Experience</h2>

        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="image-wrapper">
                <img src={member.img} alt={member.name} />
              </div>

              <h4>{member.name}</h4>
              <p className="role">{member.role}</p>
              <p className="desc">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;