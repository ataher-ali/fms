import React from 'react';

const MastarTrangations = () => {
    const data = [
  {
    name: "Kurigram",
    image: "https://i.ibb.co.com/NfLg6z9/Untitled-design.jpg",
    url: "https://example.com/1",
  },
  {
    name: "Gaibandha",
    image: "https://i.ibb.co.com/NfLg6z9/Untitled-design.jpg",
    url: "https://example.com/2",
  },
  {
    name: "Lalmonirhat",
    image: "https://i.ibb.co.com/NfLg6z9/Untitled-design.jpg",
    url: "https://example.com/3",
  },
  {
    name: "Rangpur",
    image: "https://i.ibb.co.com/NfLg6z9/Untitled-design.jpg",
    url: "https://example.com/4",
  },
  {
    name: "Nilphamari",
    image: "https://i.ibb.co.com/NfLg6z9/Untitled-design.jpg",
    url: "https://example.com/5",
  },
  {
    name: "Dinajpur",
    image: "https://i.ibb.co.com/NfLg6z9/Untitled-design.jpg",
    url: "https://example.com/6",
  },
  {
    name: "Panchagarh",
    image: "https://i.ibb.co.com/NfLg6z9/Untitled-design.jpg",
    url: "https://example.com/7",
  },
  {
    name: "Thakurgaon",
    image: "https://i.ibb.co.com/NfLg6z9/Untitled-design.jpg",
    url: "https://example.com/7",
  },
];
    return (
            <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
    );
};

export default MastarTrangations;