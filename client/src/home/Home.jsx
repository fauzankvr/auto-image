import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  const navigate = useNavigate();

  const templates = [
    { id: "zumrahposter", name: "Zumrah", image: "/template/zumrah.jpg" },
    {
      id: "template2",
      name: "Other Poster",
      image: "/template/template22.jpg",
    },
  ];

  const handleTemplateSelect = (templateId) => {
    navigate(`/template/${templateId}`);
  };

  return (
    <>
      <Navbar/>
      <div className="events container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Event Poster Generator
        </h1>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Choose a Template</h2>
          <div className="flex gap-4 flex-wrap">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className="cursor-pointer border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-300"
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-40 h-40 object-cover rounded"
                />
                <p className="mt-2 text-center font-medium">{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
