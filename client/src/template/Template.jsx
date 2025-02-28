import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";

const templates = {
  zumrahposter: { name: "Zumrah", image: "/template/zumrah.jpg" },
  template2: { name: "Other Poster", image: "/template/template22.jpg" },
};

function TemplatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedTemplate = templates[id];

  const [formData, setFormData] = useState({
    heading: "",
    date: "",
    place: "",
  });
  const [imageLoaded, setImageLoaded] = useState(false); // New state to track image load

  const zumrahRef = useRef(null);
  const template2Ref = useRef(null);

  // Ensure image is loaded before allowing download
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDownload = (ref) => {
    console.log("Ref being used:", ref.current);
    if (!ref.current) {
      console.error("Ref is null");
      return;
    }
    if (!imageLoaded) {
      console.error("Image not yet loaded");
      return;
    }

    html2canvas(ref.current, {
      useCORS: true,
      scale: 3,
      backgroundColor: null,
      logging: true, // Enable html2canvas logging for more details
    })
      .then((canvas) => {
        console.log("Canvas generated:", canvas);
        const image = canvas.toDataURL("image/png", 1.0);
        if (image && image !== "data:,") {
          // Check for valid image data
          const link = document.createElement("a");
          link.href = image;
          link.download = `poster-${id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("Generated image data is invalid");
        }
      })
      .catch((error) => {
        console.error("Error capturing canvas:", error);
      });
  };

  if (!selectedTemplate) return <h1>Template Not Found</h1>;

  return (
    <>
      {id !== "template2" ? (
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/")}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold">{selectedTemplate.name}</h1>
          <div className="space-y-4 mt-6">
            <input
              placeholder="Date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              placeholder="Place"
              value={formData.place}
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div
            ref={zumrahRef}
            className="relative mt-6"
            style={{ width: "500px", height: "500px" }}
          >
            <img
              src={selectedTemplate.image}
              alt="Event Background"
              className="w-full h-full"
              onLoad={handleImageLoad}
              onError={() => console.error("Zumrah image failed to load")}
            />
            <p
              className="absolute text-white text-base transform -translate-x-1/2"
              style={{ bottom: "46%", left: "58%" }}
            >
              {formData.date}
            </p>
            <h4
              className="absolute text-black text-base transform -translate-x-1/2"
              style={{ bottom: "32%", left: "61%", fontFamily: "Manjari" }}
            >
              {formData.place}
            </h4>
          </div>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => handleDownload(zumrahRef)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={!imageLoaded} // Disable until image loads
            >
              Download Image
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Back to Templates
            </button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/")}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold">{selectedTemplate.name}</h1>
          <div className="space-y-4 mt-6">
            <input
              placeholder="Heading"
              value={formData.heading}
              onChange={(e) =>
                setFormData({ ...formData, heading: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              placeholder="Date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              placeholder="Place"
              value={formData.place}
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div
            ref={template2Ref}
            className="relative mt-6"
            style={{ width: "500px", height: "500px" }}
          >
            <img
              src={selectedTemplate.image}
              alt="Event Background"
              className="w-full h-full"
              onLoad={handleImageLoad}
              onError={() => console.error("Template2 image failed to load")}
            />
            <h2
              className="absolute w-full text-center text-white font-bold"
              style={{
                top: "20%",
                fontSize: "62px",
                fontFamily: "Manjari",
                maxWidth: "90%", // Ensure it stays within the parent container
                wordWrap: "break-word",
                whiteSpace: "normal",
                textAlign: "center",
              }}
            >
              {formData.heading}
            </h2>
            <p
              className="absolute text-black text-base transform -translate-x-1/2"
              style={{ bottom: "36%", left: "52%" }}
            >
              {formData.date}
            </p>
            <h4
              className="absolute text-base transform -translate-x-1/2"
              style={{
                bottom: "24%",
                left: "52%",
                fontFamily: "Manjari",
                color: "#FFEDCC",
              }}
            >
              {formData.place}
            </h4>
          </div>
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => handleDownload(template2Ref)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={!imageLoaded} // Disable until image loads
            >
              Download Image
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              Back to Templates
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TemplatePage;
