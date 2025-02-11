import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    date: "",
    place: "",
    details: "",
  });

  const canvasRef = useRef(null);

  // Sample template data
  const templates = [
    {
      id: "template1",
      name: "Template 1",
      image: ""/template/template1.jpg"",
    },
    {
      id: "template2",
      name: "Template 2",
      image: ""/template/template1.jpg"",
    },
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templates.find((t) => t.id === templateId));
  };

const handleDownload = () => {
  if (!canvasRef.current) return;

  setTimeout(() => {
  html2canvas(canvasRef.current, {
    useCORS: true,
    scale: 3,  // Increase scale for better alignment
    backgroundColor: null, // Prevents white background issues
  }).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png", 1.0);
    link.download = "generated-poster.png";
    link.click();
  });
}, 500); // Give images time to load
};


  return (
    <div>
      <h1>Event Poster Generator</h1>

      {!selectedTemplate ? (
        // Home Page: Display Templates
        <div>
          <h2>Choose a Template</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                style={{
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  style={{ width: "150px", height: "150px" }}
                />
                <p>{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Form Page & Image Preview
        <div>
          <h2>Enter Event Details</h2>
          <input
            placeholder="Heading"
            value={formData.heading}
            onChange={(e) =>
              setFormData({ ...formData, heading: e.target.value })
            }
          />
          <input
            placeholder="Subheading"
            value={formData.subheading}
            onChange={(e) =>
              setFormData({ ...formData, subheading: e.target.value })
            }
          />
          <input
            placeholder="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            placeholder="Place"
            value={formData.place}
            onChange={(e) =>
              setFormData({ ...formData, place: e.target.value })
            }
          />
          <textarea
            placeholder="Additional Details"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
          />

          {/* Image Preview with Text Overlay */}
          <div
            ref={canvasRef}
            style={{
              position: "relative",
              display: "inline-block",
              marginTop: "20px",
              backgroundColor: "white", // Ensures clear rendering
              width: "500px",
              height: "500px",
            }}
          >
            <img
              crossOrigin="anonymous"
              src={selectedTemplate.image}
              alt="Event Background"
              style={{ width: "500px", height: "500px" }}
            />

            {/* Overlay Text */}
            <h2
              className="heading"
              style={{
                position: "absolute",
                top: "25%",
                left: "0",
                width: "100%",
                textAlign: "center",
                color: "black",
                padding: "5px",
                fontSize: "50px",
                fontFamily: "Abril Fatface",
              }}
            >
              {formData.heading}
            </h2>

            {/* <h3
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                background: "rgba(0,0,0,0.5)",
                padding: "5px",
              }}
            >
              {formData.subheading}
            </h3> */}
            <p
              className="date"
              style={{
                position: "absolute",
                bottom: "40%",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                fontSize: "16px",
                padding: "5px",
              }}
            >
              {formData.date}
            </p>
            <h4
              className="place"
              style={{
                position: "absolute",
                bottom: "25%",
                left: "50%",
                transform: "translateX(-50%)",
                color: "black",
                padding: "5px",
                fontSize: "16px",
              }}
            >
              {formData.place}
            </h4>
          </div>

          {/* Buttons */}
          <div>
            <button onClick={handleDownload}>Download Image</button>
            <button onClick={() => setSelectedTemplate(null)}>
              Back to Templates
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
