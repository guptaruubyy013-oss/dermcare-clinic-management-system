import "./Stats.css";
import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserMd,
  FaProcedures,
  FaAward,
} from "react-icons/fa";

const stats = [
  {
    id: 1,
    icon: <FaUsers />,
    number: 50000,
    suffix: "+",
    label: "Happy Patients",
  },
  {
    id: 2,
    icon: <FaUserMd />,
    number: 15,
    suffix: "+",
    label: "Expert Doctors",
  },
  {
    id: 3,
    icon: <FaProcedures />,
    number: 20,
    suffix: "+",
    label: "Advanced Treatments",
  },
  {
    id: 4,
    icon: <FaAward />,
    number: 10,
    suffix: "+",
    label: "Years of Experience",
  },
];

function Stats() {
  const [startCounter, setStartCounter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".stats-section");

      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        setStartCounter(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="stats-section">
      <div className="container">

        <div className="stats-grid">

          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              stat={stat}
              startCounter={startCounter}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

function StatCard({ stat, startCounter }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounter) return;

    let current = 0;

    const increment = stat.number / 60;

    const timer = setInterval(() => {
      current += increment;

      if (current >= stat.number) {
        current = stat.number;
        clearInterval(timer);
      }

      setCount(Math.floor(current));
    }, 25);

    return () => clearInterval(timer);
  }, [startCounter, stat.number]);

  return (
    <div className="stat-card">

      <div className="stat-icon">
        {stat.icon}
      </div>

      <h3>
        {count.toLocaleString()}
        {stat.suffix}
      </h3>

      <p>{stat.label}</p>

    </div>
  );
}

export default Stats;