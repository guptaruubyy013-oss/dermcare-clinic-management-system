import "./DoctorsSection.css";

import doctor1 from "../../assets/images/doctors/doctor1.jpg";
import doctor2 from "../../assets/images/doctors/doctor2.jpg";
import doctor3 from "../../assets/images/doctors/doctor3.jpg";

import { FaStar, FaCalendarCheck } from "react-icons/fa";

const doctors = [
  {
    id: 1,
    image: doctor1,
    name: "Dr. Rahul Mehta",
    specialization: "Dermatologist",
    experience: "12+ Years Experience",
    rating: "4.9",
  },
  {
    id: 2,
    image: doctor2,
    name: "Dr. Priya Sharma",
    specialization: "Hair Specialist",
    experience: "10+ Years Experience",
    rating: "4.8",
},
  {
    id: 3,
    image: doctor3,
    name: "Dr. Neha Kapoor",
    specialization: "Cosmetic Dermatologist",
    experience: "9+ Years Experience",
    rating: "4.9",
  },
];

function DoctorsSection() {
  return (
    <section className="doctors-section">
      <div className="container">

        <div className="section-title">
          <h2>Meet Our Specialists</h2>
          <p>
            Our experienced dermatologists and hair specialists provide
            personalized treatments using advanced medical technology.
          </p>
        </div>

        <div className="doctor-grid">
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>

              <img
                src={doctor.image}
                alt={doctor.name}
                className="doctor-image"
              />

              <div className="doctor-info">
                <h3>{doctor.name}</h3>

                <span>{doctor.specialization}</span>

                <p>{doctor.experience}</p>

                <div className="doctor-rating">
                  <FaStar />
                  <span>{doctor.rating}</span>
                </div>

                <button>
                  <FaCalendarCheck />
                  Book Appointment
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DoctorsSection;