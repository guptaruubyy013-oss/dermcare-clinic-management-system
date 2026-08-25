import React, { useState } from "react";

const ImageComparison = ({ beforeUrl, afterUrl, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header bg-light fw-bold">{title || "Treatment Progress"}</div>
      <div className="card-body d-flex flex-column align-items-center">
        <div
          className="position-relative overflow-hidden rounded shadow"
          style={{ width: "100%", maxWidth: "500px", height: "350px", userSelect: "none" }}
        >
          {/* After Image */}
          <img
            src={afterUrl}
            alt="After treatment"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Before Image with slider width */}
          <div
            className="position-absolute top-0 start-0 h-100 overflow-hidden"
            style={{ width: `${sliderPosition}%`, borderRight: "3px solid #0d6efd" }}
          >
            <img
              src={beforeUrl}
              alt="Before treatment"
              style={{
                width: "500px",
                height: "100%",
                maxWidth: "none",
                objectFit: "cover",
              }}
            />
          </div>

          <span className="badge bg-dark position-absolute bottom-0 start-0 m-2 opacity-75">Before</span>
          <span className="badge bg-success position-absolute bottom-0 end-0 m-2 opacity-75">After</span>
        </div>

        <div className="w-100 mt-3" style={{ maxWidth: "500px" }}>
          <label className="form-label small text-muted d-flex justify-content-between">
            <span>Slide to compare Before / After</span>
            <span>{sliderPosition}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(e.target.value)}
            className="form-range"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageComparison;